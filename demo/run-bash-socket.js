
/*********** 웹소켓 처리 *******************/ 
var websocket = null;
function castSend(type, data ) {
	var id=cf.baroUserId;
	if( !id ) id='baro';
	cmd="websocket "+id+" "+type+"\r\n";
	console.log(">> castSend ", cmd );
	cmd+=data;
	if( $('#editor-container') && window.parent ) {
		window.parent.sendCmd( cmd);
	} else {
		sendCmd( cmd);
	}
}
function sendCmd( cmd ) {
	console.log(">> sendCmd: ", cmd );
	if( websocket && websocket.readyState == 1 ) {
		websocket.send(cmd);
	} else {
		console.log(cmd+" websocket send error (websocket is not alive)" );
	}
}

function socketOpened() {
	cf.socketType='open';
	if( cf.baroUserId ) {
		castSend("set", "set userId "+cf.baroUserId);		
	}
} 
function socketClosed() {
	console.log("socketClosed: ");
	cf.socketType='reconnect';
	setTimeout(websocketConnect, 5000 );
}

function socketDisconnect() {
	if( websocket ) {
		console.log('disconnecting...', websocket );
		websocket.close();
		websocket=null;
	}
} 

function socketMessage(msg) {
/* [msg 형태]
ok set userId
websocket test set
set userId test
*/
	var ep=msg.indexOf("\n");
	var len=msg.length;
	var tick=new Date().getTime();
	if( cf.prevTick && len==cf.prevLength  ) {
		var dist=tick-cf.prevTick;
		console.log("이전 호출 시간체크: "+dist+"ms");
		if( dist<100 ) {
			return;
		}
	}
	cf.prevLength=len;
	cf.prevTick=tick;
	console.log("socketMessage=>", len, ep, tick);
	if( ep>0 ) {
		var line=msg.substring(0,ep).trim(), sp=ep+1, pos=msg.indexOf("\n", sp);
		var arr=line.split(" "), kind=arr[0];
		console.log("socketMessage line="+line+" kind="+kind );
		if( kind=='ok' ) {
			var type=arr[1], kind=arr[2];
			if( type=='set' ) {				
				switch( kind ) {
				case 'userId':  castSend("set", "set serviceCode bash"); break;
				case 'serviceCode':  castSend("log", "start"); break;
				default: break;
				}
				return;
			}
		} else if( kind=='error' ) {
			console.log("websocket 오류="+msg);
			return;
		} else if( kind=='websocket' ) {
			msg=msg.substring(sp);
		} else {
			console.log("websocket 오류 라인정보="+line+", tick="+tick );
		}
	}
	console.log("socketMessage appendLog=>"+msg );
	appendLog(msg, true);
}


function initWebsocket(url, existingWebsocket, timeoutMs, numberOfRetries) {
    timeoutMs = timeoutMs ? timeoutMs : 1500;
    numberOfRetries = numberOfRetries ? numberOfRetries : 0;
    var hasReturned = false;
    var promise = new Promise((resolve, reject) => {
        setTimeout(function () {
            if(!hasReturned) {
                console.info('opening websocket timed out: ' + url);
                rejectInternal();
            }
        }, timeoutMs );

        if( !existingWebsocket || existingWebsocket.readyState != existingWebsocket.OPEN) {
            if( existingWebsocket) {
                existingWebsocket.close();
				if( websocket==existingWebsocket ) {
					websocket=null;
				}
            }
            websocket = new WebSocket(url);
            websocket.onopen = function () {
                if( hasReturned) {
                    websocket.close();
                } else {
                    console.info('websocket to opened! url: ' + url);
                    resolve(websocket);
                    socketOpened();
                }
            };
            websocket.onmessage = function(event) {
          		 socketMessage(event.data);
          	};
            websocket.onclose = function () {
                console.log('websocket closed! url: ' + url);
                rejectInternal();
                socketClosed();
            };
            websocket.onerror = function () {
                console.log('websocket error! url: ' + url);
                rejectInternal();
            };
        } else {
            resolve(existingWebsocket);
        }

        function rejectInternal() {
            if( numberOfRetries <= 0) {
                reject();
                socketDisconnect();
            } else if( !hasReturned ) {
                hasReturned = true;
                console.info('retrying connection to websocket! url: ' + url + ', remaining retries: ' + (numberOfRetries-1));
                initWebsocket(url, null, timeoutMs, numberOfRetries-1).then(resolve, reject);
            }
        }
    });
    promise.then(function () {hasReturned = true;}, function () {hasReturned = true;});
    return promise;
}

 
function websocketConnect() {

	if( cf.socketType=='reconnect' && websocket && websocket.readyState == websocket.OPEN ) {
		return;
	}
	cf.socketType='ready';
	var host=cf.hostWsIp, port=8092;
	if( typeof(cf.hostWsPort)=='string' ) {
		port=parseInt(cf.hostWsPort);	
	} else if( typeof(cf.hostWsPort)=='number' ) {
		port=cf.hostWsPort;
	}
	if( !host ) host='58.230.162.173';
	var addr='ws://'+host+':'+port+'/chat';
	initWebsocket(addr, websocket, 500, 1 );
}

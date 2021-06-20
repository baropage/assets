cf.uploadFileArray=[];
cf.currentUploadPath='data/upload';


function uploadLog(text) {
    $("#uploadLogs").append(text+"<br>");
}
function uploadMakeFile(node) {
    var url=getUrl("makeFile");
    url+='&fkey='+node.fkey+'&fidx='+node.fidx+'&savePath='+node.uploadPath;
    console.log(">> myUploadMakeFile ajax url: "+url );
    ajaxJson(url, function(json) {
        if( json.error ) {
          return console.log("파일생성 오류 파일명:"+node.fnm);
        }
        uploadLog("업로드 성공 : "+node.file.name );
        uploadNext(true);
    });
}
function uploadNext(nextCheck) {
    var node=cf.uploadFileArray.shift();
    console.log(">> uploadNext node =>",node);
    if( node ) {
        uploadLog("업로드 파일명 : "+node.file.name );
        uploadFileStart(node);
    } else {
    	if( nextCheck ) {
    		console.log("파일전송이 완료")
    	} else {
    		alert("업로드 파일정보가 없습니다")
    	}
    }
}
function uploadFileStart(node, callback) {
	if( !node.file ) {
		return;
	}
	var fileInfo=node.file, fsize=fileInfo.size;
	var me=this, chunkSize=512*2024, chunkRead=null, readHandler=null;
	node.end=-1;
	node.last=Math.round(fsize/chunkSize);
	cf.currentNode=node;
	console.log("xxxxxx fsize:"+fsize+", fnn:"+fileInfo.name)
	readHandler=function(e) {
		if( e.target.error ) {
			console.log("다운로드 오류 (파일명:"+fileInfo.name+")" );
			return;
		}
		var ba=new Uint8Array(e.target.result);
		console.log("e.target.readyState=="+e.target.readyState, chunkSize, ba.length );

		if( e.target.readyState == 2) {
			node.foffset+=chunkSize;
			node.fidx++;
			if( node.foffset>=fsize ) {
				node.end=node.fidx;
			}
			node.finish=false;
			var fd=new FormData();
			uploadLog("업로드 순번: "+node.fidx+" key: "+node.fkey );
			console.log("업로드 콜백처리 (node.foffset>="+fsize+") node=>", node);
			fd.append("fkey", node.fkey);
			fd.append("fidx", node.fidx);
			fd.append("fnm", fileInfo.name);
			fd.append("uploadPath", node.uploadPath);
			fd.append("data", new Blob([ba], {type:"application/octet-stream"}) );
			$.ajax({
				url:getUrl("upload"),
				data:fd, type:"post",  enctype:'multipart/form-data',
				processData:false, contentType:false, dataType:'json', cache:false,
				success: function(json) {
					if( json.error ) {
						return console.log("파일전송 오류 파일명:"+node.name);
					}
					node.finish=true;
					uploadLog("업로드 마지막순번: "+node.end+" key: "+node.fidx );
					if( node.end==node.fidx ) {
						console.log("ajax node", node, node.fidx);
						uploadLog("파일 업로드 성공 ("+fileInfo.name+") <br>" );
						setTimeout(function() { uploadMakeFile(node) }, 150);
						return;
					}
					setTimeout(chunkRead, 25);
				},
				error: function(request,status,error) {
					node.finish=true;
					uploadLog("업로드 오류 파일명: "+node.name+" (오류내용: "+error+")<br>" );
					console.log("upload error code:"+request.status+"\n"+"error:"+error, node );
					// "message:"+request.responseText+"\n"
				}
			});

		}
	}
	chunkRead=function() {
		var offset=node.foffset;
		var file=fileInfo.file;
		console.log("chunkRead : upload file info =>", file, offset, chunkSize);
		var fr=new FileReader(), blob=file.slice( offset, offset+chunkSize);
		fr.onload=readHandler;
		fr.readAsArrayBuffer(blob); //readAsBinaryString(blob); //
	}
	chunkRead();
}
function setUploadFile(file) {
    if( !file ) return;
    console.log("set upload file =>", file);
    var node={ file: file, foffset:0, fidx:0 };
    var uploadPath=$("#uploadPath").val();
    if(uploadPath) cf.currentUploadPath=uploadPath;
    node.fkey=generateHexString(10);
    node.finish=false;
    node.uploadPath=cf.currentUploadPath;
    cf.uploadFileArray.push(node);
	console.log("upload file node=>", node, cf.uploadFileArray);
}

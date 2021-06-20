
function runBash(src) {
	if( !src ) {
		var editor=cf.editor;
		src=editor.getValue();
	}
	if( websocket.readyState === websocket.CLOSED ) {
		alert("실시간 웹소켓 서버와 연결이 끊어져 다시 연결합니다");
		socketClosed();
		return;
	}
	castSend('runBash', src);
}

function clearLog() {
	var editor=cf.logEditor;
	if( !editor ) {
		return console.log("로그 첨부오류(에디터가 정의되지 않았습니다)", text);
	}
	var ss=editor.getSession();
	if( ss ) {
		ss.setValue("");
	}
	editorFocus();
}

function editorFocus() {
	var editor=cf.editor;
	console.log("editor focus");
	if( editor ) {
		editor.focus();
	}
}
function appendLog(text, scroll ) {
	var editor=cf.logEditor;
	if( !editor ) {
		return console.log("로그 첨부오류(에디터가 정의되지 않았습니다)", text);
	}
	var ss=editor.getSession();
	if( ss ) {
		var r=ss.getLength();
		ss.insert({row:r, column:0}, "\n"+text);
		if( scroll ) {
			r=ss.getLength();
			editor.gotoLine(r,0,true);
		}
	}
}


function resizeContent( dist ) {
	var content=".panel-container";
    var contentHeight=$("#page-footer").offset().top - $(content).offset().top;
	if( typeof(dist)!='number' ) {
	    dist=0;
	}
	if( typeof(contentHeight)=='number' ) {
	    $(content).height(contentHeight-dist);
	}
}

function resizePage() {
  resizeContent();
  $('.panel-left').children().each(function(k,o) {
    if( k==0 )
      $(o).height($('.panel-left').height()-34);
    else
      $(o).height(34);
  });
  $('.panel-right').children().each(function(k,o) {
    if( k==0 )
      $(o).height($('.panel-right').height()-34);
    else
      $(o).height(34);
  });
  var pd=cf.frameLeft.parent('div'), h=pd.height();
  cf.frameLeft.height(h);
  pd=cf.frameRight.parent('div'), h=pd.height();
  cf.frameRight.height(h);
}

$(".panel-left").resizable({
	handleSelector: ".splitter",
	resizeHeight: false
});


function setLogConfig() {
    var iframe=cf.frameRight.get(0);
	var editorConf= iframe ? iframe.contentWindow.getConfig(): null;
	if( editorConf && editorConf.editor ) {
    	cf.logEditor=editorConf.editor;
    	cf.logEditor.renderer.setShowGutter(false);
    	cf.logEditor.getSession().setMode('ace/mode/javascript');
    	return;
	}
	setTimeout(setLogConfig, 500);
}

function setEditorConfig() {
    var iframe=cf.frameLeft.get(0);
	var editorConf= iframe ? iframe.contentWindow.getConfig(): null;
	if( editorConf && editorConf.editor ) {
    	cf.editor=editorConf.editor;
    	cf.doclist=editorConf.doclist;
    	cf.editor.getSession().setMode('ace/mode/javascript');
    	setTimeout(setLogConfig, 1500);
		return;
	}
	setTimeout(setEditorConfig, 500);
}


function openFuncSrc(funcName, winName) {
    if( !funcName ) {
        alert("함수소스 열기 실패 (함수명이 없습니다 )");
        return;
    }
    var win=cf.popupFuncSrc;
    console.log("open win=="+win);
    if( win ) {
        win.focus();
        win.editLoad("Func", funcName);
    } else {
        var w=1200, h=850;
        var url=myUrl('cmd/funcEditor?funcName='+funcName);  
        if( !winName ) winName='funcSrc';
        var LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;

        var TopPosition = (screen.height) ? (screen.height-h)/2 : 0;

        var settings =
'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'

        win = window.open(url,winName,settings);
        if( win ) {
        	cf.popupFuncSrc=win;
        }
    }
}


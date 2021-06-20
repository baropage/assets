define(function(require, exports, module) {
"use strict";
var env = {};
var Range = require("ace/range").Range;
var dom = require("ace/lib/dom");
var net = require("ace/lib/net");
var EditSession = require("ace/edit_session").EditSession;
var Editor = require("ace/editor").Editor;
var doclist = require("ace/doclist");
var util = require("ace/util");
var saveOption = util.saveOption;


/*********** create editor ***************************/
var container = document.getElementById("editor-container");
var theme = require("ace/theme/textmate");
var Split = require("ace/split").Split;
var split = new Split(container, theme, 1);
env.editor = split.getEditor(0);
split.on("focus", function(editor) {
    env.editor = editor;
});
env.split = split;
window.env = env;

/**
 * This demonstrates how you can define commands and bind shortcuts to them.
 */
env.editor.commands.addCommands([{
    name: "increaseFontSize",
    bindKey: "Ctrl-=|Ctrl-+",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(size + 2);
    }
}, {
    name: "decreaseFontSize",
    bindKey: "Ctrl+-|Ctrl-_",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(Math.max(size - 2 || 2));
    }
}, {
	name: "runSource",
	bindKey: {win: "Ctrl-B", mac: "Command-B"},
	exec: function(editor, line) {
		if( window.parent ) {
			window.parent.runBash();
		}
	},
	readOnly: true
}, {
    name: "toggleWordWrap",
    bindKey: "Ctrl-9|Ctrl-Numpad9", // {win: "Ctrl-9", mac: "alt-shift-9", position: 1000},
    exec: function(editor) {
        editor.setOption("wrap",  editor.getOption("wrap") == "off");
    }  // , isAvailable: function(editor) {return editor && editor.ace},
}, {
	name: "src",
	bindKey: {win: "Ctrl-Q", mac: "Command-Q"},
	exec: function(editor, line) {
		var ss=editor.getSession(), p=editor.getCursorPosition(), row=p.row, range=ss.getWordRange(p.row, p.column);
		var line=ss.getLine(row), p1=range.end.column, c=line.charAt(p1);
		console.log("start c=="+c+" n="+p1);
		if( c=='#' ) {
			range=ss.getWordRange(row, p1+1);
			p1=range.end.column;
			c=line.charAt(p1);
		}
		if( c=='.' || c=='(' ) {
			if( c=='.' ) {
				range=ss.getWordRange(row, p1+1);
				p1=range.end.column;
				c=line.charAt(p1);
				if( c=='#' ) {
					range=ss.getWordRange(row, p1+1);
					p1=range.end.column;
					c=line.charAt(p1);
				}
			}
			if( c=='(' ) {
				var n=p1-1, p2=line.indexOf(')', p1), param=null;
				if( p1<p2 ) {
					param=ss.getTextRange(new Range(row, p1+1, row, p2) );
				}
				editor.moveCursorTo(row, p1);
				while( line.charAt(n).match(/[\w.#@]/) ) {
					c=line.charAt(n);
					n--;
				}
				if( n<p1 ) {
					n++;
					range=new Range(row,n,row,p1);
					var name=ss.getTextRange( range );
					console.log("name=="+name+" param="+param );
                    if( window.parent ) {
                        window.parent.openFuncSrc( name);
                    }
				}
			}
		}

	},
	readOnly: true
}, {
    name: "cmd",
    bindKey: "ctrl+enter",
    exec: function(editor, line) {
		if( typeof line == "string" ) {
			callBashCommand(line);
		} else {
			try {
				var str=editor.getCopyText();				
                if( str ) {
                    if( window.parent ) {
                        window.parent.runBash(str);
                    }
                } else {
                    var ss=editor.getSession(), p=editor.getCursorPosition(), row=p.row;
                    var line=ss.getLine(row);
                    if( line ) {
                        window.parent.runBash(line);
                    }
                }
			} catch(e) {
				alert("run script error "+e);
			}
		}
    },
    readOnly: true
}, {
    name: "resetFontSize",
    bindKey: "Ctrl-0|Ctrl-Numpad0",
    exec: function(editor) {
        editor.setFontSize(14);
    }
}, {
    name: "logInsert",
    bindKey: "Ctrl-1|Ctrl-Numpad1",
    exec: function(editor) {
        var p=editor.getCursorPosition(), c=p.column+5;
        editor.insert('log("");');
        editor.moveCursorTo(p.row, c);
    }
}, {
    name: "logInfo",
    bindKey: "Ctrl-2|Ctrl-Numpad2",
    exec: function(editor) {
        var p=editor.getCursorPosition(), c=p.column+17;
        editor.insert('log(">> ", _info());');
        editor.moveCursorTo(p.row, c);
    }
}]);

var consoleHeight = 0;
function onResize() {
    var left = env.split.$container.offsetLeft;
    var width = document.documentElement.clientWidth - left;
    container.style.width = width + "px";
    container.style.height = document.documentElement.clientHeight - consoleHeight + "px";
    env.split.resize();
}

window.onresize = onResize;
onResize();

/*********** options panel ***************************/
doclist.history = doclist.docs.map(function(doc) {
    return doc.name;
});
doclist.history.index = 0;
doclist.cycleOpen = function(editor, dir) {
    var h = this.history;
    h.index += dir;
    if (h.index >= h.length)
        h.index = 0;
    else if (h.index <= 0)
        h.index = h.length - 1;
    var s = h[h.index];
    doclist.pickDocument(s);
    return s;
};
doclist.addToHistory = function(name) {
    var h = this.history;
    var i = h.indexOf(name);
    if (i != h.index) {
        if (i != -1)
            h.splice(i, 1);
        h.index = h.push(name);
    }
};
doclist.pickDocument = function(name, mode ) {
	cf.currentMode=mode;
    doclist.loadDoc(name, function(session) {
        if (!session)
            return;
        doclist.addToHistory(session.name);
        session = env.split.setSession(session);
        env.editor.focus();
    });
};

var UndoManager = require("ace/undomanager").UndoManager;
env.editor.setFontSize(16);
env.editor.getSession().setMode('ace/mode/javascript');
env.editor.getSession().setUndoManager(new UndoManager());

cf.editor=env.editor;
cf.doclist=doclist;

});
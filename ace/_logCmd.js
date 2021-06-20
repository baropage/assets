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
var layout = require("ace/layout");


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

var consoleEl = dom.createElement("div");
container.parentNode.appendChild(consoleEl);
// consoleEl.style.cssText = "position:fixed; bottom:0px; right:0; height:16px; border:1px solid #baf; z-index:100";

var cmdLine = new layout.singleLineEditor(consoleEl);
cmdLine.editor = env.editor;
env.editor.cmdLine = cmdLine;
env.editor.showCommandLine = function(val) {
    this.cmdLine.focus();
    if( typeof val == "string" )
        this.cmdLine.setValue(val, 1);
};

/**
 * This demonstrates how you can define commands and bind shortcuts to them.
 */
env.editor.commands.addCommands([{
    name: "increaseFontSize",
    bindKey: "Ctrl-=|Ctrl-+",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(size + 1);
    }
}, {
    name: "decreaseFontSize",
    bindKey: "Ctrl+-|Ctrl-_",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(Math.max(size - 1 || 1));
    }
}, {
	name: "focusCommand",
	bindKey: {win: "ESC", mac: "ESC"},
	exec: function(editor, line) {
		editor.cmdLine.focus();
	},
	readOnly: true
}, {
    name: "cmd",
    bindKey: "ctrl+enter",
    exec: function(editor, line ) {
		if( typeof line == "string" ) {
			callBashCommand(line);
		} else {
			try {
				var cmd=editor.getCopyText();
				var ss=editor.getSession();
				if( !cmd ) {
					var p=editor.getCursorPosition(), row=p.row;
					cmd=ss.getLine(row);
				}
				callBashCommand(cmd);
			} catch(e) {
				editor.cmdLine.setValue(e+ "");
			}
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
    name: "resetFontSize",
    bindKey: "Ctrl+0|Ctrl-Numpad0",
    exec: function(editor) {
        editor.setFontSize(12);
    }
}]);


cmdLine.commands.bindKeys({
    "Ctrl-Return": function(cmdLine) {
		cmdLine.insert("\n");
	},
    "Esc": function(cmdLine){
		cmdLine.editor.focus();
	},
    "Return": function(cmdLine){
        var command = cmdLine.getValue();
        var editor = cmdLine.editor;
        editor.commands.exec("cmd", editor, command );
        editor.focus();
    }
});

/*********** manage layout ***************************/
var consoleHeight = 22;
function onResize() {
    var left = env.split.$container.offsetLeft;
    var width = document.documentElement.clientWidth - left;
    container.style.width = width + "px";
    container.style.height = document.documentElement.clientHeight - consoleHeight + "px";
    env.split.resize();

    consoleEl.style.width = width + "px";
    cmdLine.resize();
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

cf.editor=env.editor;
cf.doclist=doclist;

});
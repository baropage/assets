define(function(require, exports, module) {
    "use strict";

	var ace=require("ace/ace");
    var EditSession = require("ace/edit_session").EditSession;
    var UndoManager = require("ace/undomanager").UndoManager;
    var Editor = require("ace/editor").Editor;
    cf.editorData = require("ace/editorData");

	var editor = ace.edit("editor");
	editor.setFontSize(14);
	editor.setOptions({
		theme:"ace/theme/twilight",
		mode:"ace/mode/html",
        enableLiveAutocompletion: false,
        enableSnippets: false
	});
	editor.getSession().on('change', function() {
		console.log("editor changed");
	});
    cf.editor=editor;
    cf.editor.commands.addCommands([
	{
		name: "focusCommand",
		bindKey: {
			win: "ESC",
			mac: "ESC"
		},
		exec: function(editor, line) {
			editor.setOption("wrap", editor.getOption("wrap") == "off");
		},
		readOnly: true
	}, {
		name: "cmd",
		bindKey: "Ctrl+enter",
		exec: function(editor, line) {

		},
		readOnly: true
	}, {
		name: "increaseFontSize",
		bindKey: "Ctrl-=|Ctrl-+",
		exec: function(editor) {
			var size = parseInt(editor.getFontSize(), 10) || 12;
			editor.setFontSize(size + 1);
		},
		readOnly: true
	}, {
		name: "decreaseFontSize",
		bindKey: "Ctrl+-|Ctrl-_",
		exec: function(editor) {
			var size = parseInt(editor.getFontSize(), 10) || 12;
			editor.setFontSize(Math.max(size - 1 || 1));
		},
		readOnly: true

	}, {
		name: "resetFontSize",
		bindKey: "Ctrl+0|Ctrl-Numpad0",
		exec: function(editor) {
			editor.setFontSize(12);
		}
	}]);
	if(typeof initEditor == "function" ) {
		initEditor();
	}
	console.log("ace editor end cf=>"+cf);
});

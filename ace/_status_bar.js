define(function(require, exports, module) {
"use strict";	
	var ace=require("ace/ace");
	require("ace/ext/statusbar");
	
    var editor = ace.edit("editor");
    var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
    // create a simple selection status indicator
    
    editor.setTheme("ace/theme/dawn");
    editor.session.setMode("ace/mode/html");
	cf.statusBar = new StatusBar(editor, document.getElementById("statusBar"));
	cf.editor=editor;

});
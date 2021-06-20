define(function(require, exports, module) {
"use strict";
	var ace=require("ace/ace");
    var editor1 = ace.edit("editor1", {
        theme: "ace/theme/tomorrow_night_eighties",
        mode: "ace/mode/html",
        maxLines: 30,
        wrap: true,
        autoScrollEditorIntoView: true
    });

    var editor2 = ace.edit("editor2", {
        theme: "ace/theme/tomorrow_night_blue",
        mode: "ace/mode/html",
        autoScrollEditorIntoView: true,
        maxLines: 30,
        minLines: 2
    });

    var editor = ace.edit("editor3");
    editor.setOptions({
        autoScrollEditorIntoView: true,
        maxLines: 8
    });
    editor.renderer.setScrollMargin(10, 10, 10, 10);
    
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.session.setMode("ace/mode/html");
    editor.setAutoScrollEditorIntoView(true);
    editor.setOption("maxLines", 100);
});
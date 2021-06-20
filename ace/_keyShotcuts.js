define(function(require, exports, module) {
"use strict";
	var ace=require("ace/ace");
	var editor = ace.edit("editor")
	editor.setTheme("ace/theme/twilight")
	editor.session.setMode("ace/mode/html")

	// add command to lazy-load keybinding_menu extension
	editor.commands.addCommand({
		name: "showKeyboardShortcuts",
		bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
		exec: function(editor) {
			ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
				module.init(editor);
				editor.showKeyboardShortcuts()
			})
		}
	});
	cf.editor=editor;
	printObject("require=", require );
	printObject("define=", define );
	printObject("cf=", cf );

});
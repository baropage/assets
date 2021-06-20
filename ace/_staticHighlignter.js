define(function(require, exports, module) {
"use strict";
	var highlighter = require("ace/ext/static_highlight");
	var JavaScriptMode = require("ace/mode/javascript").Mode;
	var theme = require("ace/theme/twilight");
	var dom = require("ace/lib/dom");
	var mode = new JavaScriptMode();
	$('.code').each(function(idx, item) {
		var data=$(item).text();
		var highlighted = highlighter.render(data, mode, theme);
		dom.importCssString(highlighted.css, "ace_highlight");
		$(item).html( highlighted.html );
	}); 
    
});
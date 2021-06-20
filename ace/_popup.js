
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
    name: "resetFontSize",
    bindKey: "Ctrl+0|Ctrl-Numpad0",
    exec: function(editor) {
        editor.setFontSize(12);
    }
}]);



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

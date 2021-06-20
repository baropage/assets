
define(function(require, exports, module) {
"use strict";
require("ace/lib/fixoldbrowsers");
require("ace/ext/rtl");
require("ace/multi_select");
require("ace/inline_editor");
var devUtil = require("ace/dev_util");
var Range = require("ace/range").Range;
require("ace/file_drop");

var config = require("ace/config");
config.init();
var env = {};

var dom = require("ace/lib/dom");
var net = require("ace/lib/net");
var lang = require("ace/lib/lang");
var useragent = require("ace/lib/useragent");

var event = require("ace/lib/event");
var theme = require("ace/theme/textmate");
var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;

var HashHandler = require("ace/keyboard/hash_handler").HashHandler;

var Renderer = require("ace/virtual_renderer").VirtualRenderer;
var Editor = require("ace/editor").Editor;

var whitespace = require("ace/ext/whitespace");



var doclist = require("ace/doclist");
var layout = require("ace/layout");
var util = require("ace/util");
var saveOption = util.saveOption;


var ElasticTabstopsLite = require("ace/ext/elastic_tabstops_lite").ElasticTabstopsLite;
var IncrementalSearch = require("ace/incremental_search").IncrementalSearch;


/*********** create editor ***************************/
var container = document.getElementById("editor-container");

// Splitting.
var Split = require("ace/split").Split;
var split = new Split(container, theme, 1);
env.editor = split.getEditor(0);
split.on("focus", function(editor) {
    env.editor = editor;
    updateUIEditorOptions();
});
env.split = split;
window.env = env;

var consoleEl = dom.createElement("div");
container.parentNode.appendChild(consoleEl);

var cmdLine = new layout.singleLineEditor(consoleEl);
cmdLine.editor = env.editor;
env.editor.cmdLine = cmdLine;
env.editor.showCommandLine = function(val) {
    this.cmdLine.focus();
    if (typeof val == "string")
        this.cmdLine.setValue(val, 1);
};

/**
 * This demonstrates how you can define commands and bind shortcuts to them.
 */
env.editor.commands.addCommands([{
    name: "gotoline",
    bindKey: {win: "Ctrl-L", mac: "Command-L"},
    exec: function(editor, line) {
        if (typeof line == "object") {
            var arg = this.name + " " + editor.getCursorPosition().row;
            editor.cmdLine.setValue(arg, 1);
            editor.cmdLine.focus();
            return;
        }
        line = parseInt(line, 10);
        if (!isNaN(line))
            editor.gotoLine(line);
    },
    readOnly: true
}, {
	name: "runSource",
	bindKey: {win: "Ctrl-B", mac: "Command-B"},
	exec: function(editor, line) {
		if( window.parent ) {
			window.parent.runSource();
		}
	},
	readOnly: true
}, {
	name: "focusCommand",
	bindKey: {win: "ESC", mac: "ESC"},
	exec: function(editor, line) {
		editor.cmdLine.setValue("",-1);
		editor.cmdLine.focus();
	},
	readOnly: true
}, {
    name: "cmd",
    bindKey: "ctrl+enter",
    exec: function(editor, line) {
		if( typeof line == "string" ) {
			castSend('cmd', line);
		} else {
			try {
				var cmd=editor.getCopyText();
				var ss=editor.getSession();
				if( !cmd ) {
					var p=editor.getCursorPosition(), row=p.row;
					cmd=ss.getLine(row);

				}
				var command = cmd.split(/\s+/);
				editor.commands.exec(command[0], editor, command.slice(1).join(' ') );
				editor.cmdLine.setValue(cmd);
				editor.cmdLine.focus();
			} catch(e) {
				editor.cmdLine.setValue(e+ "");
			}
		}
    },
    readOnly: true
}, {
		name: "showKeyboardShortcuts",
		bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
		exec: function(editor) {
			config.loadModule("ace/ext/keybinding_menu", function(module) {
				module.init(editor);
				editor.showKeyboardShortcuts();
			});
		}
}, {
    name: "emmet",
    bindKey: "Ctrl-M",
    exec: function(editor) {
		if( cf.Emmet ) {
			var check= env.editor.getOption("enableEmmet") ? false : true;
			env.editor.setOption("enableEmmet", check );
		} else {
			var Emmet = require("ace/ext/emmet");
			net.loadScript("https://cloud9ide.github.io/emmet-core/emmet.js", function() {
				Emmet.setCore(window.emmet);
				cf.Emmet=Emmet;
				env.editor.setOption("enableEmmet", true);
			});
		}
	}
}, {
    name: "close",
    bindKey: "Ctrl-Shift-C",
    exec: function(editor) {
		if( typeof line == "string" ) {
			closeCurrentEditor(line);
		} else {
			closeCurrentEditor();
		}
    }
}, {
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




env.editor.commands.addCommands(whitespace.commands);

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
        if( command=='run' ) {
			editor.commands.exec('runSource', editor, command );
		} else {
			editor.commands.exec('cmd', editor, command );
		}
        editor.focus();
    }
});


cmdLine.commands.removeCommands(["find", "gotoline", "findall", "replace", "replaceall"]);



/*********** manage layout ***************************/
var consoleHeight = 20;
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
        whitespace.detectIndentation(session);
        optionsPanel.render();
        env.editor.focus();
    });
};



var OptionPanel = require("ace/ext/options").OptionPanel;
var optionsPanel = new OptionPanel(env.editor);

optionsPanel.add({
    Main: {
        Split: {
            type: "buttonBar",
            path: "split",
            values: ["None", "Below", "Beside"],
            position: -100,
            onchange: function(value) {
                var sp = env.split;
                if (value == "Below" || value == "Beside") {
                    var newEditor = (sp.getSplits() == 1);
                    sp.setOrientation(value == "Below" ? sp.BELOW : sp.BESIDE);
                    sp.setSplits(2);

                    if (newEditor) {
                        var session = sp.getEditor(0).session;
                        var newSession = sp.setSession(session, 1);
                        newSession.name = session.name;
                    }
                } else {
                    sp.setSplits(1);
                }
            },
            getValue: function() {
                var sp = env.split;
                return sp.getSplits() == 1
                    ? "None"
                    : sp.getOrientation() == sp.BELOW
                    ? "Below"
                    : "Beside";
            }
        }
    },
    More: {
        "Rtl Text": {
            path: "rtlText",
            position: 900
        },
        "Show token info": {
            path: "showTokenInfo",
            position: 2000
        },
        "Text Input Debugger": devUtil.textInputDebugger
    }
});

var optionsPanelContainer = document.getElementById("optionsPanel");
optionsPanel.render();
optionsPanelContainer.insertBefore(optionsPanel.container, optionsPanelContainer.firstChild);
optionsPanel.on("setOption", function(e) {
    util.saveOption(e.name, e.value);
});

function updateUIEditorOptions() {
    optionsPanel.editor = env.editor;
    optionsPanel.render();
}

function synchroniseScrolling() {
    var s1 = env.split.$editors[0].session;
    var s2 = env.split.$editors[1].session;
    s1.on('changeScrollTop', function(pos) {s2.setScrollTop(pos)});
    s2.on('changeScrollTop', function(pos) {s1.setScrollTop(pos)});
    s1.on('changeScrollLeft', function(pos) {s2.setScrollLeft(pos)});
    s2.on('changeScrollLeft', function(pos) {s1.setScrollLeft(pos)});
}
var StatusBar = require("ace/ext/statusbar").StatusBar;
new StatusBar(env.editor, cmdLine.container);

var snippetManager = require("ace/snippets").snippetManager;
env.editSnippets = function() {
    var sp = env.split;
    if (sp.getSplits() == 2) {
        sp.setSplits(1);
        return;
    }
    sp.setSplits(1);
    sp.setSplits(2);
    sp.setOrientation(sp.BESIDE);
    var editor = sp.$editors[1];
    var id = sp.$editors[0].session.$mode.$id || "";
    var m = snippetManager.files[id];
    if (!doclist["snippets/" + id]) {
        var text = m.snippetText;
        var s = doclist.initDoc(text, "", {});
        s.setMode("ace/mode/snippets");
        doclist["snippets/" + id] = s;
    }
    editor.on("blur", function() {
        m.snippetText = editor.getValue();
        snippetManager.unregister(m.snippets);
        m.snippets = snippetManager.parseSnippetFile(m.snippetText, m.scope);
        snippetManager.register(m.snippets);
    });
    sp.$editors[0].once("changeMode", function() {
        sp.setSplits(1);
    });
    editor.setSession(doclist["snippets/" + id], 1);
    editor.focus();
};

optionsPanelContainer.insertBefore(
    dom.buildDom(["div", {style: "text-align:right;margin-right: 60px"},
        ["div", {},
            ["button", {onclick: env.editSnippets}, "Edit Snippets"]],
        devUtil.getUI()
    ]),
    optionsPanelContainer.children[1]
);

require("ace/ext/language_tools");
env.editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: false,
    enableSnippets: true
});

var beautify = require("ace/ext/beautify");
env.editor.commands.addCommands(beautify.commands);

optionsPanel.setOption('mode', 'ace/mode/javascript');
optionsPanel.setOption('fontSize', 18);

cf.env=env;
cf.split=split;
cf.editor=env.editor;
cf.doclist=doclist;
cf.optionsPanel=optionsPanel;
cf.cmdLine=cmdLine;
cf.consoleEl=consoleEl;

});

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
        // updateUIEditorOptions();
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
        if (typeof val == "string")
            this.cmdLine.setValue(val, 1);
    };


    /**
    * This demonstrates how you can define commands and bind shortcuts to them.
    */
    env.editor.commands.addCommands([
	{
        name: "gotoline",
        bindKey: {
            win: "Ctrl-L", mac: "Command-L"
        },
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
		name: "src",
		bindKey: {
			win: "Ctrl-Q",
			mac: "Command-Q"
		},
		exec: function(editor, line) { editSourceCheck(editor) }, readOnly: true
	}, {
		name: "saveSource",
		bindKey: {
			win: "Ctrl-S",
			mac: "Command-S"
		},
		exec: function(editor, line) {
			if (window.parent) {
				window.parent.myApply();
			}
		},
		readOnly: true
	}, {
		name: "runSource",
		bindKey: {
			win: "Ctrl-B",
			mac: "Command-B"
		},
		exec: function(editor, line) {
			if (window.parent) {
				window.parent.myPreview();
			}
		},
		readOnly: true
	}, {
		name: "focusCommand",
		bindKey: {
			win: "ESC",
			mac: "ESC"
		},
		exec: function(editor, line) {
			if (window.parent) {
				window.parent.myEsc();
			}
			// editor.cmdLine.focus();
		},
		readOnly: true
	}, {
		name: "nextFind",
		bindKey: "Ctrl-.",
		exec: function(editor) { findNextStep() }, readOnly: true
	}, {
		name: "prevFind",
		bindKey: "Ctrl-,",
		exec: function(editor) { findPrevStep() }, readOnly: true
	}, {
		name: "nextFile",
		bindKey: "Ctrl-Shift-.",
		exec: function(editor) {
			moveEditPage(editor, doclist.history, 1);
		},
		readOnly: true
	}, {
		name: "prevFile",
		bindKey: "Ctrl-Shift-,",
		exec: function(editor) {
			moveEditPage(editor, doclist.history, -1);
		},
		readOnly: true
	}, {
		name: "cmd",
		bindKey: "Ctrl+enter",
		exec: function(editor, line) {
			if (typeof line == "string") {
				console.log(">> editor command == "+line);
				var arr = line.split(/\s+/),
				ty = arr[0];
				if (ty == 'reset') {
					editor.getSession().setUndoManager(new UndoManager());
				} else if (ty == 'clean') {
					editor.getSession().getUndoManager().markClean();
				} else if (ty == 'setup') {
					commandSetup(arr[1], arr[2]);
				} else {
					editSource(line);
				}
			}
		},
		readOnly: true
	}, {
		name: "upload",
		bindKey: "Ctrl-U",
		exec: function(editor) {
			commandSetup('colors');
			console.log("upload file test !!!")
		}
	}, {
		name: "close",
		bindKey: "Ctrl-Shift-C",
		exec: function(editor) {
			if (typeof line == "string") {
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
		name: "toggleWordWrap",
		bindKey: "Ctrl-9|Ctrl-Numpad9",
		// {win: "Ctrl-9", mac: "alt-shift-9", position: 1000},
		exec: function(editor) {
			editor.setOption("wrap", editor.getOption("wrap") == "off");
		}  // , isAvailable: function(editor) {return editor && editor.ace},
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
        "Esc": function(cmdLine) {
            cmdLine.editor.focus();
        },
        "Return": function(cmdLine) {
            var command = cmdLine.getValue().split(/\s+/);
            var editor = cmdLine.editor;
            console.log("command Enter=>"+cmdLine);
            editor.commands.exec("cmd", editor, command.join(' '));
            editor.focus();
        }
    });

    cmdLine.commands.removeCommands(["find",
        "gotoline",
        "findall",
        "replace",
        "replaceall"]);



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
    doclist.pickDocument = function(name, mode, cb) {
        cf.currentMode = mode;
        doclist.loadDoc(name, function(session) {
            if (!session)
                return;
            doclist.addToHistory(session.name);
            session = env.split.setSession(session);
            session.setUseSoftTabs(false);
            whitespace.detectIndentation(session);
            // optionsPanel.render();
            env.editor.focus();
            if( typeof(cb)=='function' ) {
                cb(env.editor);
            }
        });
    };

 

function synchroniseScrolling() {
	var s1 = env.split.$editors[0].session;
	var s2 = env.split.$editors[1].session;
	s1.on('changeScrollTop',
		function(pos) {
			s2.setScrollTop(pos)});
	s2.on('changeScrollTop',
		function(pos) {
			s1.setScrollTop(pos)});
	s1.on('changeScrollLeft',
		function(pos) {
			s2.setScrollLeft(pos)});
	s2.on('changeScrollLeft',
		function(pos) {
			s1.setScrollLeft(pos)});
}

function editSourceCheck(editor) {
   var ss=editor.getSession(), p=editor.getCursorPosition(), row=p.row, col=p.column,
		range=ss.getWordRange(row, col);
	var line=ss.getLine(row), sp=range.start.column, ep=range.end.column, c=line.charAt(ep);
	if( sp>0 ) sp-=1;
	var ch=line.charAt(sp);
	console.log("editSourceCheck=>", c, sp, ep );
	if( c=='/'  || ch=='/' ) {
		if( c=='.' ) {
			range=ss.getWordRange(row, ep+1), ep=range.end.column;
		} else {
			while( c=='/' ) {
				range=ss.getWordRange(row, ep+1), ep=range.end.column;
				c=line.charAt(ep);
				if( c=='.' ) {
					range=ss.getWordRange(row, ep+1), ep=range.end.column;
					break;
				}
			}
		}
		var ok=false;
		c=line.charAt(sp);
		while( c=='/' ) {
			if( sp==0 ) {
				ok=true;
			} else if( sp>0 ) {
				ch=line.charAt(sp-1);
				if( ch=="\'" || ch=="\""  || ch==" " || ch=="\t"  || ch=="\n" ) {
					ok=true;
				}
			}
			if( ok ) break;
			range=ss.getWordRange(row, sp-1), sp=range.start.column-1;
			if( sp<0 ) break;
			c=line.charAt(sp);
		}
		console.log("check url=>", ok, sp, ep );
		if( ok ) {
			var name=ss.getTextRange(new Range(row, sp, row, ep));
			editSource("file "+name);
		}
		return;
	}

	if( c == '#') {
		range = ss.getWordRange(row, ep+1);
		ep = range.end.column;
		c = line.charAt(ep);
	}
	if( c == '.' || c == '(' ) {
		if (c == '.') {
			range = ss.getWordRange(row, ep+1);
			ep = range.end.column;
			c = line.charAt(ep);
			if (c == '#') {
				range = ss.getWordRange(row, ep+1);
				ep = range.end.column;
				c = line.charAt(ep);
			}
		}
		if (c == '(') {
			var n = ep-1,
			p2 = line.indexOf(')', ep),
			param = null;
			if (ep < p2) {
				param = ss.getTextRange(new Range(row, ep+1, row, p2));
			}
			editor.moveCursorTo(row, ep);
			while (line.charAt(n).match(/[\w.#@]/)) {
				c = line.charAt(n);
				n--;
			}
			if (n < ep) {
				n++;
				range = new Range(row, n, row, ep);
				var name = ss.getTextRange(range);
				console.log("name=="+name+" param="+param);
				var line = name.charAt(0) == '@' ? name.substring(1): name;
				if (name == 'conf') {
					editSource("conf "+param);
				} else {
					editSource("func "+name);
				}
			}
		}
	}
}



    var StatusBar = require("ace/ext/statusbar").StatusBar;
    new StatusBar(env.editor,
        cmdLine.container);
 

    require("ace/ext/language_tools");
    env.editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        fontSize: 16,
        mode: 'ace/mode/css' 
    });
 
    
    cf.editor = env.editor;
    cf.editor.doclist = doclist;

	if( window.parent && typeof(window.parent.editorReady)=='function' ) {
		window.parent.editorReady( cf.editor );
	}
});
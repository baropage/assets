define(function(require, exports, module) {
    "use strict";
    require("ace/multi_select");
    require("ace/file_drop");
    require("ace/ext/language_tools");

    var Range = require("ace/range").Range;
	var ace=require("ace/ace");
	/*
    var devUtil = require("ace/dev_util");
    require("ace/inline_editor");
    require("ace/ext/rtl");
    require("ace/lib/fixoldbrowsers");
    var config = require("ace/config");
    var net = require("ace/lib/net");
    var lang = require("ace/lib/lang");
    var useragent = require("ace/lib/useragent");
    var HashHandler = require("ace/keyboard/hash_handler").HashHandler;
    var Renderer = require("ace/virtual_renderer").VirtualRenderer;
    var ElasticTabstopsLite = require("ace/ext/elastic_tabstops_lite").ElasticTabstopsLite;
    var IncrementalSearch = require("ace/incremental_search").IncrementalSearch;
    var util = require("ace/util");
    var saveOption = util.saveOption;
    var whitespace = require("ace/ext/whitespace");
	*/
    var layout = require("ace/layout");
    var dom = require("ace/lib/dom");
    var event = require("ace/lib/event");
    var EditSession = require("ace/edit_session").EditSession;
    var UndoManager = require("ace/undomanager").UndoManager;
    var Editor = require("ace/editor").Editor;
    cf.editorData = require("ace/editorData");


    /*********** create editor ***************************/
    // Splitting.
	/*
    var Split = require("ace/split").Split;
    var split = new Split(container, theme, 1);
    env.editor = split.getEditor(0);
    split.on("focus", function(editor) {
        env.editor = editor;
        // updateUIEditorOptions();
    });
    env.split = split;
    window.env = env;
	*/
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

	/*
    var container = document.getElementById("editor");
    var consoleEl = dom.createElement("div");
    container.parentNode.appendChild(consoleEl);
    // consoleEl.style.cssText = "position:fixed; bottom:0px; right:0; height:16px; border:1px solid #baf; z-index:100";

    var cmdLine = new layout.singleLineEditor(consoleEl);
    cmdLine.editor = cf.editor;
    cf.editor.cmdLine = cmdLine;
    cf.editor.showCommandLine = function(val) {
        this.cmdLine.focus();
        if (typeof val == "string")
            this.cmdLine.setValue(val, 1);
    };
	*/


    /**
    * This demonstrates how you can define commands and bind shortcuts to them.
    */
    cf.editor.commands.addCommands([
	{
        name: "gotoline",
        bindKey: {
            win: "Ctrl-L", mac: "Command-L"
        },
        exec: function(editor, line) {
            if (typeof line == "object") {
                var arg = this.name + " " + editor.getCursorPosition().row;
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
		exec: function(editor, line) {
			editSourceCheck(editor)
		}, readOnly: true
	}, {
		name: "saveSource",
		bindKey: {
			win: "Ctrl-S",
			mac: "Command-S"
		},
		exec: function(editor, line) {
			applySource("save");
		},
		readOnly: true
	}, {
		name: "runSource",
		bindKey: {
			win: "Ctrl-enter",
			mac: "Command-enter"
		},
		exec: function(editor, line) {
			applySource("run");
		},
		readOnly: true
	}, {
		name: "wrapCommand",
		bindKey: {
			win: "ESC",
			mac: "ESC"
		},
		exec: function(editor, line) {
			editor.setOption("wrap", editor.getOption("wrap") == "off");
		},
		readOnly: true
	}, {
		name: "nextFind",
		bindKey: "Ctrl-,",
		exec: function(editor) {
			var cur=cf.currentPageDoc, next=null;
			if(cur && cf.editorDocs ) {
				var len=cf.editorDocs.length;
				for(var n=0; n<len; n++ ) {
					if(cf.editorDocs[n]==cur ) {
						if(n+1 < len) next=cf.editorDocs[n+1];
						else next=cf.editorDocs[0];
						if(next ) {
							setPageStatus(next.name);
							cf.editor.setSession(next.session);
						}
						return;
					}
				}
			}
		},
		readOnly: true
	}, {
		name: "prevFind",
		bindKey: "Ctrl-.",
		exec: function(editor) {
			var cur=cf.currentPageDoc, prev=null;
			if(cur && cf.editorDocs ) {
				var len=cf.editorDocs.length;
				for(var n=0; n<len; n++ ) {
					if(cf.editorDocs[n]==cur ) {
						if(prev==null ) {
							prev=cf.editorDocs[len-1];
						}
						if(prev ) {
							setPageStatus(prev.name);
							cf.editor.setSession(prev.session);
						}
						return;
					}
					prev=cf.editorDocs[n];
				}
			}
		}, readOnly: true
	}, {
		name: "matchTag",
		bindKey: "Ctrl-]",
		exec: function(editor) {
			var session=editor.getSession();
			var cur = session.getCursor();
			var pos = session.findMatchingBracket(cur);
			var matchPos= editor.returnMatchingPos();
			console.log("xx matching key xx findMatchingBracket:"+pos, cur, matchPos );
		},
		readOnly: true
	}, {
		name: "upload",
		bindKey: "Ctrl-U",
		exec: function(editor) {
			console.log("xx upload key down xx");
		},
		readOnly: true
	}, {
		name: "closeSkip",
		bindKey: "Ctrl-W",
		exec: function(editor) {
			console.log("xx close skip key down xx");
		},
		readOnly: true
	}, {
		name: "closeEditor",
		bindKey: "Ctrl-Shift-C",
		exec: function(editor) {
			console.log("xx close editor key down xx");
		},
		readOnly: true
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


    // cf.editor.commands.addCommands(whitespace.commands);
	/*
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

    var StatusBar = require("ace/ext/statusbar").StatusBar;
    new StatusBar(cf.editor, cmdLine.container);
	*/

    /*********** manage layout **************************
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
	*/

    /*********** options panel **************************
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
	*/

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
				var line = name.charAt(0) == '@' ? name.substring(1): name;
				console.log("name=="+name+" param="+param+" line="+line);
				/*
				if (name == 'conf') {
					editSource("conf "+param);
				} else {
					editSource("func "+name);
				}
				*/
			}
		}
	}
}


	var logEditor = ace.edit("logs");
	logEditor.setFontSize(14);
	// enable autocompletion and snippets
	logEditor.setOptions({theme:"ace/theme/clouds", mode:"ace/mode/javascript", enableBasicAutocompletion: true, showLineNumbers:false, showGutter:false});
	cf.logEditor=logEditor;
	initPage();
	console.log("ace editor end cf=>"+cf);


});

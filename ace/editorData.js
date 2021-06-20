define(function(require, exports, module) {
"use strict";

var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;

/*********** demo documents **************************
var net = require("ace/lib/net");
var modelist = require("ace/ext/modelist");
*/
 
function loadData(name, src, mode, wrapped) {
	if(!Array.isArray(cf.editorDocs)) cf.editorDocs=[];
	var doc=null;
	for(var n=0;n<cf.editorDocs.length; n++ ) {
		var cur=cf.editorDocs[n];
		if(cur.name==name) {
			doc=cur;
			break;
		}
	}
	var session=null;
	if(doc==null ) {		
		session = new EditSession(src);
		doc={name:name, source:src, mode:mode, wrapped:wrapped, session:session};
		session.setUndoManager(new UndoManager());
		session.name = name;
		session.getUndoManager().markClean();
		if(wrapped) {
			session.setUseWrapMode(true);
			session.setWrapLimitRange(80, 80);
		}
		console.log("load data doc=>", doc );
		if( !mode ) {
			mode='ace/mode/javascript';
		}
		session.setMode(mode); 
		cf.editorDocs.push(doc);
	} else {
		session=doc.session;
	}
	
	cf.editor.setSession(session);
	
    return doc;
}

function saveData(name, callback) {
}



module.exports = {
    loadData: loadData,
    saveData: saveData
};
module.exports.all = {
    "Mode Examples": module.exports.docs,
    "own source": module.exports.ownSource
};

});
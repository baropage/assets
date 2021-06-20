define(function(require, exports, module) {
"use strict";

var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;
var net = require("ace/lib/net");
var modelist = require("ace/ext/modelist");
/*********** demo documents ***************************/



 
function loadDoc(name) {
	
	var session = new EditSession(file);
    session.setUndoManager(new UndoManager());
    doc.session = session;
    doc.path = path;
    session.name = doc.name;
    session.getUndoManager().markClean();

    if (doc.wrapped) {
        session.setUseWrapMode(true);
        session.setWrapLimitRange(80, 80);
    }
    var mode= typeof(cf)=='object' ? cf.currentMode : null;
	console.log("name="+mode.name+", mode="+mode );
	if( mode ) {
		if( mode=='js' ) {
			mode='ace/mode/javascript';
		} else if( mode=='css' ) {
			mode='ace/mode/css';
		} else if( mode=='html' ) {
			mode='ace/mode/html';
		} else if( mode=='sql') {
			mode='ace/mode/sql';
		} else {
			mode='ace/mode/'+cf.currentMode;
		}
	}
    if( mode ) {
        session.setMode(mode);
    } else {
        var mode = modelist.getModeForPath(path);
        console.log("name="+mode.name+", mode="+mode.mode );
        session.modeName = mode.name;
		session.setMode(mode.mode);
    }
    
    return session;
	
	
    var doc = fileCache[name];
    if( !doc ) {
		doc = {name: name};
		doc.path=name;
		doc.desc=name;
		if (doc.desc.length > 18)
            doc.desc = doc.desc.slice(0, 7) + ".." + doc.desc.slice(-9);
        fileCache[name]=doc;
        // return callback(null);
	}

    if (doc.session) {
        return callback(doc.session);
	}
	var path = doc.path;
     
    net.get(path, function(src) {
        initDoc(src, path, doc);
        callback(doc.session);
    });
}

function saveDoc(name, callback) {
    var doc = fileCache[name.toLowerCase()] || name;
    if (!doc || !doc.session)
        return callback("Unknown document: " + name);

    var path = doc.path;
    var parts = path.split("/");
    if (parts[0] == "docs")
        path = "demo/kitchen-sink/" + path;
    else if (parts[0] == "ace")
        path = "lib/" + path;

    upload(path, doc.session.getValue(), callback);
}

function upload(url, data, callback) {
    var absUrl = net.qualifyURL(url);
    if (/^file:/.test(absUrl))
        absUrl = "http://localhost:8888/" + url;
    url = absUrl;
    if (!/^https?:/.test(url))
        return callback(new Error("Unsupported url scheme"));
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(!/^2../.test(xhr.status));
        }
    };
    xhr.send(data);
}

module.exports = {
    fileCache: fileCache,
    docs: sort(prepareDocList(docs)),
    ownSource: prepareDocList(ownSource),
    initDoc: initDoc,
    loadDoc: loadDoc,
    saveDoc: saveDoc
};
module.exports.all = {
    "Mode Examples": module.exports.docs,
    "own source": module.exports.ownSource
};

});
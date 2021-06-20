define(function(require, exports, module) {
"use strict";

var EditSession = require("ace/edit_session").EditSession;
var UndoManager = require("ace/undomanager").UndoManager;
var net = require("ace/lib/net");

var modelist = require("ace/ext/modelist");
/*********** demo documents ***************************/
var fileCache = {};

function initDoc(file, path, doc) {
    if( doc.prepare)
        file = doc.prepare(file);

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
}


function makeHuge(txt) {
    for (var i = 0; i < 5; i++)
        txt += txt;
    return txt;
}

var docs = {
};

var ownSource = {
    /* filled from require*/
};

/*

modelist.modes.forEach(function(m) {
    var ext = m.extensions.split("|")[0];
    if (ext[0] === "^") {
        path = ext.substr(1);
    } else {
        var path = m.name + "." + ext;
    }
    path = "docs/" + path;
    if (!docs[path]) {
        docs[path] = {name: m.caption};
    } else if (typeof docs[path] == "object" && !docs[path].name) {
        docs[path].name = m.caption;
    }
});

if (window.require && window.require.s) try {
    for (var path in window.require.s.contexts._.defined) {
        if (path.indexOf("!") != -1)
            path = path.split("!").pop();
        else
            path = path + ".js";
        ownSource[path] = "";
    }
} catch(e) {}
*/

function sort(list) {
    return list.sort(function(a, b) {
        var cmp = (b.order || 0) - (a.order || 0);
        return cmp || a.name && a.name.localeCompare(b.name);
    });
}

function prepareDocList(docs) {
    var list = [];
    for (var path in docs) {
        var doc = docs[path];
        if (typeof doc != "object")
            doc = {name: doc || path};
        doc.path = path;
        doc.desc = doc.name.replace(/^(ace|docs|demo|build)\//, "");
		console.log(">> doc desc == "+doc.desc );
        if (doc.desc.length > 18)
            doc.desc = doc.desc.slice(0, 7) + ".." + doc.desc.slice(-9);

        fileCache[doc.name.toLowerCase()] = doc;
        list.push(doc);
    }

    return list;
}

function loadDoc(name, callback) {

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
    /*
    var parts = path.split("/");
    if (parts[0] == "docs") {
		path= "/asset/libs/ace/"+path;
		console.log("doc path="+path);
    } else if (parts[0] == "ace") {
        path = "/asset/libs/" + path;
	}
	*/
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
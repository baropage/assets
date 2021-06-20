 /* -------------------------------------------------------
* editor util
*------------------------------------------------------- */
function editSource(name, param) {
	editLoad("func", name, "js");
	
}
function saveSource() {
	
}

function runSource() {
	
}

function findEditInfoByName(name) {
	var list=cf.editorList;
	var prev=null;
	for( var n=0; n<list.length; n++ ) {
		if( list[n].name==name ) {
			cf.currentIndex=n;
			if(!cf.prevInfo ) cf.prevInfo=prev;
			return info;
		}
		prev=list[n];
	}
	return null;
}

function closeEditor(name) {
	if(!name ) {
		if(!cf.currentEditInfo) return null;
		name=cf.currentEditInfo.name;
	}
	var info=findEditInfoByName(name);
	if( !info ) {
		return;
	} 
	cf.editorList.remove(cf.currentIndex);
	var next=cf.editorList[cf.nextIndex];
	if( cf.prevInfo ) {
		return cf.doclist.setInfo(cf.prevInfo );
	}
}

function editLoad(type, name, mode, target ) {
	var info=findEditInfoByName(name);
	if( info && info==cf.currentEditInfo ) return;
	cf.prevInfo=cf.currentEditInfo;
	if( info ) {
		return cf.doclist.setInfo(info );
	}
	info={type: type, name: name, mode: mode };	
	$.get("?action=getSource&type="+type+"&name="+name, function(result) {
		info.result=result;
		cf.doclist.loadInfo(info);
		cf.editorList.put(info);
	}).fail(function(error) {
		
	});
}

function editorAppend(editor, text, scroll ) {
	var ss=editor.getSession();
	if( ss ) {
		var r=ss.getLength();
		ss.insert({row:r, column:0}, "\n"+text);
		if( scroll ) {
			editor.gotoLine(r,0,true);
		}
	}
}


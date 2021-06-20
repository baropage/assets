function treeAdd( parent, node ) {
	var tree=$(cf.tree).fancytree("getTree");
	if( !tree ) return null;
	if( !parent ) {
		parent=tree.getActiveNode();
		if( !parent ) parent= tree.getRootNode();
	}
	if( !node ) node={ title: "title" };
	return parent.addChildren(node);
}
function treeFind(key, active) {
	var tree=$(cf.tree).fancytree("getTree");
	if( tree ) {
		var cur=tree.getNodeByKey(key);
		if( active && cur ) cur.setActive();
		return cur;
	}
	return null;
}
function treeFilter(match, regExp, opts ) {
	var tree=$(cf.tree).fancytree("getTree");
	if( !tree ) return cnt;
	if( !match ) {
		return tree.clearFilter();
	}
	if( !opts ) opts={};
	var filterFunc= ( opts.branchMode ) ? tree.filterBranches : tree.filterNodes;
	if( regExp ) {
		cnt=filterFunc.call(tree, function(node) {
          return new RegExp(match, "i").test(node.title);
        }, opts);
	} else {
		cnt=filterFunc.call(tree, match, opts);
	}
	return cnt;
}

function setTreeNodeCommand(tree) {
	tree.on("nodeCommand", function(event, data){
		var refNode=null, tree=$(this).fancytree("getTree");
		var node = cf.contextNode;  
		if( !node ) node=tree.getActiveNode();

		switch( data.cmd ) {
		case "moveUp":
			refNode = node.getPrevSibling();
			if( refNode ) {
				node.moveTo(refNode, "before");
				node.setActive();
			}
			break;
		case "moveDown":
			refNode = node.getNextSibling();
			if( refNode ) {
				node.moveTo(refNode, "after");
				node.setActive();
			}
			break;
		case "reload":
			if( node.folder ) {
				node.load(true);
				node.resetLazy();
			}
			break;
		case "indent":
			refNode = node.getPrevSibling();
			if( refNode ) {
				node.moveTo(refNode, "child");
				refNode.setExpanded();
				node.setActive();
			}
			break;
		case "outdent":
			if( !node.isTopLevel() ) {
				node.moveTo(node.getParent(), "after");
				node.setActive();
			}
			break;
		case "rename":
			node.editStart();
			break;
		case "remove":
			refNode = node.getNextSibling() || node.getPrevSibling() || node.getParent();
			node.remove();
			if( refNode ) {
				refNode.setActive();
			}
			break;
		case "addChild":
			var sub=node.editCreateNode("child", "");

			break;
		case "addSibling":
			node.editCreateNode("after", "");
			break;
		case "cut":
			CLIPBOARD = {mode: data.cmd, data: node};
			break;
		case "copy":
			CLIPBOARD = {
				mode: data.cmd,
				data: node.toDict(function(n){
					delete n.key;
				})
			};
			break;
		case "clear":
			CLIPBOARD = null;
			break;
		case "paste":
			if( CLIPBOARD.mode === "cut" ) {
				// refNode = node.getPrevSibling();
				CLIPBOARD.data.moveTo(node, "child");
				CLIPBOARD.data.setActive();
			} else if( CLIPBOARD.mode === "copy" ) {
				node.addChildren(CLIPBOARD.data).setActive();
			}
			break;
		default:
			alert("Unhandled command: " + data.cmd);
			return;
		}
	})
}

function setTreeContext(tree) {
	tree.contextmenu({
		delegate: "span.fancytree-node",
		menu: [
			{title: "Edit <kbd>[F2]</kbd>", cmd: "rename", uiIcon: "ui-icon-pencil" },
			{title: "Delete <kbd>[Del]</kbd>", cmd: "remove", uiIcon: "ui-icon-trash" },
			{title: "----"},
			{title: "New sibling <kbd>[Ctrl+N]</kbd>", cmd: "addSibling", uiIcon: "ui-icon-plus" },
			{title: "New child", cmd: "addChild", uiIcon: "ui-icon-arrowreturn-1-e" },
			{title: "----"},
			{title: "Reload", cmd: "reload", uiIcon: "ui-icon-arrowrefresh-1-w"}
		],
		beforeOpen: function(event, ui) {
			var node = $.ui.fancytree.getNode(ui.target);
			cf.contextNode=node;
			var key=node.key, mode=node.date? node.data.mode: '', ch=key.charAt(0);

			console.log("contextmenu beforeOpen=>", key, mode );
			if( ch=='#' ) {
				cf.tree.contextmenu("enableEntry", "rename", false );
				cf.tree.contextmenu("enableEntry", "remove", false );
				cf.tree.contextmenu("enableEntry", "addSibling", false );
			} else if( mode=='fs'  ) {
				cf.tree.contextmenu("enableEntry", "rename", true );
				cf.tree.contextmenu("enableEntry", "remove", true );
				cf.tree.contextmenu("enableEntry", "addSibling", true );
				if( node.isFolder() ) {
					cf.tree.contextmenu("enableEntry", "addChild", true );
				} else {
					cf.tree.contextmenu("enableEntry", "addChild", false );
				}
			} else {
				cf.tree.contextmenu("enableEntry", "rename", false );
				cf.tree.contextmenu("enableEntry", "remove", true );
				cf.tree.contextmenu("enableEntry", "addSibling", false );
				cf.tree.contextmenu("enableEntry", "addChild", false );
			}
			// node.setActive();
		},
		select: function(event, ui) {
			var me = this;
			setTimeout(function(){
				$(me).trigger("nodeCommand", {cmd: ui.cmd});
			}, 100);
		}
	});
	setTreeNodeCommand(tree);
}

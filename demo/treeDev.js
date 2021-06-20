function setCurrentNode( node ) {
	cf.treeClickNode=null;
	console.log("## setCurrentNode=>", node.title );
	if( window.parent && typeof(window.parent.treeChange)=='function' ) {
		window.parent.treeChange(node);
	} 
}

function setCurrentCheck() {
	var node=cf.treeClickNode;
	if( node ) {
		console.log("## setCurrentCheck=>", node.title );
		cf.treeClickNode=null;
		if( window.parent && typeof(window.parent.treeChangeCheck)=='function' ) {
			if( window.parent.treeChangeCheck(node) ) return;
		}
		if( node.isFolder() && node.isLazy() && !node.loaded ) {
			node.load();
		}
	}
}

function treeEditFinish(data ) {
	var node=data.node;
	if( node ) {
		var parent=node.getParent(), pkey=parent.key;
		console.log("## treeEditFinish=>", parent, pkey );
		node.renderTitle();
	}
}

function initTree() {
	cf.tree=$("#tree").fancytree({
		// autoCollapse: true,
		autoScroll: true,
		tooltip: true,
		source: { url: "?fc=list" },
		extensions: ["edit", "multi", "filter"],
		filter: {
			autoApply: true,   // Re-apply last filter if lazy data is loaded
			autoExpand: false, // Expand all branches that contain matches while filtered
			counter: true,     // Show a badge with number of matching child nodes near parent icons
			fuzzy: false,      // Match single characters in order, e.g. 'fb' will match 'FooBar'
			hideExpandedCounter: true,  // Hide counter badge if parent is expanded
			hideExpanders: false,       // Hide expanders if all child nodes are hidden by filter
			highlight: true,   // Highlight matches by wrapping inside <mark> tags
			leavesOnly: false, // Match end nodes only
			nodata: true,      // Display a 'no data' status node if result is empty
			mode: "dimm"       // Grayout unmatched nodes (pass "hide" to remove unmatched node instead)
		},
		activate: function(event, data) {
			var node=data.node, key=node.key;
			if( node.folder ) {
				console.log("## activate folder=>", key );
			} else if( key ) {
				setCurrentNode( node );
			}
		},
		click: function(event, data) {
			if( data.targetType=='title' ) {
				cf.treeClickNode=data.node;
				setTimeout(setCurrentCheck, 200);
			}
		},
		loadChildren: function(event, data) {
			var node=data.node;
			node.loaded=true;
			console.log("## loadChildren=>", node );
			if( node.isFolder() ) {
				node.toggleExpanded();
			}
		},
		edit: {
			triggerStart: ["f2", "shift+click", "mac+enter"],
			close: function(event, data) {
				treeEditFinish(data);
			}
		},
		lazyLoad: function(event, treeNode){
			var node=treeNode.node, key=node.key, mode=null, cnt=0;
			if( typeof(node.data)=='object' ) {
				mode=node.data.mode, cnt=node.data.cnt;
			}
			if( !mode ) mode="children";
			console.log("## lazyLoad=>", key, mode, node.title );
			treeNode.result = {
				url: "?fc=list",
				data: {mode: mode, pkey: key},
				cache: false
			};
		}
	});
	return cf.tree;
}


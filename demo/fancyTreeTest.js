var tree=null;
function setCurrentNode( node ) {
	console.log("## setCurrentNode=>", node);
}

function setCurrentCheck() {
	var node=cf.treeClickNode;
	console.log("## setCurrentCheck=>", node);
}

function initTree() {
	tree=$("#tree").fancytree({
		autoCollapse: true,
		autoScroll: true,
		tooltip: true,
		extensions: ["edit", "multi"],
		source: { url: "?fc=list" },
		activate: function(event, data) {
			var node=data.node, key=node.key;
			if( node.folder ) {
				if( node.data.cnt==0 ) return;
				if( node.loaded ) {
					node.toggleExpanded();
				} else {
					node.loaded=true;
					node.load();
				}
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
			if( node.isFolder() ) {
				node.toggleExpanded();
			}
		},
		edit: {
			triggerStart: ["f2", "shift+click", "mac+enter"],
			close: function(event, data) {
				var node=data.node, parent=node.getParent(), pkey=parent.key, title=node.title;
				if( title ) {
					var key=pkey+'.'+title, prev=node.key;
					node.key=key;
					node.name=title;
					if( node.title.indexOf("<b>")==-1 ) {
						if( data.save && data.isNew ) {
							node.title+=" <b>+</b>";
						} else {
							node.title+=" <b>*</b>";
						}
					}
					console.log(">> key="+key+" prev="+prev );
					node.renderTitle();
				}
			}
		},
		lazyLoad: function(event, data){
			var node = data.node;
			console.log("## lazyLoad:=>", data );
			data.result = {
				url: "?fc=list",
				data: {mode: "children", pkey: node.key},
				cache: false
			};
		}
	});
}

var cf={tag: "config" };
String.prototype.trim = function() { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') };
String.prototype.ch = function( c, pos) {
	if( pos===undefined ) {
		pos=0;
	}
	if( typeof(pos)!='number' ) return this.length;
	for( var n=pos; n<this.length; n++) {
		var ch=this.charAt(n);
		if( ch==' ' || ch=='\t' || ch=='\r' || ch=='\n' ) continue;
		return ch==c ? n+1: 0;
	}
	return 0;
};
String.prototype.replaceAll = function(sep, val) {
	return this.split(sep).join(val);
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function tpl(str, data) {
    if(!str) str="템플릿 데이터 미정의";
    var func=Template7(str).compile();
    return data? func(data): func;
}
function tplFunc(name, func) {
    if(typeof func=="function") {
        Template7.registerHelper(name, func);
    }
}

function getPageValue(id) {
	var el=getEl("w2-"+id);
	if(el ) {
		return el.innerHTML;
	}
	return id+" 로컬 변수값이 설정되지 않았습니다";
}
function loadScript(src, func) {
	var script = document.createElement('script');
	script.setAttribute('type', "text/javascript");
	script.setAttribute('src', src);
	document.body.appendChild(script);
	// script.setAttribute('async', '');
	if(typeof func=="function") {
		console.log("script load ", src, data)
		script.onload = func;
	}
}
function loadScriptData(src, data, func) {
	var h=document.getElementsByTagName('head')[0];
    var s=document.createElement("script");
    s.setAttribute("type","text/javascript");
    s.setAttribute("data-main", data);
    s.setAttribute("src", src);
    h.appendChild(s);
	// script.setAttribute('async', '');
	if(typeof func=="function") {
		console.log("script load ", src, data)
		s.onload = func;
	}
}
function addOpt(sel, val, text, selected) {
    if(!sel) return;
    var opt=document.createElement("option");
    opt.value=val, opt.text=text;
    if(selected) opt.selected=true;
    sel.appendChild(opt);
}
function clearOpt(sel) {
    if(!sel) return;
    while(sel.childNodes.length) sel.remove(0);
}

function getEl(id) {
	return document.getElementById(id);
}
function eid(id) {
	if(typeof(id)!='string') id='#main';
	var ch=id.charAt(0);
	if(ch!='.' && ch!='#' ) {
		id='#'+id;
	}
	return id;
}

function setLayout(id, opt) {
	cf.layout=$(eid(id)).w2layout(opt);
	cf.layoutResizeId=id;
	return cf.layout;
}
function setLayoutFunc(func) {
	cf.windowResizeFunc=func;
	$(window).resize(function() { callLayoutHeight() });
	callLayoutHeight();
}
function callLayoutHeight() {
	cf.tick=Date.now();
	setTimeout(function() {
		if( (Date.now()-cf.tick) >150 ) setLayoutHeight();
	}, 200);
}
function setLayoutHeight(id) {
	if(!id ) id=cf.layoutResizeId;
	cf.tick=Date.now();
	mainLayoutHeight(id);
	if(typeof cf.windowResizeFunc=="function" ) {
		cf.windowResizeFunc();
	}
}
function mainLayoutHeight(id) {
	if(!id ) id='#main';
	var height=$(window).height();
	height-=2;
	console.log("layout height == "+height+", id == "+id);
	$(eid(id)).height(height);
	if(!cf.layout) {
		cf.layout=ui("main");
	}
	if(cf.layout) cf.layout.resize();
}

function resizeEditor(id) {
	if(Array.isArray(id)) {
		for(var n=0; n<id.length; n++) {
			resizeEditor(id[n]);
		}
	} else {
		if(!id ) id="editor";
		var e=$("#"+id);
		var el=e.closest('.w2ui-panel-content');
		var h=el.height();
		e.height(h);
		// e.find("textarea").height(h);
		console.log("resize editor id="+id+", h="+h);
	}
}

function setLayoutStretch(stretchId, panelId) {
	if(!cf.layout ) {
		return false;
	}
	var el=typeof panelId=="object" ? panelId: getLayoutPanel(panelId);
	console.log("setLayoutStretch el==", el, cf);
	if(el) {
		var totalHeight=0, contentHeight=$(el).height();
		var stretchEl=null;
		$(el).children('div').each(function() {
			var cur=$(this);
			if(cur.attr("id")==stretchId) {
				stretchEl=cur;
			} else {
				totalHeight+=cur.height();
			}
		});
		var dist=contentHeight-totalHeight;
		console.log("setLayoutStretch: "+stretchId, stretchEl, dist);
		if( stretchEl && dist>150) {
			stretchEl.height(dist-10);
		}
	}
}


function setLayoutContent() {
	if(!cf.layout ) {
		return false;
	}
	if(arguments.length==1 ) {
		cf.layout.content("main", arguments[0]);
	} else if(arguments.length==2 ) {
		cf.layout.content(arguments[0], arguments[0]);
	}
}
function getLayoutPanel(panelId) {
	if(!cf.layout ) {
		return false;
	}
	if(!panelId ) panelId="main";
	return cf.layout.el(panelId);
}

function ui(name) {
	return w2ui[name];
}

function addRecodeId(arr) {
	for(var n=0; n<arr.length; n++) {
		if(arr[n].recid) continue;
		arr[n].recid=n+1;
	}
}

function rightClickCheck(event) {
	var e=event.originalEvent ? event.originalEvent: event;
	if(!e) return false;
	return (e.which && e.which==3) || (e.button&&e.button==2);
}

function createEditor(ace, id, options) {
	var el = document.getElementById(id);
	if( !el ) {
		console.log("create editor 오류 아이디가 설정되지 않았습니다 (아이디: "+id+")");
		return;
	}
	options = options || {
		enableBasicAutocompletion: true,
	};
	var editor = ace.edit(id);
	if(!options.theme ) options.theme="ace/theme/twilight";
	if(!options.mode ) options.mode="ace/mode/javascript";
	editor.setFontSize(14);
	// enable autocompletion and snippets
	editor.setOptions(options);
	if( options.onchange) {
		editor.getSession().on('change', options.onchange);
	}
	var editorId=id=='editor'? id: 'editor_'+id;
	// el.editor=editor;
	cf.ace=ace;
	cf[editorId]=editor;
	console.log("xxxxxxxx", editor, ace, id);

	return editor;
}

function copyText(text) {
	var textArea = document.createElement("textarea");
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;
	textArea.style.width = '2em';
	textArea.style.height = '2em';
	textArea.style.padding = 0;
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
	textArea.style.background = 'transparent';
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}
	document.body.removeChild(textArea);
}

function generateHexString(length) {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0,length);
}
function fileSizeFmt(bytes) {
    var thresh = 1024; // si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    // var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

function getQueryStringValue (key) {
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
function getUrl(action) {
	var code=getQueryStringValue("code");
	var url='?action='+action;
	if(code ) url+='&code='+code;
	return url;
}
function sidebarToggle(sb, node) {
	if(typeof(node.nodes)=='object' && node.nodes.length ) {
		console.log("## sidebarToggle node=>", node);
		sb.toggle(node.id);
		return true;
	}
	return false;
}

function callAjax(action, successFunc, errorFunc, formData, asyncMode) {
	var url=getUrl(action);
	if(typeof errorFunc !='function' ) {
		errorFunc=function(request,status,error) {
			alert("네트워크 오류 code:"+request.status+"\n"+"error:"+error );
		};
	}
	var opt={
		url:url, dataType:'json',
		processData:false, contentType:false, cache:false,
		success: successFunc,
		error: errorFunc
	};
	if(asyncMode===true) {
		opt.async=true;
	}
	if(typeof formData=="string") {
		opt.type="post";
		opt.data=JSON.parse(formData);
	} else if( formData ) {
		opt.type="post";
		opt.data=formData;
		opt.enctype='multipart/form-data';
	} else {
		opt.type="get";
	}

	$.ajax(opt);
}
function findItemId(arr, id) {
	for(var n=0; n<arr.length; n++) {
		var node=arr[n];
		if(node.id==id) return node;
	}
	return null;
}
function findItemText(arr, text) {
	for(var n=0; n<arr.length; n++) {
		var node=arr[n];
		if(node.text==text) return node;
	}
	return null;
}


/*
	ui interface
*/
function makeTabContent(targetId, panel, cid) {
	if(!panel) panel=getLayoutPanel();
	if(!cid) cid='content';
	var ctt=$(panel).find(">#"+cid);
	if( !Array.isArray(cf.tabContents) ) {
		cf.tabContents=[];
	}
	var div=null;
	var contentId="content_"+targetId;
	for(var n=0;n<cf.tabContents.length; n++) {
		var cur=cf.tabContents[n];
		if(cur.id==contentId) {
			div=cur;
		} else {
			$(cur).hide();
		}
	}
	if(div==null ) {
		div=document.createElement("div");
		div.id=contentId;
		div.style="width:100%; height:100%; background-color:#fff;";
		ctt.append(div);
		cf.tabContents.push(div);
	}
	$(div).show();
	return contentId;
}
function makeTabIframe( targetId, src, panel, cid) {
	if(!panel) panel=getLayoutPanel();
	if(!cid) cid='content';
	var ctt=$(panel).find(">#"+cid);
	if( !Array.isArray(cf.tabIframes) ) {
		cf.tabIframes=[];
	}
	var iframe=null;
	var iframeId="iframe_"+targetId;
	for( var n=0; n<cf.tabIframes.length; n++ ) {
		var cur=cf.tabIframes[n];
		if(cur.id==iframeId) {
			iframe=cur;
			break;
		} else {
			$(cur).hide();
		}
	}
	if(iframe==null ) {
		iframe=document.createElement('iframe');
		iframe.id=id;
		iframe.className='myFrame';
		if(src) iframe.src=src;
		cf.tabIframes.push(iframe);
		ctt.append(iframe);
	} else {
		$(iframe).show();
	}
	return iframeId;
}

function setTreeData(tree, data) {
	tree.add(data);
	tree.topHTML="";
	tree.bottomHTML="";
	if(typeof tree.buttonClick=="function" ) {
		$(".w2ui-btn").click(tree.buttonClick);
	}
}

function daysInMonth ( year, month) {
    return new Date(year, month, 0).getDate();
}

function rainbow(numOfSteps, step) {
	var r, g, b;
	var h = step / numOfSteps;
	var i = ~~(h * 6);
	var f = h * 6 - i;
	var q = 1 - f;
	switch(i % 6){
		case 0: r = 1; g = f; b = 0; break;
		case 1: r = q; g = 1; b = 0; break;
		case 2: r = 0; g = 1; b = f; break;
		case 3: r = 0; g = q; b = 1; break;
		case 4: r = f; g = 0; b = 1; break;
		case 5: r = 1; g = 0; b = q; break;
	}
	var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
	return (c);
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function setYearCombo(sel) {
	if(!sel) {
		if(cf.sel_year) {
			sel=cf.sel_year;
			if(sel.option.length) return sel;
		} else {
			sel=document.createElement("select");
			cf.sel_year=sel;
		}
	}
	var start=2001;
	var year=new Date().getFullYear();
	var opt=document.createElement("option");
	opt.value="", opt.text="전체";
	sel.appendChild(opt);
	for(var n=0;n<25;n++) {
		var curYear=start+n;
		opt=document.createElement("option");
		console.log("xxx year xxx", curYear, year);
		opt.value=curYear, opt.text=curYear+ " 년";
		if(curYear==year) opt.selected=true;
		sel.appendChild(opt)
	}
	return sel;
}
function setMonthCombo(sel) {
	if(!sel) {
		if(cf.sel_month) {
			sel=cf.sel_month;
			if(sel.option.length) return sel;
		} else {
			sel=document.createElement("select");
			cf.sel_month=sel;
		}
	}
	var month=new Date().getMonth()+1;
	var opt=document.createElement("option");
	opt.value="", opt.text="전체";
	sel.appendChild(opt);
	for(var n=1;n<=12;n++) {
		var curMonth=n;
		opt=document.createElement("option");
		opt.value=curMonth, opt.text=curMonth+ " 월";
		console.log("xxx month xxx", curMonth, month);
		if(curMonth==month) opt.selected=true;
		sel.appendChild(opt);
	}
	return sel;
}
function setDayCombo(sel, year, month) {
	if(!sel) {
		if(cf.sel_day) {
			sel=cf.sel_day;
		} else {
			sel=document.createElement("select");
			cf.sel_day=sel;
		}
	}
	var day=sel.options.length==0 ? new Date().getDate(): 1;
	while(sel.options.length>0 ) {
		sel.remove(0);
	}
	if(!year) year=new Date().getFullYear();
	if(!month) month=new Date().getMonth()+1;
	console.log("xx day xx", day, year, month);
	var days=daysInMonth(year, month);
	var opt=document.createElement("option");
	opt.value="", opt.text="전체";
	sel.appendChild(opt);
	for(var n=1;n<=days;n++) {
		var curDay=n;
		opt=document.createElement("option");
		opt.value=curDay, opt.text=curDay+ " 일";
		if(curDay==day) opt.selected=true;
		sel.appendChild(opt);
	}
	return sel;
}

/* ajax */
function defaultErrorFunc(request,status,error) {
	alert("네트워크 오류 code:"+request.status+"\n"+"error:"+error );
}

function ajaxSendData(url, node, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	var formData=new FormData();
	formData.append("dataType", "stringify");
	formData.append("data", JSON.stringify(node));
	$.ajax({
		url:url, type:'post', enctype:'multipart/form-data', dataType:'json',
		data: formData,
		processData:false, contentType:false, cache:false,
		success: successFunc,
		error: errorFunc
	});
}
function ajaxForm(url, formData, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	$.ajax({
		url:url, type:'post', enctype:'multipart/form-data', dataType:'json',
		data: formData,
		processData:false, contentType:false, cache:false,
		success: successFunc,
		error: errorFunc
	});
}

function ajaxJson(url, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	$.ajax({
		url:url, dataType:'json', type:'get',
		success: successFunc,
		error: errorFunc
	});
}


function ajaxText(url, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	$.ajax({
		url:url, dataType:'text', type:'get',
		success: successFunc,
		error: errorFunc
	});
}

function setPopupContent(div, actionName, initFunc) {
	if(cf[div] ) {
		$('#'+div).html(cf[div]);
		if(typeof initFunc=="function") initFunc();
		return;
	}
	ajaxText(getUrl(actionName), function(data) {
		cf[div]=data;
		$('#'+div).html(cf[div]);
		if(typeof initFunc=="function") initFunc();
	});
}

function createW2Button(id, icon, text, click, sty, color) {
	var bid="btn_"+id;
	if( cf[bid] ) return cf[bid];
	var btnEl=document.createElement("button");
	var iconEl=null;
	var textEl=document.createElement("b");
	textEl.innerHTML=text;
	if(icon ) {
		iconEl=document.createElement("span");
		iconEl.style="margin-right:8px";
		if(icon.indexOf(' ')>0) {
			iconEl.className=icon;
		} else {
			iconEl.className="w2ui-icon "+icon;
		}
	}
	var cls="w2ui-btn";
	if(color) cls+=" w2ui-btn-"+color;
	btnEl.id=id;
	btnEl.className=cls;
	if(sty) btnEl.style=sty;
	if(iconEl) btnEl.appendChild(iconEl);
	btnEl.appendChild(textEl);
	if(typeof click=="function" ) {
	    btnEl.onclick=click;
	} else if( typeof clickButton=="function" ) {
	    btnEl.onclick=function() {
	        clickButton(this);
	    }
	}
	cf[bid]=btnEl;
	return btnEl;
}

function makeButton(id, icon, text, sty, color) {
	return createW2Button(id, icon, text, null, sty, color);
}
function w2popupClose() {
	w2popup.close();
}




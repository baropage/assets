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

function isFunc(a) {
	return (!!a) && typeof a == 'function';
}
function isObj(a) {
	return (!!a) && (a.constructor === Object);
}
function isArr(a) {
	return (!!a) && (a.constructor === Array);
}

function isEl(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}
function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}
function isObject(a) {
	return isObj(a) || isArr(a) || isEl(a);
}

function isNum(a, strict) {
	var strict = strict === true ? true : false;
	if (strict) {
		return !isNaN(a) && a instanceof Number ? true : false;
	} else {
		return !isNaN(a - parseFloat(a));
	}
}
function isStr(a) {
	return (typeof a=='string' && !isNum(a)) ? true: false;
}

function getPageValue(id) {
	var el=getEl("w2-"+id);
	if(el ) {
		return el.innerHTML;
	}
	return id+" 로컬 변수값이 설정되지 않았습니다";
}

function startPage() {
    if(typeof initPage=="function" ) {
        initPage();
    }
    if(Array.isArray(cf.initModules) ) {
		for( var module of cf.initModules ) {
		    console.log("module call ", module);
			if(typeof module.func=='function') {
			    module.func();
			}
		}
	}
}
function addPageModule(mtype, mname, func ) {
    if(typeof mtype=='function') {
        func=mtype;
        mtype='initModules';
        mname='common';
    }
    if( mname && mtype ) {
	    if(!cf[mtype] ) cf[mtype]=[];
	    var module={name: mname, func: func};
	    cf[mtype].push(module);
    }
}

function tpl(str, data) {
	var func=null;
	if(typeof str == 'object' ) {
		var code=data;
		data=str;
		if(!code) {
			str="템플릿 코드 오류 ";
		} else {
			str=getPageValue(code);
			if(!str) str=code+" 템플릿 코드 오류 ";
		}
		func=Template7(str).compile();
	} else {
		if(!str) str="템플릿 데이터 미정의";
		func=Template7(str).compile();
	}
    return data && func ? func(data): func;
}
function tplFunc(name, func) {
    if(typeof func=="function") {
        Template7.registerHelper(name, func);
    }
}

function getFormInput( type, id, sty, items, classType) {
    if(classType) sty+=classType;
	var input='';
	switch(type) {
	case 'input':
	case 'text':
		input = '<input id="' + id + '" name="' + id + '" class="frm-input"' + sty + '>';
		break;
	case 'pass':
	case 'password':
		input = '<input id="' + id + '" name="' + id + '" class="frm-input" type="password"' + sty + '>';
		break;
	case 'check':
		if(!isArr(items)) items = [];
		if(items.length ) items = makeFormItems(items);
		for (var i = 0; i < items.length; i++) {
			input += '<label class="w2ui-box-label">'+
					 '  <input id="' + id + i +'" name="' + id + '" class="frm-input" type="checkbox" ' +
								sty + ' data-value="'+ items[i].id +'" data-index="'+ i +'">' +
						'<span>&#160;' + items[i].text + '</span>' +
					 '</label><br>';
		}
		break;

	case 'checkbox':
		input = '<input id="'+ id +'" name="'+ id +'" class="frm-input" type="checkbox" '+ sty + '>';
		break;
	case 'radio':
		if(!isArr(items)) items = [];
		if(items.length ) items = makeFormItems(items);
		for (var i = 0; i < items.length; i++) {
			input += '<label class="w2ui-box-label">'+
					 '  <input id="' + id + i + '" name="' + id + '" class="frm-input" type = "radio" value="'+ items[i].id + '">' +
						'<span>&#160;' + items[i].text + '</span>' +
					 '</label><br>';
		}
		break;
	case 'select':
		input = '<select id="' + id + '" name="' + id + '" class="frm-input" ' + sty + '>';
		if(!isArr(items)) items = [];
		if(items.length ) items = makeFormItems(items);
		for (var i = 0; i < items.length; i++) {
			input += '<option value="'+ items[i].id + '">' + items[i].text + '</option>';
		}
		input += '</select>';
		break;
	case 'textarea':
		input = '<textarea id="'+ id +'" name="'+ id +'" class="frm-input" '+ sty + '></textarea>';
		break;
	case 'toggle':
		input = '<input id="'+ id +'" name="'+ id +'" type="checkbox" '+ sty + ' class="frm-input w2ui-toggle"><div><div></div></div>';
		break;
	default: break;
	}
	return input;
}

function makeFormItems(item, el) {
	if(isArr(item)) {
		for (var m = 0; m < item.length; m++) {
			if(isStr(item[m]) || isNum(item[m]) ) {
				item[m] = { id: item[m], text: item[m] };
			} else if( isObj(item[m]) ) {
			    if(item[m].code_id) {
			        item[m].id=item[m].code_id;
			        item[m].text=item[m].code_name;
			    } else {
    				if(item[m].text != null && item[m].id == null) item[m].id = item[m].text;
    				if(item[m].text == null && item[m].id != null) item[m].text = item[m].id;
			    }
			} else {
				item[m] = { id: null, text: 'null' }
			}
		}
		return item;
	} else if(isObj(item) ) {
		var tmp = [];
		for (var m in item) tmp.push({ id: m, text: item[m] });
		return tmp;
	}
	return [];
}


function makeFormData(data, formType, el, appendMode) {
    // data = {id:xxx, form:[]} or [[...]]
    var form=null, formId="";
    if(!data) {
        data=cf.formData;
    }
    if(isArr(data)) {
        form=data;
    } else if(!isObj(data)) {
		data=cf.formData;
		if(isArr(data)) {
    	    from=data;
    	}
	}
	if(isObj(data)) {
	    form=data.form;
	    if(!formType) formType=data.type;
	    formId=data.id? data.id: data.name? data.name: '';
	} 
	if(!isArr(form)) return alert("폼 정보가 정의되지 않았습니다");
	if(!formType) {
	    formType="form-area";
	}
	var getFormRow=function(form, depth, map) {
		var s='';
		if(!isArr(form) ) {
			return;
		}
		var len=form.length;
		if( len && isArr(form[0])) {
			if(depth) s+='<div class="form-row">';
			for(var row of form) {
				if(depth==0) {
					s+=getFormRow(row,depth+1,map);
				} else {
					s+='<div class="cell-'+len+'">'+getFormRow(row,depth+1,map)+'</div>';
				}
			}
			if(depth) s+='</div>';
		} else {
			var name=form[0], id=form[1], type=form[2];
			var input='', span='';
			if(id=='html'||id=='div') {
			    if(id=='html') {
			        input = '<div data-type="frm-html">'+type+'</div>';
			    } else {
			        input = '<div id="'+ type +'">'+form[3]+'</div>';
			    }
			} else {
			    var f3=form[3], f4=form[4], items=null;
    			var sty='', classType='';
    			if(isNum(f3)) sty=' style="width:'+f3+'px"';
    			else if(isStr(f3)) sty=' style="'+f3+'"';
    			else if(isObject(f3)) items=f3;
    			if(isStr(f4)) span=' <span>'+f4+'</span>';
    			else if(isObject(f4)) items=f4;
    			if(isStr(form[5]) && span=='') span=' <span>'+form[5]+'</span>';
    			if(!type) type='input';
    			if(type.charAt(0)=='@') {
    			    classType=' data-type="'+type.substr(1)+'"';
    			    if(isObj(items)) {
    			        if(id) map[id]=items;
    			    } else {
    			        classType+=' data-kind="w2field"';
    			    }
    			    type='input';
    			}
			    input=getFormInput( type, id, sty, items, classType);
			}
			if(span) input+=span;
			s+='<div class="form-field"><label>'+name+'</label>'+input+'</div>';
		}
		return s;
	};
	var map={};
	var s='<div';
	if(formId) s+=' id="'+formId+'"';
	s+=' class="'+formType+'">';
	s+=getFormRow(form,0,map);
	s+='</div>';
	if(isEl(el)) {
	    if(appendMode) {
	        $(el).append(s);
	    } else {
	        $(el).html(s);
	    }
	    $.each(map, function(id,opt) {
	        var el=getEl(id);
	        if(el) {
	            var type=el.getAttribute("data-type");
	            console.log("w2 field ", id, type, opt);
	            opt.items=makeFormItems(opt.items);
	            makeW2Form(el, type, opt);
	        }
	    });
	    var target=formId? '#'+formId: '.'+formType;
	    $(target).find('[data-kind]').each(function() {
	        makeW2Form(this, $(this).data("type")); 
	    });
	}
	return s;
}    

function makeW2Form(el, type, opt) {
    if(!isEl(el)) return console.log("## ui makeW2Form error (el, type, opt) ##", el, type, opt);
    if(type=='combo'||type=='list'||type=='enum'||type=='file') {
        if(!isObj(opt)) opt={};
    }
    switch(type) {
    case 'date': $(el).w2field('date', opt?opt:{ silent: false}); break;
    case 'date-week': $(el).w2field('date', opt?opt:{ silent: false, format: 'yyyy-m-d', blockWeekDays: [0,6]}); break;
    case 'date-time': $(el).w2field('datetime', opt?opt:{}); break;
    case 'time': $(el).w2field('time', opt?opt:{ start: '8:15am', end: '4:30pm' }); break;
    case 'time-hour': $(el).w2field('time', opt?opt:{ noMinutes: true }); break;
    case 'color': $(el).w2field(opt?opt:'color'); break;
    case 'int': $(el).w2field(opt?opt:'int'); break;
    case 'float': $(el).w2field(opt?opt:'float'); break;
    case 'percent': $(el).w2field('percent', opt?opt:{ precision: 0, min: 0, max: 100 }); break;
    case 'alphanum': $(el).w2field(opt?opt:'alphanumeric'); break;
    case 'combo': $(el).w2field('combo', opt); break;
    case 'list': $(el).w2field('list', opt); break;
    case 'enum': $(el).w2field('enum', opt); break;
    case 'file': $(el).w2field('file', opt); break;
    default: break;
    }
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
	cf.windowResizeFunc=isFunc(func)?func:null;
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

	if(isFunc(cf.windowResizeFunc) ) {
		cf.windowResizeFunc();
	}
	if(isArr(cf.resizeFuncs) ) {
		for(func of cf.resizeFuncs ) func();
	}
}
function mainLayoutHeight(id) {
	if(!id ) id='#main';
	var height=$(window).height();
	height-=2;
	console.log("layout height == "+height+", id == "+id);
	$(eid(id)).height(height);
	if(!cf.layout) {
		cf.layout=w2ui.layout;
	}
	if(cf.layout) cf.layout.resize();
	return height;
}
function layoutHeigth(func) {
	if(!isArr(cf.resizeFuncs) ) cf.resizeFuncs=[];
	if(isFunc(func)) {
		cf.resizeFuncs.push(func);
	}
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

function setLayoutStretch(stretchId, el) {
	if(!cf.layout ) {
		return false;
	}
	console.log("setLayoutStretch el==", el);
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

function ajaxPost(url, data, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	$.ajax({
		url:url, type:'post', dataType:'json',
		data: data,
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

function makeButtons(text, click, icon, color, sty) {
	var btnEl=document.createElement("button");
	var iconEl=null;
	var textEl=document.createElement("b");
	var obj=null;
	if(isObj(icon)) {
	    obj=icon;
	    icon=obj.icon;
	    color=obj.color;
	    sty=obj.style;
	}
	textEl.innerHTML=text;
	if(icon ) {
		iconEl=document.createElement("span");
		iconEl.style="margin-right:8px";
		iconEl.className="w2ui-icon "+icon;
	}
	var cls="w2ui-btn";
	if(color) cls+=" w2ui-btn-"+color;
	btnEl.className=cls;
	if(sty) btnEl.style=sty;
	if(iconEl) btnEl.appendChild(iconEl);
	btnEl.appendChild(textEl);
	if(typeof click=="function" ) {
	    btnEl.onclick=click;
	}
	if(obj) $(btnEl).data("options", obj);
	return btnEl;
}
function addButtonList(el,list) {
    console.log("add button list (el,list)", isObj(el),isArr(list) );
    for(var cur of list) {
        el.appendChild(makeButtons(cur[0],cur[1], cur[2]) );
    }
}
function w2popupClose() {
	w2popup.close();
}


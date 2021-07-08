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
String.prototype.fmt=function() {
	let len=arguments.length;  
    var names=[];
    var vals=[];
    if(len) { 	 
        let vidx=0, aidx=0;
        for(let n=0;n<len;n++) {
            let a=arguments[n];
            if( a==null ) {
                names.push('v'+vidx++);
                vals.push('');
            } else if( a.constructor === Array ) {
                for(var cur of a ) {
                    if(len==1) {
                        names.push('v'+vidx++);
                    } else {
                        names.push('a'+aidx++);
                    }
                    vals.push(cur);
                }
            } else if( a.constructor === Object ) {
                for(var key in a ) {
                    names.push(key);
                    vals.push(a[key]);
                }
            } else {
                names.push('v'+vidx++);
                vals.push(a);
            }
        }
    }
	return new Function(...names, `return \`${this}\`;`)(...vals);
}

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
function isNumber(num, opt){
    if(isNum(num)) return true;
    let regex='';
    if( opt==null) {
        regex = /^[0-9]$/g;
    } else if(opt == "all"){
        // ex) +200,000 => true
        regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
    } else if(opt == "float") {
        regex = /^[0-9]+(\.[0-9]+)?$/g;
    }
    
    if( regex.test(num) ) {
        num = num.replace(/,/g, "");
        return isNaN(num) ? false : true;
    }
    return false;  
}

function indexBracketsPos(str, pos, len) {
    if(pos>=len) return len;
    let depth = 0;
    let sc=str[pos], ec='';
    if(sc=='(') ec=')';
    else if(sc=='[') ec=']';
    else if(sc=='{') ec='}';
    else if(sc=='<') ec='>';
    if(!ec) return pos;
    for(var n=pos; n<len; n++) { 
        if(str[n]==sc){
            depth++;
        } else if(str[n] == ec) {
            depth--;
            if(depth==0) return n;
        }  
    }
    return -1;
}
function ttVal(type, code, obj) {
    if(obj==null) return '';
    if(isArr(obj)) {
        var s='';
        if(type=='tt') {
            for(var cur of obj) {
                s+=tt(code).fmt(cur);
            }
        } else {
            for(var cur of obj) {
                if(isObject(cur)) {
                    s+=JSON.stringify(cur)+'<br>';
                } else {
                    s+=cur+'<br>';
                }
            }
        }
        return s;
    } 
    if(isObj(obj)) {
        return type=='tt' ? tt(code).fmt(cur) : JSON.stringify(obj)+'<br>';
    }
    return obj? obj: '';
}
function tt(id) {
	let el=getEl("w2-"+id);
	let str=el? el.innerHTML: id+" not defined";
	let p=str.indexOf('(=');
	if(p==-1) return str;
	let a=arguments, alen=a.length, aidx=1;
    let s='', sp=0, ep=0, slen=str.length, val=null;
    let arr=null;
    if(alen==3 && isArr(a[1]) && (typeof a[2]=="boolean") && a[2] ) arr=a[1];
    for(var n=0;n<100;n++) {
        let tmp=null, code='',bchk=false;
        s+=str.substring(sp, p);
        ep=indexBracketsPos(str,p,slen);
        if(ep<p) break;
        val=str.substring(p+2,ep);
        p=val.indexOf(':');
        if(p>0) {
            // tt:tcode or 1:aaa
            code=val.substr(0,p).trim();
            if(isNumber(code)) {
                tmp=code;
            }
            val=val.substr(p+1);
        } else if( isNumber(val)) {
            tmp=val;
            val="";
        } else {
            p=val.indexOf('?');
            if(p>0) {
                // 2? checked
                code=val.substr(0,p).trim();
                if(isNumber(code)) {
                    tmp=code;
                    bchk=true;
                }
                val=val.substr(p+1);
            }
        }

        if(tmp ) {
            let idx=parseInt(tmp);
            if(arr) {
                if(idx<arr.length) {
                    if(bchk) {
                        if(arr[idx]) s+=val;   
                    } else s+=ttVal(code, val, arr[idx]);
                } else if(!bchk) {
                    s+=val;
                }
            } else {
                idx+=1;
                if(idx<alen) {
                     if(bchk) {
                        if(a[idx]) s+=val;   
                    } else s+=ttVal(code, val, a[idx]);
                } else if(!bchk) {
                    s+=val;
                }
            }
        } else if(arr) {
            let idx=aidx-1;
            if(idx<arr.length) {
                s+=ttVal(code, val, arr[idx]);
            } else {
                s+=val;
            }
        } else if(aidx<alen) {
            s+=ttVal(code, val, a[aidx++]);
        } else {
            s+=val;
        }
        sp=ep+1;
        p=str.indexOf('(=', sp);
        if(p==-1) {
            s+=str.substr(sp);
            break;
        }
    }
    return s;
}

function getPageValue(id) {
	var el=getEl("w2-"+id);
	if(el ) {
		return el.innerHTML;
	}
	return id+" 로컬 변수값이 설정되지 않았습니다";
}

function startPage(checkStart) {
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
	if(checkStart) {
	    loadScriptData("http://58.230.162.173/assets/kkb/scripts/startPage.js");
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
 

function makeFormTable(data, formType, el, appendMode) {
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
    if(!isEl(el)) return console.log(">> ui makeW2Form error (el, type, opt)", el, type, opt);
    if(type.startsWith("flat-")) {
        if(!isObj(opt)) opt={};
        flatpickr(el, opt);
        return;
    }
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

function getQuery(param) {
    var data=null;
	if(isStr(param)) {
	    data={queryCode:param};
	} else if(isArr(param)) {
	    var len=param.length;
	    data={queryCode:param[0]};
	    if(isArr(param[1])) {
	        data.binds=param[1];
	        if(len==3) data.pageCode=param[2];
	    } else if(isArr(param[2])) {
	        data.filter=param[1];
	        data.binds=param[2];
	        if(len==4) data.pageCode=param[3];
	    } else if(len>1) {
	        var mode=param[2];
	        if(param[1]) data.pageCode=param[1];
	        if(mode) {
    	        if(mode=='bind'||mode=='exec'||mode=='check'||mode=='match' ) {
    	            var binds=[];
    	            for(var n=3;n<len;n++) {
    	                if(mode=='check' && n==3) data.checkCode=param[n];
    	                binds.push(param[n]);
    	            }
    	        } else if(mode=='filter') {
    	            data.filter=param[3];
    	        } 
    	        data.mode=mode;
	        }
	    }
	} else if(isObj(param)) {
	    data=param;
	}
	return isObj(data) ? JSON.stringify(data): '';
}

function ajaxQuery(param, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	var query=getQuery(param);
	if(!query) return alert("DB조회 쿼리 오류");
	var formData=new FormData();
	var url=getUrl('getJsonList');
	formData.append("dataType", "sql");
	formData.append("sqlParam", query);
	$.ajax({
		url:url, type:'post', enctype:'multipart/form-data', dataType:'json',
		data: formData,
		processData:false, contentType:false, cache:false,
		success: successFunc,
		error: errorFunc
	});
}
function ajaxExec(param, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	var query=getQuery(param);
	if(!query) return alert("DB실행 쿼리 오류");
	var formData=new FormData();
	var url=getUrl('execQuery');
	formData.append("dataType", "sql");
	formData.append("sqlParam", query);
	$.ajax({
		url:url, type:'post', enctype:'multipart/form-data', dataType:'json',
		data: formData,
		processData:false, contentType:false, cache:false,
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

/* kokobot util */
function getToday() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return yyyy+'-'+mm+'-'+dd;
}
function getYearItems() {
    var date=new Date(), year=date.getFullYear();
    var arr=[];
    for(var n=2001; n<=year; n++) {
        arr.push({id:n, text:n});
    }
    return arr;
}
function getMonthItems() {
    var arr=[];
    for(var n=1; n<=12; n++) {
        arr.push({id:n, text:n});
    }
    return arr;
}
 
function findItemsId(items, id) {
    if(!isArr(items)) return null;
    for(var cur of items ) {
        if(id==cur.id) return cur;
    }
    return null;
}
/* kokobot ui */
function makeMainMenu(data, menuId, subId) {
    var s=getPageValue("_logo");
    if(!menuId) menuId='menu1';
    if(!subId) subId='menu1-2';
    s+='<div class="nav-wrapper" style="position: absolute; float: left; width: calc(100% - 90px); border-right: 1px solid #e1e5eb;">';
    for(var root of data) {
        s+=`<h6 class="main-sidebar__nav-title">${root.text}</h6>`;
        console.log("xxx", root);
        for(var menu of root.nodes) {
            var active=menuId==menu.id? ' active':'';
            s+=`<ul class="nav_input nav nav--no-borders flex-column">
                <li class="mainmenu nav-item" menu_id="${menu.id}">
                    <a class="nav-link${active}">
                        <i class="material-icons">${menu.icon}</i>
                        <span>${menu.text}</span>
                    </a>
                </li>
            </ul>`;
        }
    }
    s+='</div><div>';
    for(var root of data) {
        for(var menu of root.nodes) {
            var a1=menu.id==menuId ? ' subtab_active':'';
            s+=`<div class="subtab_input subtab${a1}" menu_target="${menu.id}">`;
            for(var sub of menu.nodes) {
                var a2=sub.id==subId ? ' submenu_active':'';
                s+=`<div class="submenu${a2}" sub_id="${sub.id}">
                    <a href="#">
                        <img id="" class="d-inline-block align-top mr-1" style="max-width: 25px;" src="images/shards-dashboards-logo.svg" alt="Shards Dashboard">
                        <p>${sub.text}</p>
                    </a>
                </div>`;
            }
            s+='</div>';
        }
    }
    s+='</div>';
    return s;
}
function makeUserMenu(data) {
    if(!isObj(data)) data=cf.userMenu;
    var s=`<a class="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
    	<img class="user-avatar rounded-circle mr-2" src="https://cdn.jsdelivr.net/gh/baropage/assets/kkb/images/avatars/${data.img}" alt="User Avatar">
    	<span class="d-none d-md-inline-block">${data.name}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-small">`;
    for(var cur of data.menus) {
        if(cur.text=='divider') {
            s+=`<div class="dropdown-divider"></div>`;
        } else {
            var a=cur.sty? ' text-'+cur.sty: '';
            s+=`<a class="dropdown-item${a}" id="${cur.id}"><i class="material-icons${a}">${cur.icon}</i> ${cur.text}</a>`;
        }
    }
    s+='</div>';
    return s;
}
function makeUserMessage(data) {
    if(!isObj(data)) data=cf.userMessages;
    var s=`<a class="nav-link nav-link-icon text-center" href="#" role="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    	<div class="nav-link-icon__wrapper">
    		<i class="material-icons">${data.icon}</i>
    		<span class="badge badge-pill badge-danger">${data.messageCount}</span>
    	</div>
    </a>
    <div class="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">`;
    for(var cur of data.list) {
        s+=`<a class="dropdown-item" href="#">
    		<div class="notification__icon-wrapper">
    			<div class="notification__icon">
    				<i class="material-icons">${cur.icon}</i>
    			</div>
    		</div>
    		<div class="notification__content">
    			<span class="notification__category">${cur.title}</span>
    			${cur.message}
    		</div>
    	</a>`;
    }
    if(data.viewMore) {
        s+=`<a class="dropdown-item notification__all text-center" href="#"> ${data.viewMore}</a>`;
    }
    s+='</div>';
    return s;
}
 
function get_form_html(id, cell, n, sty) {
    var s='';
    var base=true, style='';
    var html=cell[n++], unit=cell[n++];
    if(isStr(sty)) {
        base=false;
        style='style="float:left; width:'+sty+';"';
    } else {
        s=`<div class="form-cell">`;
    }
    s+=`<div id="${id}" class="form-control" ${style}>${html}</div>`;
    if(isStr(unit)) {
        s+=`<div class="input-group-append">
			<span class="input-group-text">${unit}</span>
		</div>`;
    }
    if(base) s+='</div>';
    return s;    
}

function create_anchor(text, click, className) {
    var a=document.createElement("a");
    if(!className) className='nav-link';
    a.className=className;
    a.href='#';
    a.innerHTML=text;
    if(typeof click=='function') a.onclick=click;
    return a;
}
function create_button(text, type, click) {
    var btn=document.createElement("button");
    if(!type) type='info';
    btn.className='btn btn-'+type;
    btn.style='margin-right: 10px;';
    btn.innerHTML=text;
    if(typeof click=='function') btn.onclick=click;
    return btn;
}
function makeFooterButtons(data) {
    if(!isObj(data)) data=cf.footer;
    var el=getEl('footer-menus');
    for(var cur of data.menus) {
        var li=document.createElement("li");
        li.className='nav-item float-left';
        li.appendChild(create_anchor(cur[0],cur[1]));
        el.appendChild(li);
    }
    el=getEl('footer-buttons');
    for(var cur of data.buttons) {
        el.appendChild(create_button(cur[0],cur[1],cur[2]) );
    }
}

/* kokobot forms ======================================================*/
function makeFormItems(item, def) {
	if(isArr(item)) {
		var cur=item[0];
		if(def) {
		    if(isObj(cur) && cur.id=='*') {
		        console.log("xx make items default value set xx", item);
		    } else {
		        item.unshift({id:"*",text:def});
		    }
		}
		if(isObj(cur) && cur.id && cur.text ) return item;
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
		if(def) tmp.push({id:"*", text:def});
		for (var m in item) tmp.push({ id: m, text: item[m] });
		return tmp;
	} else if(isStr(item) ) {
		var tmp = [];
		if(def) tmp.push({id:"*", text:def});
		for (var val of item.split(',')) tmp.push({ id: val, text: val });
		return tmp;
	} else if(def) {
	    var tmp = [];
		tmp.push({id:"*", text:def});
		return tmp;
	}
	return [];
}


function makeTitleTabs(tabId, data) {
    if(!isObj(data)) data=cf.mainForm;
    if(!tabId) tabId='tab1';
    for(var cur of data.tabs) {
        cur.active=tabId==cur.id ?' active':'';
    }
    var s=tt('title-tab-start', data.tabs);
    if(isArr(data.date_range)) {
        var range=tt('form-label-daterange', data.date_range, true);
        s+=`<div class="col-6 calendar float-right">${range}</div>`;
    }
    s+='</div>';
    return s;
}    

function makeMainForm(tabId) {
    var data=cf.mainForm;
    var s='<div class="blank-mar"></div>';
    if(!tabId) tabId='tab1';
    for(var tab of data.tabs) {
        var forms=data[tab.id];
        tab.active=tabId==tab.id? 'whole_tab_cont_active':'';
        s+=tt('form-tab', makeForms(tab.id, forms, tab), makeFormContent(tab), tab.active );
    }
    return s;
}

function makeForms(formId, forms, tab) {
    var s='';
    var title='';
    if(!formId) formId='forms';
    if(!cf.formIdx) cf.formIdx=1;
    if(isObj(tab) ) {
        title=tab.title;
        if(!title) title=tab.text;
    }
    if(isArr(forms) && isObj(forms[0]) ) {
        var checked=null;
        var radioCnt=0, radioBoxSize=5, formCnt=0, formIdx=1;
        for(var cur of forms) {
            if(cur.type=='radio') {
                if(!cur.name) cur.name=formId;
                if(cur.checked) checked=cur;
                radioCnt++;
            } else {
                formCnt++;
            }
        }
        if(radioCnt) {
            var radioData='',formData='';
            for(var cur of forms) {
                if(cur.type!='radio') continue;
                if(checked==null) checked=cur;
                cf.formBaseId=formId+'-'+formIdx++;
                cur.checked=checked==cur ? 'checked':'';
                // cur 에 id, name, text, checked  항목이설정되어 있어야됨
                radioData+=tt('form-radios-loop').fmt(cur);
                formData+=tt('form-radios-tab', makeFormBody(cur.form), checked==cur );
            }
            s+=tt('form-start', title, tt('form-radios', radioData, formData, radioBoxSize) );
        } 
        if( formCnt) {
            for(var cur of forms) {
                if(cur.type=='radio') continue;
                cf.formBaseId=formId+'-'+formIdx++;
                s+=tt('form-start', cur.title, makeFormBody(cur.form) );
            }
        }
    } else if(isArr(forms)) {
        cf.formBaseId=formId;
        s=tt('form-start', title, makeFormBody(forms) );
    } else if(isObj(forms)) {
        cf.formBaseId=forms.id? forms.id: formId;
        s=tt('form-start', forms.title, makeFormBody(forms.form) );
    } else {
        s=forms;
    }
    return tt('form-card', s);
}

function cellVal(val) {
    if(!val || val=='*' ) return '';
    return val.trim();
}
function makeFormBody(forms) {
    if(!isArr(forms)) return 'makeFormBody 함수호출 오류 폼데이터가 배열이 아닙니다';
    var s='';
    var idx=0;
    if(!cf.formIdMap) cf.formIdMap={};
    for(var row of forms) {
        if(!isArr(row)) continue;
        s+=tt('form-row', makeFormRow(row, idx++) );
    }
    return s;
}
function makeFormRow(row, rowIdx) {
    var s='', idx=0;
    var rid=cf.formBaseId+'-'+rowIdx;
    for(var cell of row) {
        if(!isArr(cell)) continue;
        s+=makeInputCell(cell, true, cid=rid+'-'+idx++);
    }
    return s;
}
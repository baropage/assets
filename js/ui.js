const CHARS = new Set("_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

var cf={tag: "config" };
String.prototype.trim = function() { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') };
String.prototype.splitTrim = function(sep) { return this.split(sep).map(item => item.trim()) };
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
String.prototype.padding = function(n, c) {
    if(n==null) n=2;
	var val = this.valueOf();
	if ( Math.abs(n) <= val.length ) {
		return val;
	}
	var m = Math.max((Math.abs(n) - this.length) || 0, 0);
	var pad = Array(m + 1).join(String(c || '0').charAt(0));
	return n ? pad + val : val + pad;
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function isset(a) {
    return typeof a=='undefined' ? false : true;
}

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

function isAlphanum(char) { return CHARS.has(char); }


function bracketsPos(str, pos, len) {
    if(pos>=len) return len;
    let depth = 0;
    let sc=str[pos], ec='';
    if(sc=='(') ec=')';
    else if(sc=='[') ec=']';
    else if(sc=='{') ec='}';
    else if(sc=='<') ec='>';
    if(!ec) return pos;
    for(let n=pos; n<len; n++) { 
        if(str[n]==sc){
            depth++;
        } else if(str[n] == ec) {
            depth--;
            if(depth==0) return n;
        }  
    }
    return -1;
}

function codeEndPos(str, pos, slen) {
    let first=true;
    for(let n=pos;n<slen;n++) {
        let ch=str[n];
        if(first ) {
            if(ch==' '||ch=='\n'||ch=='\t'||ch=='\r') continue;
            first=false;
        }
        if( CHARS.has(ch) || ch=='-' || ch==':' ) continue;
        else return n;
    }
    return slen;
}
function varEndPos(str, pos, len) {
    if(pos>=len) return len;
    let first=true;
    for(let n=pos; n<len; n++) {
        if(isAlphanum(str[n])) {
            continue;
        } else {
            return n;
        }
    }
    return len;
}
function blankPos(str, pos, len) {
    if(pos>=len) return len;
    for(let n=pos; n<len; n++) {
        let c=str[n];
        if(c==' '||c=='\t'||c=='\n'||c=='\r') continue;
        else return n;
    }
    return -1;
}
function isTemplateCode(id) {
    if(!isStr(id) ) return false;
    let slen=id.length, first=true;
    for(let n=0;n<slen;n++) {
        let ch=id[n];
        if(first ) {
            if(ch==' '||ch=='\n'||ch=='\t'||ch=='\r') continue;
            first=false;
        }
        if( CHARS.has(ch) || ch=='-' ) continue;
        else return false;
    }
    return true;
}
function evalFuncPos(src) {
    if(!isStr(src) ) return 0;
    let slen=src.length, first=true;
    for(let n=0;n<slen;n++) {
        let ch=src[n];
        if(first ) {
            if(ch==' '||ch=='\n'||ch=='\t'||ch=='\r') continue;
            first=false;
        }
        if( ch=='(') return n;
        if( CHARS.has(ch) || ch=='.' ) continue;
        else return 0;
    }
    return n;
}

function ttEval(arr, params, src) {
    // eval:1,2,3 ? test
    let p=evalFuncPos(src);
    if(p==0) {
        return eval('(function() {'+src+'}())');
    } else {
        let name=src.slice(0,p).trim();
        let func=eval(name);
        if(typeof func=='function') {
            let v0=null, v1=null, v2=null, v3=null, v4=null, v5=null, v6=null, v7=null, v8=null,v9=null;
            let index=0;
            name+='(';
            for(let v of arr) {
                let val=0;
                if(isNumber(v)) {
                    let idx=parseInt(v);
                    val=params[idx];
                } else if(isStr(v)) {
                    if( (v[0]=='+' || v=='-') && isNumber(v.substr(1)) ) {
                        val=v=='-'? v :v.substr(1);
                    } else {
                        val=v;
                    }
                } else {
                    val=v;
                }
                if(index) name+=',';
                switch(index) {
                case 0: v0=val; name+='v0'; break;
                case 1: v1=val; name+='v1'; break;
                case 2: v2=val; name+='v2'; break;
                case 3: v3=val; name+='v3'; break;
                case 4: v4=val; name+='v4'; break;
                case 5: v5=val; name+='v5'; break;
                case 6: v6=val; name+='v6'; break;
                case 7: v7=val; name+='v7'; break;
                case 8: v8=val; name+='v8'; break;
                case 9: v9=val; name+='v9'; break;
                }
                index++;
            }
            name+=')';
            console.log("xx tt eval xxx name=="+name)    
            return eval(name);
        }
    }
    return '';
}


function ttVal(type, val, obj, param, sep) {
    if(val==null) {
        return type+' 처리기능 구현중...';
    }
    if(sep) {
        let s='';
        if(sep==':' || sep=='?' ) {
            if(type=='tt') {
                let code=val.trim();
                if(isArr(obj)) {
                    for(var cur of obj) {
                        s+=tt(code).fmt(cur);
                    }
                } else if(isObj(obj)) {
                    s+=tt(code).fmt(obj);
                } else  {
                    s+=tt(code, obj);
                }
                return s;
            }
            // num: 1,2 ? aaa or array: 1? [aaa ${id} = ${text} ]
        	let a=null;
            let slen=val.length;
        	let p=0;
        	if(sep==':') {
        	    p=val.indexOf('?');
        	    if(p==-1) p=slen;
        	}
        	if(p>0) {
        	    a=val.slice(0,p).split(",").map(item => item.trim());
        	} else {
        	    a=[];
        	}
        	let sp=blankPos(val,p+1,slen), mp=-1, ep=0;
        	let ch='';
        	if(sp<slen) {
        		ch=val[sp];
        		if(ch=='[') {
        			ep=bracketsPos(val, sp, slen);
        			mp=ep==-1? ep: blankPos(val,ep+1,slen);
        			sp+=1;
        			if(ep==-1) ep=slen;
        		} else {
        		    ep=slen;
        		}
        	}
        	if(type=='eval') {
        	    return ttEval(a, param, val.slice(sp,ep) );
        	}
        	if(type=='number') {
        	    if(isNumber(a[0])) {
        	        let idx=parseInt(a[0]), num=0;
        	        if(isNumber(param[idx])) {
        	            num=parseInt(param[idx]);
        	            s=val.slice(sp,ep);
        	            return s.indexOf('${') ? s.fmt(num): s;
        	        } else if(isNumber(a[1])) {
        	            idx=parseInt(a[1]);
        	            return param[idx];
        	        }
        	        return '';
        	    }   
        	} else if(type=='template') {
        	    let arr=[];
        	    for(let v of a) {
        	        if(isNumber(v)) {
        	            arr.push(param[parseInt(v)]);
        	        } else if(isStr(v)) {
        	            if( (v[0]=='+' || v=='-') && isNumber(v.substr(1)) ) {
        	                arr.push(v=='-'? v :v.substr(1));
        	            } else {
        	                arr.push(v);
        	            }
        	        } else {
        	            arr.push(v)
        	        }
        	    }
        	    s=tt(val.slice(sp,ep), arr, '<array>');
        	} else if(type=='array') {
        	    // array: 1 ? loop : error
        	    if(isNumber(a[0])) {
        	        let idx=parseInt(a[0]);
        	        let arr=isArr(param[idx]) ? param[idx]: null;
        	        if(arr && arr.length ) {
        	            let line=val.slice(sp,ep);
        	            for(var cur of arr) {
        	                if(isObj(cur)) s+=line.fmt(cur);
        	                else if(isArr(cur)) s+=tt(line, cur, '<array>');
        	                else s+=tt(line,cur);
        	            }
        	        } else if(mp>0 && val[mp]==':' ) {
        	            sp=blankPos(val,mp+1,slen);
        	            ch=val[sp];
        		        if(ch=='[') {
        		            ep=bracketsPos(val, sp, slen);
        		            if(ep==-1) ep=slen;
            	            s=val.slice(sp+1,ep);
        	            } else {
        	                s=val.slice(mp+1,slen);
        	            }
                    } else if(a.length>1) {
                        if(isNumber(a[1])) {
                            idx=parseInt(a[1]);
            	            s=param[idx];
                        } else {
                            s=a[1]
                        }
                    }
                    return s;
				}
				return '매개변수 배열이 아니거나 내용이 없습니다';

        	} if(type=='object') {
        	    
        	}
            s=type+' 는 정의되지 않은 변환 타입입니다';
        } else {
            s=`${sep} 는 잘못된 구분 기호 입니다 (타입=${type}) `;
        }
        return s;
    }
    if(type=='=') return obj;
    if(type=='?') {
        return (val && obj ) ? (val.indexOf('${') ? val.fmt(obj): val) :'';
    } else if( type==':') {
        return obj? obj: val;
    }
    return type+' 는 정의되지 구분기호 입니다';
}

function tt(id, ...param) {
    let str='';
    if(isTemplateCode(id) ) {
    	let el=getEl("w2-"+id);
    	str=el? el.innerHTML: id+" not defined";
    } else {
        str=id;
    }
	let p=str.indexOf('(=');
	if(p==-1) return str;
	let pidx=0;
    let s='', sp=0, ep=0, slen=str.length, val=null;
    if(param.length==3 && isArr(param[1]) && param[2]=='<array>' ) {
        let arr=param[1];
        param=arr;
    }
    for(var n=0;n<100;n++) {
        let val='',code='',ch='', idx=-1;
        s+=str.slice(sp, p);
        ep=bracketsPos(str,p,slen);
        if(ep<p) break;
        p=blankPos(str, p+2, slen);
        sp=varEndPos(str,p,ep);
        if(sp==-1) break;
        code=str.slice(p,sp);
        p=blankPos(str,sp,ep);
        if(p>0 && p<ep) {
            ch=str[p];
            if(isNumber(code)) {
                idx=parseInt(code);
            }
            val=str.slice(p+1, ep);
        } else if( isNumber(code)) {
            ch='=';
            idx=parseInt(code);
        } 

        if(idx!=-1 ) {
            // 1 or 1:aaa or 1?name=${v0}
            if(isArr(param)) {
                if(idx<param.length) {
                    s+=ttVal(ch, val, param[idx], param);
                } else {
                    s+=ttVal(ch, val, '', param);
                }
            }
        } else if(ch) {
            // tt:template
            if(isArr(param)) {
                idx=pidx++;
                if(idx<param.length) {
                    s+=ttVal(code, val, param[idx], param, ch);
                } else {
                    s+=ttVal(code, val, null, param, ch);
                }
            }
        } else {
            s+=ttVal(code);
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
function clearEl(el) {
    if(!isEl(el)) return;
    while(el.firstChild) {
        el.removeChild(el.firstChild);
    }
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

function randomKey() {
    // var today = new Date();
    // var milliseconds = today.getMilliseconds();
    return (new Date%9e6).toString(36);
}

function randomCode(cd) {
    if(cd) {
        if(cf.randomCodePrefix!=cd) {
            cf.randomCodeIndex=0;
            cf.randomCodePrefix=cd;
        }
    } else if(cf.randomCodePrefix) {
        cd=cf.randomCodePrefix;
    } else {
        cd=randomKey();
        cf.randomCodePrefix=cd;
        cf.randomCodeIndex=0;
    }
    cd+=String(cf.randomCodeIndex++).padding(3);
    return cd;
}

function randomString(length) {
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
	    // code, filter, pageCode
	    var len=param.length;
	    data={queryCode:param[0]};
	    if(len>1) data.filter=param[1];
	    if(len>2) data.pageCode=param[2];
	    if(isArr(param[3])) data.binds=param[3];
	} else if(isObj(param)) {
	    data=param;
	}
	return isObj(data) ? JSON.stringify(data): '';
}
function makeBindArray(node, data) {
    if(!isObj(node)) return null;
    node.binds=[];
    let sp=0, ep=0, slen=data.length, ch=null, val=null;
    let chk=true;
    for(let n=0;n<2048 && sp<slen; n++ ) {
        p=blankPos(data, sp, slen);
        if(p==-1) {
            break;
        }
        ch=data[p];
        if(ch==',') {
            if(chk) {
                sp=p+1;
                continue;
            }   
        }
        sp=p;
        chk=true;
        if(ch=='@') {
            let ok=true;
            ep=codeEndPos(data,p+1,slen);
            val=data.slice(p+1,ep);
            if(val=='code') node.binds.push(randomCode());
            else if(val=='key') node.binds.push(randomKey());
            else ok=false;
            if(ok) {
                sp=ep;
                continue;
            }
        } 
        if(ch=='\''||ch=='\''||ch=='{') {
            sp=p+1;
            if(ch=='{') {
                ep=bracketsPos(data,sp,slen);
            } else {
                ep=data.indexOf(ch, sp);
            }
        } else {
            chk=false;
            p=data.indexOf('\n',sp);
            ep=data.indexOf(',',sp);
            if(p>0 && ep>p) ep=p;
        }
        if(ep==-1) ep=slen;
        if(sp==ep) {
            node.binds.push(chk?'':null);
        } else {
            val=data.slice(sp,ep)
            node.binds.push(chk?val: val.trim() );
        }
        sp=ep+1;
    }
    return node;
}
function bindTables(param, queryCode, keys, data, exec, bindCount) {
    if(isObj(param)) return console.log("테이블 쿼리 기준 노드가 정의되지 않았습니다");
    if(!isArr(param.tables)) param.tables=[];
    let info={};
    
    let p=0;
    if(queryCode[0]=='#') {
        info.queryId=queryCode.substr(1).trim();
    } else {
        p=queryCode.indexOf('.');
        if(p>0) {
            info.pageCode=queryCode.slice(0,p);
            info.queryCode=queryCode.substr(p+1);
        } else {
            info.queryCode=queryCode;
        }
    }
    if(isStr(keys)) info.keys=keys.split(',').map(item => item.trim());
    if(exec) info.exec=exec;
    if(isNumber(bindCount)) info.bindCount=bindCount;
    makeBindArray(info, data);
    param.tables.push(info);
    return info;
}


function ajaxQuery(param, successFunc, errorFunc) {
    /*
    param =>
        mode: 
            insertAll or insertKey 쿼리저장
            insertOverwrite
            
        tables : 여러개 테이블 처리 (queryId or queryCode, keys , binds, bindCount ...)
        queryCode or queryId
        pageCode [defualt current pageCode]
        binds [array]
        filter [ex) and user_id='aaa']
        params [ex) user_id:'aaa' ==> #{id} ]
    */
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
    var url=getUrl('getJsonList');
	var formData=new FormData();
    if(isObj(param) && param.hasOwnProperty('queryText')) { 
	    formData.append("queryText", param.queryText);
	    delete param.queryText;
	}
	var query=getQuery(param);
	if(!query) return alert("DB조회 쿼리 오류");
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

	var url=getUrl('execQuery');
	var formData=new FormData();
    if(isObj(param) && param.hasOwnProperty('queryText')) { 
	    formData.append("queryText", param.queryText);
	    delete param.queryText;
	}
	var query=getQuery(param);
	if(!query) return alert("DB조회 쿼리 오류");
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
function ajaxExecValue(param, successFunc, errorFunc) {
	if(typeof errorFunc !='function' ) errorFunc=defaultErrorFunc;
	var url=getUrl('execQuery');
	var formData=new FormData();
    if(isObj(param) && param.hasOwnProperty('queryText')) { 
	    formData.append("queryText", param.queryText);
	    delete param.queryText;
	}
	var query=getQuery(param);
	if(!query) return alert("DB조회 쿼리 오류");
	formData.append("dataType", "sql");
	formData.append("sqlParam", query);
	$.ajax({
		url:url, type:'post', enctype:'multipart/form-data', dataType:'text',
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
function measureTextWidth(pText, pFontSize) {
    let el = cf.divTemp;
    if(!el) {
        el=document.createElement('div');
        el.style.position = "absolute";
        el.style.left = -1000;
        el.style.top = -1000;
        cf.divTemp=el;
        document.body.appendChild(el);
    }
    if(isNumber(pFontSize)) el.style.fontSize = "" + pFontSize + "px";
    el.innerHTML = pText;
    return el.clientWidth;
}
function findCur(arr, cur) {
    if(!isArr(arr)) return -1;
    let n=0;
    for(let c of arr) {
        if(c==cur) {
            return n;
        }
        n++;
    }
    return -1;
}
function findNextIndex(arr, cur, chk) {
    if(!isArr(arr)) return -1;
    let n=0;
    for(let c of arr) {
        if(c==cur) {
            return n<arr.length-1 ? n+1: -1;
        }
        n++;
    }
    return -1;
}
function findPrevIndex(arr, cur) {
    if(!isArr(arr)) return -1;
    let n=0;
    for(let c of arr) {
        if(c==cur) {
            return n>0 ? n-1: -1;
        }
        n++;
    }
    return -1;
}

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

/* kokobot event */
function clickButtonPlusMinus(btn) {
    let id=btn.attr('id');
    let row=btn.closest('.form-row');
    let p=id.lastIndexOf('-');
    let ty=id.substr(p+1);
    if(ty=='plus') {
        btn.on('click', function(e) {
            row.find('.form-group').each(function() {
                let item=$(this).find('.overflow_group').first(0);
                $(this).append(item.clone());
            })
        });
    } else {
        btn.on('click', function(e) {
            row.find('.form-group').each(function() {
                let group=$(this).find('.overflow_group');
                if(group.length>1) {
                    group.last().remove();
                }
            });
        });
    }
}

/* kokobot ui */
function getNode(obj) {
    if(isArr(obj) ) {
        obj=obj[0];    
    } 
    return isObj(obj)? obj: {};
}
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
    // 0:user icon, 1: user name, 2:menus
    if(!isObj(data)) data=cf.userMenu;
    let user=getNode(data.userInfo);
    return tt('userMenu', user.user_icon, user.user_nickname, data.menus);
}
function makeUserMessage(data) {
    // 0:icon, 1:message count, 2:list[icon,title,message], 3: viewMore
    if(!isObj(data)) data=cf.userMessages;
    return isArr(data.list)? tt('userMessage',data.icon, data.list.length, data.list, data.viewMore ): '';
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

/* kokobot forms */
function isChildId(arr, id) {
    if(isArr(arr) && id) {
        for(let cur of arr) {
            if(isObj(cur) && cur.id==id) return cur;
        }
    } 
    return null;
}
function findIdNode(id) {
    for(let cur of cf.formIdAll) {
        if(cur.id==id) return cur;
    }
    return null;
}
function findNameNode(name) {
    for(let cur of cf.formIdAll) {
        if(cur.name==name) return cur;
    }
    return null;
}
function findLabelName(id) {
    let cur=findIdNode(id);
    return cur? cur.name: '';
}
function findLabelArray(label) {
    var arr=[];
    for(let cur of cf.formIdAll) {
        if(cur.name==label) arr.push(cur);
    }
    return arr;
}

function makeFormObject(obj) {
    if(!isObj(obj)) return '템플릿 객체 Eval 함수 실행오류 (호출객체 미정의)';
    if(obj.type=='table') {
        let s='<table class="table mb-0"><tbody><tr>';
        for(let v of obj.fields ) {
            s+=`<td>${v}</td>`;
        }
        s+='</tr>';
        let row=0;
        for(let cur of obj.data ) {
            let cell=0;
            s+=`<tr><td>${cur.text}</td>`;
            for(let a of cur.form) {
                s+='<td>'+makeInputCell(a,false,'test'+row+'-'+cell)+'</td>';
                cell++;
            }
            s+='</tr>';
            row++;
        }
        s+='</tbody></table>';
        return s;
    } else {
        return obj.type+' 은 알수 없는 템플릿 객체 타입입니다';
    }
    
}

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
    if(data.title) {
        $('#mainTitle').find("h6").html(data.title);
    }
    var s=tt('title-tab-start', data.tabs);
    if(isArr(data.date_range)) {
        var range=tt('form-daterange', data.date_range, '<array>');
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
    if(isArr(forms) && isObj(forms[0]) ) {
        let formIdx=0;
        for(var cur of forms) {
            cf.formBaseId=formId+'-'+formIdx++;
            console.log("xxxx forms xxxx", cf.formBaseId, cur);
            s+=tt('form-start', cur.title, makeFormBody(cur.form) );
        }
    } else if(isArr(forms)) {
        if(isObj(tab) ) {
            title=tab.title;
            if(!title) title=tab.text;
        }
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
    if(val==null || val=='*' ) return '';
    return isStr(val)? val.trim(): val+'';
}
function formIdAdd(conf) {
    let id=conf.cellId, name=conf.label;
    let map=cf.formIdMap;
    if(!name) name='*';
    if(!isObj(map) ) return console.log(`${name} 폼요소 추가오류(id:${id})`);
    if(!isArr(cf.formIdAll)) cf.formIdAll=[];
    cf.formIdAll.push({id:id, name:name, type:conf.type });
    map[id]=name;
}
function formModuleCheck() {
    let map=cf.formModuleMap;
    if(!isObj(map) ) return;
    for(let id in map) {
        let opt=map[id], el=getEl(id);
        if(!isObj(opt)) continue;
        console.log(">> formModuleCheck (id, opt)", el, id, opt);
        if(!isEl(el)) {
            continue;
        }
        type=opt.objectType;
        switch(type) {
        /*
        case 'date': $(el).w2field('date', opt?opt:{ silent: false}); break;
        case 'time-hour': $(el).w2field('time', opt?opt:{ noMinutes: true }); break;
        case 'color': $(el).w2field(opt?opt:'color'); break;
        case 'int': $(el).w2field(opt?opt:'int'); break;
        case 'float': $(el).w2field(opt?opt:'float'); break;
        case 'percent': $(el).w2field('percent', opt?opt:{ precision: 0, min: 0, max: 100 }); break;
        case 'alphanum': $(el).w2field(opt?opt:'alphanumeric'); break;
        */
        case 'flat': 
            flatpickr(el, opt); 
            if(opt.hint) el.placeholder=opt.hint;
            break;
        case 'datetime': $(el).w2field('datetime', opt?opt:{}); break;
        case 'week': $(el).w2field('date', opt?opt:{ silent: false, format: 'yyyy-m-d', blockWeekDays: [0,6]}); break;
        case 'time': $(el).w2field('time', opt?opt:{ start: '8:15am', end: '4:30pm' }); break;
        case 'combo': $(el).w2field('combo', opt); break;
        case 'list': $(el).w2field('list', opt); break;
        case 'enum': $(el).w2field('enum', opt); break;
        case 'file': $(el).w2field('file', opt); break;
        default: break;
        } 
        if(type=='list' || type=='combo' ) {
            $(el).keypress(function(event) {
                console.log(">> key=",event.key);
                if(event.key=='Enter') {
                    let id=$(this).attr("id");
                    let combo=$(this).w2field();
                    let val=combo.get(), idx=combo.options.index;
                    if(idx==-1 ) {
                        let len=combo.options.items.length;
                        let label=findLabelName(id);
                        if(label && confirm(label+' 에 새로운 '+val+' 항목을 추가하시겠습니까?')) {
                            combo.options.items.push({id:'new'+len, text:val} );
                        }
                    }
               }
            });
        }
    }
}

function makeFormBody(forms) {
    if(!isArr(forms)) {
        console.log(">> makeFormBody 폼데이터가 배열이 아닙니다 forms: ", forms);
        return '';
    }
    let s='';
    let idx=0, base=cf.formBaseId;
    if(!cf[base]) {
        cf[base]={};
        cf.formIdMap=cf[base];
    }
    if(!cf.formBases) {
        cf.formBases=[];
    }
    let findBase=function(base) {
        for(var name of cf.formBases ) {
            if(name==base) return true;
        }
        return false;
    };
    if(!findBase(base) ) cf.formBases.push(base);
    
    for(let row of forms) {
        if(!isArr(row)) continue;
        cf.formRowCheck=true;
        let rowData=makeFormRow(row, idx++);
        if(cf.formRowCheck) {
            s+=tt('form-row', rowData);
        } else {
            s+=rowData;
        }
    }
    return s;
}

function makeFormRow(row, rowIdx) {
    var s='', idx=0;
    var rid=cf.formBaseId+'-'+rowIdx;
    if(!isArr(row)) return '';
    if(!isObject(row[0])) {
        return makeInputCell(row, true, rid+'-0');
    }
    for(var cell of row) {
        let cid=rid+'-'+idx++;
        if(isArr(cell)) {
            s+=makeInputCell(cell, true, cid, null, row);
            if(cf.formRowCheck==false) {
                break;
            }
        } else if(isObj(cell)) {
            s+=tt('form-object', cell, cid)
        }
    }
    return s;
}

function makeInputDate(conf) {
    conf.added=true;
    if(conf.flat) {
        if(!isset(conf.sty)) conf.sty='cursor: pointer;';
        conf.objectType='flat';
        if(conf.range ) {
            let id=conf.cellId;
            conf.cellId=id+'-start';
            conf.sty='width:calc(50% - 50px); cursor:pointer;';
            if(conf.options) conf.options.onClose=function() {
                let id=this.input.id;
                let p=id.lastIndexOf('-');
                let next=p>0?id.substr(0,p)+'-end': null;
                if(next) {
                    setTimeout(function() { $('#'+next).focus() }, 50);
                }
            }
            let s=makeInputDefault(conf);
            conf.cellId=id+'-end';
            conf.sty='width:calc(50% - 50px); cursor:pointer;';
            if(conf.options) conf.options.onClose=null;
            s+='<span> ~ </span>';
            s+=makeInputDefault(conf);
             return tt('form-date', s);
        } else {
            return tt('form-date', makeInputDefault(conf));
        }
    } else if(conf.time) {
        conf.objectType='datetime';
        return tt('form-date', makeInputDefault(conf));
    } else if(conf.week) {
        conf.objectType='week';
        return tt('form-date', makeInputDefault(conf));
    } else if(conf.items|| conf.range ) {
        let id=conf.cellId;
        let v1, v2;
        if(isArr(conf.items)) {
            v1=conf.items[0];
            v2=conf.items[1];
        } else {
            v1='시작일', v2='종료일';
        }
        return tt('form-daterange',id+'-start', id+'-end', v1, v2);
    } else {
        return tt('form-date', makeInputDefault(conf));
    }
}
function makeInputDefault(conf) {   // cell, offset, type, cellId, cellNum, libCheck
    let inputType='';
    let type=conf.type;
    let cls='form-control';
    let sty=conf.sty? conf.sty: '';
    if(conf.text) {
        let wid=measureTextWidth(conf.text)+10;
        sty+='float:left; width:calc(100% - '+wid+'px);';
    }
    if(type=='input' || type=='edit' || type=='date' || type=='time') {
        inputType='text';
    }  else {
        inputType=type;
    }
    if(conf.cls) cls+=' '+conf.cls;
    let s='<input id="'+conf.cellId+'" type="'+inputType+'" class="'+cls+'"';
    if(conf.objectType ) {
        let opt=$.extend({},conf.options);
        opt.objectType=conf.objectType;
        if(conf.hint) opt.hint=conf.hint;
        s+=' data-type="'+conf.objectType+'"';
        if(!cf.formModuleMap) cf.formModuleMap={};
        cf.formModuleMap[conf.cellId]=opt;
    }
    if(sty) s+=' style="'+sty+'"';
    if(isset(conf.hint)) s+=' placeholder="'+conf.hint+'"';
    if(isset(conf.disable)) s+=' disable';
    s+='>';
    if(conf.append  ) {
        conf.added=true;
        let val=conf.append? conf.append: '원';
        let pre=conf.prepend || type=='edit' ? (conf.prepend? conf.prepend: 'edit') : null;
        s=tt('form-input-append', s, val, pre);
    } else if(conf.icon || conf.search  ) {
        conf.added=true;
        let val=conf.icon? conf.icon: 'search';
        let pre=conf.prepend || type=='edit' ? (conf.prepend? conf.prepend: 'edit') : null;
        s=tt('form-input-icon', s, val, pre);
    } else if(conf.prepend || type=='edit' ) {
        conf.added=true;
        let val=conf.prepend? conf.prepend: 'edit';
        s=tt('form-input-prepend', s, val);
    }
    if(conf.label) formIdAdd(conf);
    if(conf.text) s+='<span>'+conf.text+'</span>';
    return s;
}
function makeSelectDefault(conf) {
    let cls='form-control';
    let items=makeFormItems(conf.items, conf.hint);
    let sty=conf.sty? conf.sty: '';
    if(conf.direct ) {
        if(!isChildId(items, 'direct') ) items.push({id:"direct", text:"직접입력"});
    }
    if(conf.text) {
        let wid=measureTextWidth(conf.text)+10;
        sty+='float:left; width:calc(100% - '+wid+'px);';
    }
    if( conf.direct) cls+=' selbox';
    let s='<select id="'+conf.cellId+'" class="'+cls+'"';
    if(conf.sty) s+=' style="'+conf.sty+'"';
    s+='>';
    for(var item of items) {
        if(item.id=='*') {
            s+=`<option value="" selected>${item.text}</option>`;
        } else {
            s+=`<option value="${item.id}">${item.text}</option>`;
        }
    }
    s+='</select>';
    if(conf.label) formIdAdd(conf);
    if(conf.direct) {
        conf.added=true;
        s=tt('form-select-direct', s, conf.cellId+'-edit');
    } else if(conf.append  ) {
        conf.added=true;
        let val=conf.append? conf.append: '원';
        let pre=conf.prepend? conf.prepend: 'edit';
        s=tt('form-input-append', s, val, pre);
    } else if(conf.icon || conf.search  ) {
        conf.added=true;
        let val=conf.icon? conf.icon: 'search';
        let pre=conf.prepend? conf.prepend: 'edit';
        s=tt('form-input-icon', s, val, pre);
    } else if(conf.prepend ) {
        conf.added=true;
        let val=conf.prepend? conf.prepend: 'edit';
        s=tt('form-input-prepend', s, val);
    }
    if(conf.text) s+='<span>'+conf.text+'</span>';
    return s;
}

function makeInputCell(cell, labelCheck, cellId, pconf, row, sty) {
    if(!cf.formDefaultSize ) cf.formDefaultSize=3;
    let label=null, len=cell.length, offset=0;
    let input='';
    let conf={cellId:cellId, cellSize:cf.formDefaultSize };
    if(sty) conf.sty=sty;
    let confCheck=function() {
        for(;offset<len;offset++) {
            let v=cell[offset];
            if(isNumber(v)) {
                if(conf.type=='number') {
                    if( isset(conf.hint) ) conf.cellSize=v;
                    else conf.hint=v;
                } else {
                    conf.cellSize=v;
                }
            }
            else if(isObj(v)) conf.options=v;
            else if(isArr(v)) conf.items=v;
            else if(isStr(v)) {
                if(v[0]=='@') {
                    if(v.indexOf(':')>0) conf.sty=v.substr(1);
                    else conf.cls=v.substr(1);
                } else if(isset(conf.hint)) {
                    conf.cls=v;
                } else {
                    conf.hint=v;
                }
            }
        }
    }
    if(labelCheck) {
        label=cell[0];
        if( label=='radio-group') {
            label='';
        } else {
            conf.label=label;
            offset++;
        }
        if(!cf.formLabelMap) cf.formLabelMap={};
        cf.formLabelMap[label]=cellId;
    } else if(isObj(pconf)) {
        conf.label=pconf.label;
    }
    if(isArr(cell[offset]) ) {
        let n=0, arr=cell[offset++];
        let per=parseInt(100/arr.length);
        let sty='float:left;width:'+per+'%';
        console.log("xx input arr xx", cell, sty);
        for(var sub of arr) {
            if(!isArr(sub)) continue;
            input+=makeInputCell(sub,false,cellId+'-'+n, conf, row, sty);
            n++;
        }
        confCheck();
        conf.added=false;
    } else if(isObj(cell[offset]) ) {
        input=tt('form-object', cell[offset++], cellId);
        confCheck();
    } else {
        let type=offset<len ? cell[offset++]:'edit', kinds=null;
        if(!isStr(type)) type='input';
        if(label=='button') {
            conf.buttonCode=type;
            type='button';
        }
        let p=type.indexOf('-');
        if(p>0) {
            kinds=type.split('-');
            type=type.substr(0,p);
        }
        let klen=kinds?kinds.length: 0;
        conf.type=type;
        if(type=='date') {
            for(let n=1;n<klen;n++ ) {
                let v=kinds[n];
                if(v=='range') {
                    conf.range=true;
                } else if(v=='flat') {
                    conf.flat=true;
                } else if(v=='disable') {
                    conf.disable=true;
                } else if(v=='time') {
                    conf.time=true;
                } else if(v=='week') {
                    conf.week=true;
                } else if(v=='hint') {
                    conf.hint=cellVal(cell[offset++]);
                } else if(v=='tip') {
                    conf.tip=cellVal(cell[offset++]);
                }
            }
            confCheck();
            input=makeInputDate(conf);
        } else if(type=='time') {
            for(let n=1;n<klen;n++ ) {
                let v=kinds[n];
                if(v=='tip') {
                    conf.tip=cellVal(cell[offset++]);
                } else if(v=='disable') {
                    conf.disable=true;
                }
            }
            confCheck();
            conf.objectType='time';
            input=makeInputDefault(conf);
        } else if(type=='select'||type=='input'||type=='edit'||
            type=='number'|| type=='password'||
            type=='combo'|| type=='list' || type=='enum'|| type=='file' ||
            type=='direct') {
            for(let n=1;n<klen;n++ ) {
                let v=kinds[n];
                if(v=='direct') {
                    conf.direct=true;
                } else if(v=='disable') {
                    conf.disable=true;
                } else if(v=='group') {
                    conf.inputGroup=true;
                } else if(v=='search') {
                    conf.search=true;
                } else if(v=='append') {
                    conf.append=cellVal(cell[offset++]);
                } else if(v=='prepend') {
                    conf.prepend=cellVal(cell[offset++]);
                } else if(v=='icon') {
                    conf.icon=cellVal(cell[offset++]);
                } else if(v=='text') {
                    conf.text=cellVal(cell[offset++]);
                } else if(v=='hint') {
                    conf.hint=cellVal(cell[offset++]);
                } else if(v=='tip') {
                    conf.tip=cellVal(cell[offset++]);
                }
            }
            if(conf.inputGroup) {
                if(isArr(cell[offset]) ) {
                    let n=0, arr=cell[offset++];
                    let name=conf.label;
                    conf.cellCount=arr.length;
                    conf.cellGroup=true;
                    conf.cellGroupId=name+'-group';
                    conf.cellGroupBoxId=name;
                    conf.inputGroup=false;
                    for(var sub of arr) {
                        if(!isArr(sub)) continue;
                        input+=makeInputCell(sub, true, cellId+'-'+n, conf);
                        n++;
                    }
                }
                return input;
            }
            confCheck();
            if(type=='direct') {
                type='select';
                conf.direct=true;
            } else if(type=='combo'|| type=='list' ||type=='enum' || type=='file') {
                conf.objectType=type;
                type='input';
            }
            conf.type=type;
            input=type=='select' ? makeSelectDefault(conf): makeInputDefault(conf);
        } else if(type=='radio') {
            for(let n=1;n<klen;n++ ) {
                let v=kinds[n];
                if(v=='group') {
                    conf.radioGroup=true;
                } else if(v=='disable') {
                    conf.disable=true;
                } else if(v=='text') {
                    conf.text=cellVal(cell[offset++]);
                } else if(v=='tip') {
                    conf.tip=cellVal(cell[offset++]);
                }
            }
            confCheck();
            if( conf.radioGroup && conf.items) {
                let formData='', rowData='', idx=0;
                formIdAdd(conf);
                cf.formPrevId=cf.formBaseId;
                for(var cur of conf.items) {
                    if(!isObj(cur) ) continue;
                    cur.id=cellId+'-'+idx;
                    cur.name=cellId;
                    cur.checked=idx==0? 'checked': '';
                    cf.formBaseId=cur.id+'-radios';
                    formData+=tt('form-radios-tab', makeFormBody(cur.form), cur.checked);
                    idx++;
                }
                cf.formBaseId=cf.formPrevId;
                cf.formRowCheck=false;
                idx=findNextIndex(row, cell);
                if(idx>0 ) {
                    let p=cellId.lastIndexOf('-');
                    let cid=p>0? cellId.substr(0,p): cellId;
                    for(;idx<row.length;idx++) {
                        rowData+=makeInputCell(row[idx], true, cid+'-'+idx, conf, row);
                    }
                }
                /* <== 0:라디오버튼들, 1: 아이디, 2: 라벨, 3:폼정보, 4:라이디 박스크기, 5:다른셀정보 */
                return tt('form-radios', 
                    conf.items,
                    cellId,
                    label=='*'?'':label, 
                    formData, 
                    conf.cellSize, 
                    rowData
                );
                return ss;
            } else if(isArr(conf.items) ) {
                let radios='';
                for(var cur of makeFormItems(conf.items) ) {
                    radios+=tt('form-radio-list', cellId, cellId+'-'+cur.id, cur.text, cur.checked);
                }
                conf.added=true;
                input='<fieldset id="'+cellId+'" class="bg-radio">'+radios+'</fieldset>';
            }
        } else if(type=='check') {
            for(let n=1;n<klen;n++ ) {
                let v=kinds[n];
                if(v=='tip') {
                    conf.tip=cellVal(cell[offset++]);
                } else if(v=='disable') {
                    conf.disable=true;
                }
            }
            confCheck();
            if(isArr(conf.items)) {
                let checks='';
                formIdAdd(conf);
                for(var cur of makeFormItems(conf.items) ) {
                    checks+=tt('form-check-list', cur.id, cur.text, cur.checked);
                }
                conf.added=true;
                input='<div id="'+cellId+'" class="bg-check clearfix">'+checks+'</div>';
            }
        } else if(type=='button') {
            if(!conf.buttonCode) conf.buttonCode=cellVal(cell[offset++]);
            let id=conf.cellGroupBoxId? conf.cellGroupBoxId: cellId;
            return tt("form-"+conf.buttonCode, id);
        } else if(type=='html') {
            input=cellVal(cell[offset++]);
            confCheck();
        } else {
            conf.type='input';
            input=makeInputDefault(conf);
        }
    }
    if(isObj(pconf) && pconf.cellGroup) {
        return tt('form-cell-group', label, input, conf.cellGroupBoxId, conf.cellGroupId, cellId, conf.cellSize, conf.tip)
    } else {
        return labelCheck ? tt(conf.added? 'form-cell-added': 'form-cell', label, input, cellId, conf.cellSize, conf.tip): input;
    }
}

function makeFormContent(tab) {
    var cotent=tab.content;
    if(isStr(cotent)) return cotent;
    return tab.id+' 컨텐츠가 정의되지 않았습니다';
}
/*!
 * json-tree-editor v1.0.0
 * MIT License
 */
(function(root,factory){
  if(typeof define==='function'&&define.amd){define([],factory);}
  else if(typeof module!=='undefined'&&module.exports){module.exports=factory();}
  else{root.JsonTreeEditor=factory();}
}(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var _uid=0;
  function assign(t){for(var i=1;i<arguments.length;i++){var s=arguments[i];if(s)for(var k in s)if(Object.prototype.hasOwnProperty.call(s,k))t[k]=s[k];}return t;}
  function inferType(v){if(v===null)return'null';if(typeof v==='boolean')return'boolean';if(typeof v==='number')return'number';if(Array.isArray(v))return'array';if(typeof v==='object')return'object';return'string';}
  function convertToType(val,t){switch(t){case'string':return(val===null||val===undefined)?'':String(val);case'number':var n=parseFloat(val);return isNaN(n)?0:n;case'boolean':return!!val;case'null':return null;case'object':return{};case'array':return[];}return val;}
  function countKeys(o){if(typeof o!=='object'||o===null)return 0;var n=Object.keys(o).length;Object.values(o).forEach(function(v){n+=countKeys(v);});return n;}
  function deepClone(v){return JSON.parse(JSON.stringify(v));}
  var _CSS_NAMED_COLORS=['aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','black','blanchedalmond','blue','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','rebeccapurple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','wheat','white','whitesmoke','yellow','yellowgreen','transparent'];
  function isColorValue(s){if(typeof s!=='string')return false;s=s.trim();if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s))return true;if(/^rgba?\s*\(/.test(s))return true;if(/^hsla?\s*\(/.test(s))return true;return _CSS_NAMED_COLORS.indexOf(s.toLowerCase())!==-1;}
  function colorToHex(str){try{var d=document.createElement('div');d.style.display='none';d.style.color=str;document.body.appendChild(d);var c=window.getComputedStyle(d).color;document.body.removeChild(d);var m=c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(!m)return null;function _h(n){return('0'+parseInt(n,10).toString(16)).slice(-2);}return'#'+_h(m[1])+_h(m[2])+_h(m[3]);}catch(e){return null;}}
  var IC={
    file:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3.5A1.5 1.5 0 013.5 2h3.086a1.5 1.5 0 011.06.44L8.5 3.29A1.5 1.5 0 019.56 3.73H12.5A1.5 1.5 0 0114 5.23V12.5A1.5 1.5 0 0112.5 14h-9A1.5 1.5 0 012 12.5v-9z"/></svg>',
    tree:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="2.5" r="1.3" fill="currentColor" stroke="none" opacity=".7"/><circle cx="3.5" cy="11.5" r="1.3" fill="currentColor" stroke="none" opacity=".7"/><circle cx="12.5" cy="11.5" r="1.3" fill="currentColor" stroke="none" opacity=".7"/><path d="M8 3.8V8M8 8L3.5 10.2M8 8l4.5 2.2"/></svg>',
    code:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4L1.5 8 5 12M11 4l3.5 4L11 12M9 3L7 13"/></svg>',
    copy:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2.5" width="8.5" height="10.5" rx="1.5"/><rect x="5.5" y="5.5" width="8.5" height="10" rx="1.5"/></svg>',
    save:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v7m0 0L5.5 7m2.5 2.5L10.5 7"/><path d="M2.5 12v.5A1.5 1.5 0 004 14h8a1.5 1.5 0 001.5-1.5V12"/></svg>',
    expand:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10l5 5 5-5M3 5l5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    collapse:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6l5-5 5 5M3 11l5-5 5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    drop:'<svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 5v20M12 17l8 8 8-8"/><path d="M8 30v3a2 2 0 002 2h20a2 2 0 002-2v-3"/></svg>'
  };
  function JsonTreeEditor(el,options){
    this._id='jte'+(++_uid);
    this._root=typeof el==='string'?document.querySelector(el):el;
    if(!this._root)throw new Error('JsonTreeEditor: container not found');
    this._opts=assign({defaultMode:'tree',theme:'auto',showToolbar:true,showExport:true,showModeToggle:true,indent:'\t',monaco:null,monacoTheme:null,monacoOptions:{},value:null,filename:null},options);
    this._data=null;this._collapsed={};this._treeMode=this._opts.defaultMode!=='code';
    this._filename=this._opts.filename||null;this._dragSrc=null;this._td={on:false};
    this._handlers={};this._monacoEd=null;this._toastTmr=null;
    this._build();this._bindGlobalKeys();
    if(this._opts.value){var v=this._opts.value;this.setValue(typeof v==='string'?v:JSON.stringify(v,null,this._opts.indent),this._filename);}
  }
  var P=JsonTreeEditor.prototype;
  P.on=function(e,fn){(this._handlers[e]=this._handlers[e]||[]).push(fn);return this;};
  P.off=function(e,fn){if(this._handlers[e])this._handlers[e]=this._handlers[e].filter(function(h){return h!==fn;});return this;};
  P._emit=function(e){var a=Array.prototype.slice.call(arguments,1);(this._handlers[e]||[]).forEach(function(fn){fn.apply(null,a);});};
  P.getValue=function(){return this._data?deepClone(this._data):null;};
  P.getJSON=function(indent){if(!this._data)return null;return JSON.stringify(this._data,null,indent!==undefined?indent:this._opts.indent);};
  P.setValue=function(json,filename){var str=typeof json==='string'?json:JSON.stringify(json);this._loadJSON(str,filename||this._filename);};
  P.getMode=function(){return this._treeMode?'tree':'code';};
  P.setMode=function(mode){if(mode==='tree'&&!this._treeMode)this._switchToTree();else if(mode==='code'&&this._treeMode)this._switchToCode();};
  P.getFilename=function(){return this._filename;};
  P.setFilename=function(name){this._filename=name;var el=this._q('.jte-filename');if(el)el.textContent=name||'No file loaded';};
  P.expandAll=function(){this._collapsed={};this._renderTree();this._toast('All nodes expanded');};
  P.collapseAll=function(){this._collapsed={};this._collapseAll(this._data,[]);this._renderTree();this._toast('All nodes collapsed');};
  P.openFile=function(){this._q('.jte-file-input').click();};
  P.copyJSON=function(){var self=this;if(this._treeMode)this._syncTreeToEditor();var json=this._monacoEd?this._monacoEd.getValue():this.getJSON();if(!json)return;navigator.clipboard.writeText(json).then(function(){self._toast('\u2713 JSON copied','success');}).catch(function(){self._fallbackCopy(json);self._toast('\u2713 JSON copied','success');});this._emit('copy',json);};
  P.downloadJSON=function(){if(this._treeMode)this._syncTreeToEditor();var json=this._monacoEd?this._monacoEd.getValue():this.getJSON();if(!json)return;try{JSON.parse(json);}catch(e){this._toast('\u2717 Fix JSON errors first','error');return;}var blob=new Blob([json],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=this._filename||'edited.json';a.click();URL.revokeObjectURL(a.href);this._toast('\u2713 Downloaded '+a.download,'success');this._emit('save',json,a.download);};
  P.destroy=function(){document.removeEventListener('keydown',this._boundKeys);if(this._monacoEd){this._monacoEd.dispose();this._monacoEd=null;}this._root.innerHTML='';this._root.className=this._root.className.replace(/\bjte[\w-]*/g,'').trim();this._data=null;this._handlers={};};
  P._q=function(sel){return this._root.querySelector(sel);};
  P._qq=function(sel){return this._root.querySelectorAll(sel);};
  P._build=function(){
    this._root.classList.add('jte-root');this._applyTheme();
    this._root.innerHTML=[
      '<div class="jte-toolbar"'+(this._opts.showToolbar?'':' style="display:none"')+'>',
        '<div class="jte-file-chip">'+IC.file+'<span class="jte-filename">'+(this._filename||'No file loaded')+'</span></div>',
        '<div class="jte-ec-btns">',
          '<button class="jte-tb-btn jte-expand-btn" title="Expand all (Alt+E)">'+IC.expand+'<span class="jte-btn-label">Expand</span></button>',
          '<button class="jte-tb-btn jte-collapse-btn" title="Collapse all (Alt+C)">'+IC.collapse+'<span class="jte-btn-label">Collapse</span></button>',
        '</div>',
        '<div class="jte-tb-space"></div>',
        '<span class="jte-char-count"></span>',
        '<div class="jte-seg-ctrl"'+(this._opts.showModeToggle?'':' style="display:none"')+'>',
          '<button class="jte-seg-btn'+(this._treeMode?' jte-active':'')+'" data-mode="tree">'+IC.tree+' Tree</button>',
          '<button class="jte-seg-btn'+(!this._treeMode?' jte-active':'')+'" data-mode="code">'+IC.code+' Code</button>',
        '</div>',
        '<div class="jte-export-grp" style="display:none">',
          '<button class="jte-tb-btn jte-copy-btn">'+IC.copy+'<span class="jte-btn-label">Copy</span></button>',
          '<button class="jte-tb-btn jte-primary jte-save-btn" title="Save (Ctrl+S)">'+IC.save+'<span class="jte-btn-label">Save</span></button>',
        '</div>',
      '</div>',
      '<div class="jte-body">',
        '<div class="jte-tree-wrap" style="display:'+(this._treeMode?'flex':'none')+'"></div>',
        '<div class="jte-code-wrap" style="display:'+(!this._treeMode?'flex':'none')+'"></div>',
        '<div class="jte-empty"><svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="36" height="36" rx="5"/><path d="M14 18h20M14 24h14M14 30h8"/></svg><p>No JSON loaded. Call <code>setValue()</code> or drop a file here.</p></div>',
        '<div class="jte-drop-overlay">'+IC.drop+'<span>Drop JSON file</span></div>',
      '</div>',
      '<div class="jte-toast" role="status" aria-live="polite"></div>',
      '<div class="jte-touch-ghost"></div>',
      '<input type="file" class="jte-file-input" accept=".json,application/json" style="display:none">',
    ].join('');
    var self=this;
    this._q('.jte-expand-btn').addEventListener('click',function(){self.expandAll();});
    this._q('.jte-collapse-btn').addEventListener('click',function(){self.collapseAll();});
    this._q('.jte-copy-btn').addEventListener('click',function(){self.copyJSON();});
    this._q('.jte-save-btn').addEventListener('click',function(){self.downloadJSON();});
    this._q('.jte-file-input').addEventListener('change',function(e){self._handleFileInput(e);});
    this._qq('.jte-seg-btn').forEach(function(btn){btn.addEventListener('click',function(){self.setMode(btn.dataset.mode);});});
    var monacoNS=this._opts.monaco||(typeof monaco!=='undefined'?monaco:null);
    if(monacoNS)this._initMonaco(monacoNS);
    else{this._q('.jte-seg-ctrl').style.display='none';this._treeMode=true;}
    this._bindDrop();
  };
  P._applyTheme=function(){var dark=this._opts.theme==='auto'?(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches):this._opts.theme==='dark';this._root.classList.toggle('jte-dark',dark);this._root.classList.toggle('jte-light',!dark);return dark;};
  P._initMonaco=function(m){
    var self=this,isDark=this._root.classList.contains('jte-dark');
    if(!m.__jteTheme){m.__jteTheme=true;try{m.editor.defineTheme('jte-dark',{base:'vs-dark',inherit:true,rules:[{token:'string.value.json',foreground:'4caf80'},{token:'string.key.json',foreground:'7aa3f5'},{token:'number',foreground:'f0c040'},{token:'keyword.json',foreground:'5b8dee'},{token:'delimiter.bracket',foreground:'7a80a0'}],colors:{'editor.background':'#0f1117','editor.foreground':'#d4d8f0','editor.lineHighlightBackground':'#1a1d2780','editor.selectionBackground':'#5b8dee40','editorCursor.foreground':'#7aa3f5','editorLineNumber.foreground':'#2e3248','editorLineNumber.activeForeground':'#7a80a0'}});}catch(e){}}
    this._monacoEd=m.editor.create(this._q('.jte-code-wrap'),assign({value:'',language:'json',theme:self._opts.monacoTheme||(isDark?'jte-dark':'vs'),fontSize:13,fontFamily:"'Fira Code', Consolas, monospace",minimap:{enabled:true},scrollBeyondLastLine:false,automaticLayout:true,formatOnPaste:true,tabSize:2,lineNumbers:'on',bracketPairColorization:{enabled:true},padding:{top:8}},this._opts.monacoOptions));
    this._monacoEd.onDidChangeModelContent(function(){self._updateCharCount();if(!self._treeMode)self._emit('change',self.getValue(),self.getJSON());});
    this._monacoEd.addCommand(m.KeyMod.CtrlCmd|m.KeyCode.KeyS,function(){self.downloadJSON();});
    if(this._opts.theme==='auto'){window.matchMedia('(prefers-color-scheme: light)').addEventListener('change',function(e){m.editor.setTheme(self._opts.monacoTheme||(e.matches?'vs':'jte-dark'));self._root.classList.toggle('jte-dark',!e.matches);self._root.classList.toggle('jte-light',e.matches);});}
  };
  P._loadJSON=function(text,filename){var parsed;try{parsed=JSON.parse(text);}catch(e){this._toast('\u2717 Invalid JSON: '+e.message,'error');return false;}
    this._data=parsed;this._filename=filename||this._filename||'untitled.json';
    this._q('.jte-filename').textContent=this._filename;
    this._q('.jte-empty').style.display='none';
    if(this._opts.showExport)this._q('.jte-export-grp').style.display='';
    if(this._treeMode){this._collapsed={};this._collapseAll(this._data,[]);this._q('.jte-tree-wrap').style.display='flex';this._renderTree();}
    else if(this._monacoEd){this._monacoEd.setValue(JSON.stringify(parsed,null,this._opts.indent));this._monacoEd.setScrollPosition({scrollTop:0});}
    this._updateCharCount();this._toast('\u2713 Loaded '+this._filename,'success');
    this._emit('load',this.getValue(),this._filename);this._emit('change',this.getValue(),this.getJSON());return true;
  };
  P._handleFileInput=function(e){var self=this,file=e.target.files[0];if(!file)return;var r=new FileReader();r.onload=function(ev){self._loadJSON(ev.target.result,file.name);};r.readAsText(file);e.target.value='';};
  P._switchToTree=function(){if(!this._data){this._toast('Load JSON first','error');return;}if(this._monacoEd){try{this._data=JSON.parse(this._monacoEd.getValue());}catch(e){this._toast('\u2717 Fix JSON errors first','error');return;}}this._collapsed={};this._collapseAll(this._data,[]);this._q('.jte-code-wrap').style.display='none';this._q('.jte-tree-wrap').style.display='flex';this._qq('.jte-seg-btn').forEach(function(b){b.classList.toggle('jte-active',b.dataset.mode==='tree');});this._treeMode=true;this._renderTree();this._emit('modeChange','tree');};
  P._switchToCode=function(){if(!this._data){this._toast('Load JSON first','error');return;}this._syncTreeToEditor();this._q('.jte-tree-wrap').style.display='none';this._q('.jte-code-wrap').style.display='flex';this._qq('.jte-seg-btn').forEach(function(b){b.classList.toggle('jte-active',b.dataset.mode==='code');});this._treeMode=false;if(this._monacoEd)this._monacoEd.layout();this._emit('modeChange','code');};
  P._collapseAll=function(obj,path){var type=inferType(obj);if(type!=='object'&&type!=='array')return;this._collapsed[JSON.stringify(path)]=true;var self=this;Object.keys(obj).forEach(function(k){self._collapseAll(obj[k],path.concat(Array.isArray(obj)?parseInt(k):k));});};
  P._renderTree=function(){var wrap=this._q('.jte-tree-wrap');wrap.innerHTML='';var inner=document.createElement('div');inner.className='jte-tree-inner';wrap.appendChild(inner);this._renderLevel(this._data,inner,[]);inner.appendChild(this._buildAddBar([]));this._updateCharCount();};
  P._renderLevel=function(obj,container,path){
    var self=this;
    Object.keys(obj).forEach(function(key){
      var val=obj[key],type=inferType(val),fp=path.concat(Array.isArray(obj)?parseInt(key):key),pathK=JSON.stringify(fp),isArr=Array.isArray(obj);
      var row=document.createElement('div');row.className='jte-row';row.dataset.path=pathK;
      var ind=document.createElement('span');ind.className='jte-indent';ind.style.width=(path.length*16+6)+'px';row.appendChild(ind);
      var dh=document.createElement('span');dh.className='jte-drag-handle';dh.innerHTML='&#8942;';
      dh.addEventListener('mousedown',function(){row.draggable=true;});
      dh.addEventListener('touchstart',function(e){e.preventDefault();self._touchDragStart(e,fp,row);},{passive:false});
      row.appendChild(dh);
      row.addEventListener('dragstart',function(e){self._dragSrc=fp.slice();e.dataTransfer.effectAllowed='move';setTimeout(function(){row.classList.add('jte-dragging');},0);});
      row.addEventListener('dragend',function(){row.draggable=false;row.classList.remove('jte-dragging');self._dragSrc=null;self._qq('.jte-row').forEach(function(r){r.classList.remove('jte-drop-top','jte-drop-bot');});});
      row.addEventListener('dragover',function(e){if(!self._dragSrc||JSON.stringify(self._dragSrc.slice(0,-1))!==JSON.stringify(fp.slice(0,-1))||JSON.stringify(fp)===JSON.stringify(self._dragSrc))return;e.preventDefault();self._qq('.jte-row').forEach(function(r){r.classList.remove('jte-drop-top','jte-drop-bot');});var rect=row.getBoundingClientRect();row.classList.add(e.clientY<rect.top+rect.height/2?'jte-drop-top':'jte-drop-bot');});
      row.addEventListener('dragleave',function(e){if(!row.contains(e.relatedTarget))row.classList.remove('jte-drop-top','jte-drop-bot');});
      row.addEventListener('drop',function(e){e.preventDefault();row.classList.remove('jte-drop-top','jte-drop-bot');if(!self._dragSrc||JSON.stringify(self._dragSrc.slice(0,-1))!==JSON.stringify(fp.slice(0,-1))||JSON.stringify(fp)===JSON.stringify(self._dragSrc))return;var rect=row.getBoundingClientRect();self._reorderAtPath(fp.slice(0,-1),self._dragSrc[self._dragSrc.length-1],fp[fp.length-1],e.clientY<rect.top+rect.height/2);});
      var tog=document.createElement('span');tog.className='jte-toggle'+((type!=='object'&&type!=='array')?' jte-leaf':'');
      if(type==='object'||type==='array'){tog.innerHTML=self._collapsed[pathK]?'&#9654;':'&#9660;';tog.onclick=(function(pk){return function(){self._collapsed[pk]=!self._collapsed[pk];self._renderTree();};})(pathK);}
      row.appendChild(tog);
      if(isArr){var kS=document.createElement('span');kS.className='jte-key jte-arr-idx';kS.textContent='['+key+']';row.appendChild(kS);}
      else{var kI=document.createElement('input');kI.type='text';kI.className='jte-key';kI.value=key;kI.onchange=(function(fp2,orig){return function(){var nk=this.value.trim();if(!nk||nk===orig){this.value=orig;return;}self._renameKey(fp2,nk);};})(fp,key);kI.onkeydown=function(e){if(e.key==='Enter')this.blur();if(e.key==='Escape'){this.value=key;this.blur();}};kI.onclick=function(e){e.stopPropagation();};row.appendChild(kI);}
      var kr=document.createElement('span');kr.className='jte-key-resize';self._initKeyResize(kr);row.appendChild(kr);
      row.appendChild(self._buildTypeSwitch(fp,type));
      var vc=document.createElement('div');vc.className='jte-val';
      if(type==='object'){var ob=document.createElement('span');ob.className='jte-badge';ob.textContent=Object.keys(val).length+' key'+(Object.keys(val).length!==1?'s':'');vc.appendChild(ob);}
      else if(type==='array'){var ab=document.createElement('span');ab.className='jte-badge';ab.textContent=val.length+' item'+(val.length!==1?'s':'');vc.appendChild(ab);}
      else if(type==='boolean'){var bb=document.createElement('button');bb.className='jte-bool-btn';bb.textContent=val?'true':'false';bb.onclick=(function(fp2,v){return function(){self._setAtPath(fp2,!v);};})(fp,val);vc.appendChild(bb);}
      else if(type==='null'){var nl=document.createElement('span');nl.className='jte-input jte-v-null';nl.textContent='null';vc.appendChild(nl);}
      else{var inp=document.createElement('input');inp.type='text';inp.className='jte-input jte-v-'+type;inp.value=val;inp.onchange=(function(fp2,t){return function(){var nv=this.value;if(t==='string'&&nv.length>=2&&((nv[0]==='"'&&nv[nv.length-1]==='"')||(nv[0]==="'"&&nv[nv.length-1]==="'"))){nv=nv.slice(1,-1);this.value=nv;}if(t==='number'){var n=parseFloat(nv);if(!isNaN(n))nv=n;}self._setAtPath(fp2,nv);};})(fp,type);if(type==='string'){var sw=document.createElement('div');sw.className='jte-str-wrap';if(isColorValue(val)){var _hex=colorToHex(String(val));if(_hex){var _swatch=document.createElement('span');_swatch.className='jte-color-swatch';_swatch.style.background=String(val);_swatch.title='Pick color';var _cpick=document.createElement('input');_cpick.type='color';_cpick.value=_hex;_cpick.onclick=function(e){e.stopPropagation();};(function(si,ci,ti,fp2){ci.addEventListener('input',function(){ti.value=this.value;si.style.background=this.value;});ci.addEventListener('change',function(){ti.value=this.value;si.style.background=this.value;self._setAtPath(fp2,this.value);});ti.addEventListener('input',function(){var v=this.value.trim();if(isColorValue(v)){si.style.background=v;var h=colorToHex(v);if(h)ci.value=h;}});}(_swatch,_cpick,inp,fp));_swatch.appendChild(_cpick);sw.appendChild(_swatch);}}sw.appendChild(inp);vc.appendChild(sw);}else{vc.appendChild(inp);}}
      row.appendChild(vc);
      var cb=document.createElement('span');cb.className='jte-clone-btn';cb.innerHTML='&#10697;';cb.onclick=(function(fp2){return function(){self._cloneAtPath(fp2);};})(fp);row.appendChild(cb);
      var db=document.createElement('span');db.className='jte-del-btn';db.innerHTML='&times;';db.onclick=(function(fp2){return function(){if(confirm('Delete "'+fp2[fp2.length-1]+'"?'))self._deleteAtPath(fp2);};})(fp);row.appendChild(db);
      container.appendChild(row);
      if((type==='object'||type==='array')&&!self._collapsed[pathK]){var cw=document.createElement('div');cw.className='jte-children';self._renderLevel(val,cw,fp);cw.appendChild(self._buildAddBar(fp));container.appendChild(cw);}
    });
  };
  P._buildAddBar=function(path){
    var self=this,target=path.reduce(function(o,k){return o[k];},this._data),isArr=Array.isArray(target);
    var bar=document.createElement('div');bar.className='jte-add-bar';bar.style.paddingLeft=(path.length*16+30)+'px';
    var keyIn;
    if(!isArr){keyIn=document.createElement('input');keyIn.type='text';keyIn.className='jte-add-key';keyIn.placeholder='Key';bar.appendChild(keyIn);var sep=document.createElement('span');sep.style.cssText='font-family:var(--jte-mono);font-size:12px;color:var(--jte-text-dim);flex-shrink:0;';sep.textContent=':';bar.appendChild(sep);}
    var typeSel=document.createElement('select');typeSel.className='jte-type-sel';
    (isArr?[{v:'object',l:'{}'},{v:'array',l:'[]'},{v:'string',l:'str'},{v:'number',l:'num'},{v:'boolean',l:'bool'},{v:'null',l:'null'}]:[{v:'string',l:'str'},{v:'number',l:'num'},{v:'boolean',l:'bool'},{v:'null',l:'null'},{v:'object',l:'{}'},{v:'array',l:'[]'}]).forEach(function(t){var o=document.createElement('option');o.value=t.v;o.textContent=t.l;typeSel.appendChild(o);});
    bar.appendChild(typeSel);
    var valIn=document.createElement('input');valIn.type='text';valIn.className='jte-add-val';bar.appendChild(valIn);
    function refreshVal(){var noVal=['object','array','null'].indexOf(typeSel.value)>-1;valIn.style.display=noVal?'none':'';if(!noVal)valIn.placeholder=typeSel.value==='boolean'?'true or false':typeSel.value==='number'?'0':'Value';}
    typeSel.onchange=refreshVal;refreshVal();
    var addBtn=document.createElement('button');addBtn.className='jte-add-btn';addBtn.textContent='+ Add';
    addBtn.onclick=(function(p,isA){return function(){var k=isA?null:(keyIn?keyIn.value.trim():null);if(!isA&&!k){if(keyIn)keyIn.focus();return;}var nv;switch(typeSel.value){case'object':nv={};break;case'array':nv=[];break;case'null':nv=null;break;case'boolean':nv=valIn.value.trim()==='true'||valIn.value.trim()==='1';break;case'number':var n=parseFloat(valIn.value);nv=isNaN(n)?0:n;break;default:nv=valIn.value;}var dest=p.reduce(function(o,k2){return o[k2];},self._data);if(Array.isArray(dest))dest.push(nv);else dest[k]=nv;self._syncTreeToEditor();self._renderTree();if(keyIn)keyIn.value='';valIn.value='';if(keyIn)keyIn.focus();else valIn.focus();self._emit('change',self.getValue(),self.getJSON());};})(path,isArr);
    if(keyIn)keyIn.onkeypress=function(e){if(e.which===13){e.preventDefault();valIn.style.display!=='none'?valIn.focus():addBtn.click();}};
    valIn.onkeypress=function(e){if(e.which===13){e.preventDefault();addBtn.click();}};
    bar.appendChild(addBtn);return bar;
  };
  P._buildTypeSwitch=function(fp,currentType){var self=this,sel=document.createElement('select');sel.className='jte-type-sel';[{v:'string',l:'str'},{v:'number',l:'num'},{v:'boolean',l:'bool'},{v:'null',l:'null'},{v:'object',l:'{}'},{v:'array',l:'[]'}].forEach(function(t){var o=document.createElement('option');o.value=t.v;o.textContent=t.l;if(t.v===currentType)o.selected=true;sel.appendChild(o);});sel.onchange=function(e){e.stopPropagation();self._setAtPath(fp,convertToType(self._getAtPath(fp),sel.value));};sel.onclick=function(e){e.stopPropagation();};return sel;};
  P._getAtPath=function(path){return path.reduce(function(o,k){return o!=null?o[k]:undefined;},this._data);};
  P._setAtPath=function(path,value){var last=path[path.length-1],parent=path.slice(0,-1).reduce(function(o,k){return o[k];},this._data);parent[last]=value;this._syncTreeToEditor();this._renderTree();this._emit('change',this.getValue(),this.getJSON());};
  P._deleteAtPath=function(path){var last=path[path.length-1],parent=path.slice(0,-1).reduce(function(o,k){return o[k];},this._data);if(Array.isArray(parent))parent.splice(last,1);else delete parent[last];this._syncTreeToEditor();this._renderTree();this._emit('change',this.getValue(),this.getJSON());};
  P._renameKey=function(path,newKey){var last=path[path.length-1],parent=path.slice(0,-1).reduce(function(o,k){return o[k];},this._data);var r={};Object.keys(parent).forEach(function(k){r[k===last?newKey:k]=parent[k];});Object.keys(parent).forEach(function(k){delete parent[k];});Object.assign(parent,r);this._syncTreeToEditor();this._renderTree();this._emit('change',this.getValue(),this.getJSON());};
  P._cloneAtPath=function(path){var key=path[path.length-1],parent=path.slice(0,-1).reduce(function(o,k){return o[k];},this._data),clone=deepClone(parent[key]);if(Array.isArray(parent)){parent.splice(parseInt(key)+1,0,clone);}else{var keys=Object.keys(parent),idx=keys.indexOf(String(key)),nk=String(key)+'_copy',c=2;while(Object.prototype.hasOwnProperty.call(parent,nk))nk=String(key)+'_copy'+(c++);keys.splice(idx+1,0,nk);var r={};keys.forEach(function(k){r[k]=k===nk?clone:parent[k];});Object.keys(parent).forEach(function(k){delete parent[k];});Object.assign(parent,r);}this._syncTreeToEditor();this._renderTree();this._emit('change',this.getValue(),this.getJSON());};
  P._reorderAtPath=function(parentPath,fromKey,toKey,insertBefore){var parent=parentPath.reduce(function(o,k){return o[k];},this._data);if(Array.isArray(parent)){var fi=parseInt(fromKey),ti=parseInt(toKey),item=parent.splice(fi,1)[0];if(ti>fi)ti--;parent.splice(insertBefore?ti:ti+1,0,item);}else{var keys=Object.keys(parent);keys.splice(keys.indexOf(String(fromKey)),1);var ti2=keys.indexOf(String(toKey));keys.splice(insertBefore?ti2:ti2+1,0,String(fromKey));var r={};keys.forEach(function(k){r[k]=parent[k];});Object.keys(parent).forEach(function(k){delete parent[k];});Object.assign(parent,r);}this._syncTreeToEditor();this._renderTree();this._emit('change',this.getValue(),this.getJSON());};
  P._syncTreeToEditor=function(){if(this._monacoEd)this._monacoEd.setValue(JSON.stringify(this._data,null,this._opts.indent));this._updateCharCount();};
  P._initKeyResize=function(handle){var self=this;function start(x0){var w0=parseInt(getComputedStyle(self._root).getPropertyValue('--jte-key-w'))||180;handle.classList.add('jte-resizing');return function(x){self._root.style.setProperty('--jte-key-w',Math.max(80,Math.min(w0+(x-x0),480))+'px');};}handle.addEventListener('mousedown',function(e){e.preventDefault();e.stopPropagation();var mv=start(e.clientX);document.body.style.cursor='col-resize';document.body.style.userSelect='none';function onM(e){mv(e.clientX);}function onU(){handle.classList.remove('jte-resizing');document.body.style.cursor=document.body.style.userSelect='';document.removeEventListener('mousemove',onM);document.removeEventListener('mouseup',onU);}document.addEventListener('mousemove',onM);document.addEventListener('mouseup',onU);});handle.addEventListener('touchstart',function(e){e.preventDefault();e.stopPropagation();var mv=start(e.touches[0].clientX);function onM(e){e.preventDefault();mv(e.touches[0].clientX);}function onE(){handle.classList.remove('jte-resizing');document.removeEventListener('touchmove',onM);document.removeEventListener('touchend',onE);document.removeEventListener('touchcancel',onE);}document.addEventListener('touchmove',onM,{passive:false});document.addEventListener('touchend',onE);document.addEventListener('touchcancel',onE);},{passive:false});};
  P._touchDragStart=function(e,fp,row){var self=this,td=this._td,touch=e.touches[0],rect=row.getBoundingClientRect(),ghost=this._q('.jte-touch-ghost');ghost.innerHTML='';var clone=row.cloneNode(true);clone.style.pointerEvents='none';ghost.appendChild(clone);ghost.style.cssText='display:block;position:fixed;left:0;right:0;top:'+rect.top+'px;height:'+rect.height+'px;';td.on=true;td.srcPath=fp.slice();td.srcRow=row;td.lastTarget=null;td.ghost=ghost;td.ghostOffsetY=touch.clientY-rect.top;row.style.opacity='0.35';self._btdm=function(e){self._touchDragMove(e);};self._btde=function(){self._touchDragEnd();};document.addEventListener('touchmove',self._btdm,{passive:false});document.addEventListener('touchend',self._btde,{passive:true});document.addEventListener('touchcancel',self._btde,{passive:true});};
  P._touchDragMove=function(e){if(!this._td.on)return;e.preventDefault();var td=this._td,touch=e.touches[0];td.ghost.style.top=(touch.clientY-td.ghostOffsetY)+'px';td.ghost.style.display='none';var el=document.elementFromPoint(touch.clientX,touch.clientY);td.ghost.style.display='block';this._qq('.jte-row.jte-drop-top,.jte-row.jte-drop-bot').forEach(function(r){r.classList.remove('jte-drop-top','jte-drop-bot');});if(!el)return;var target=el.closest?el.closest('.jte-row[data-path]'):null;if(!target)return;var tp=JSON.parse(target.dataset.path);if(JSON.stringify(tp.slice(0,-1))!==JSON.stringify(td.srcPath.slice(0,-1))||JSON.stringify(tp)===JSON.stringify(td.srcPath))return;var rect=target.getBoundingClientRect();td.insertBefore=touch.clientY<rect.top+rect.height/2;td.lastTarget=target;target.classList.add(td.insertBefore?'jte-drop-top':'jte-drop-bot');};
  P._touchDragEnd=function(){if(!this._td.on)return;this._td.on=false;document.removeEventListener('touchmove',this._btdm);document.removeEventListener('touchend',this._btde);document.removeEventListener('touchcancel',this._btde);var td=this._td;if(td.ghost)td.ghost.style.display='none';if(td.srcRow)td.srcRow.style.opacity='';this._qq('.jte-row').forEach(function(r){r.classList.remove('jte-drop-top','jte-drop-bot');});if(td.lastTarget&&td.lastTarget.dataset.path){var tp=JSON.parse(td.lastTarget.dataset.path),sp=td.srcPath;if(JSON.stringify(tp.slice(0,-1))===JSON.stringify(sp.slice(0,-1))&&JSON.stringify(tp)!==JSON.stringify(sp))this._reorderAtPath(sp.slice(0,-1),sp[sp.length-1],tp[tp.length-1],td.insertBefore);}td.srcPath=td.srcRow=td.lastTarget=null;};
  P._bindDrop=function(){var self=this,ov=this._q('.jte-drop-overlay');this._root.addEventListener('dragover',function(e){if(e.dataTransfer.types&&Array.prototype.indexOf.call(e.dataTransfer.types,'Files')>=0){e.preventDefault();ov.classList.add('jte-active');}});this._root.addEventListener('dragleave',function(e){if(!self._root.contains(e.relatedTarget))ov.classList.remove('jte-active');});this._root.addEventListener('drop',function(e){e.preventDefault();ov.classList.remove('jte-active');var file=e.dataTransfer.files[0];if(!file)return;var r=new FileReader();r.onload=function(ev){self._loadJSON(ev.target.result,file.name);};r.readAsText(file);});};
  P._bindGlobalKeys=function(){var self=this;this._boundKeys=function(e){if(!self._root.contains(document.activeElement)&&document.activeElement!==document.body)return;var mod=/Mac/.test(navigator.platform)?e.metaKey:e.ctrlKey;if(mod&&e.key==='s'){e.preventDefault();self.downloadJSON();}if(mod&&e.key==='o'){e.preventDefault();self.openFile();}if(e.altKey&&e.key==='e'){e.preventDefault();self.expandAll();}if(e.altKey&&e.key==='c'){e.preventDefault();self.collapseAll();}};document.addEventListener('keydown',this._boundKeys);};
  P._updateCharCount=function(){var el=this._q('.jte-char-count');if(!el||!this._data){if(el)el.textContent='';return;}el.textContent=countKeys(this._data)+' keys';};
  P._toast=function(text,type){var el=this._q('.jte-toast');if(!el)return;clearTimeout(this._toastTmr);el.textContent=text;el.className='jte-toast jte-toast-visible'+(type?' jte-toast-'+type:'');var self=this;this._toastTmr=setTimeout(function(){el.classList.remove('jte-toast-visible');},2400);};
  P._fallbackCopy=function(text){var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);};
  return JsonTreeEditor;
}));

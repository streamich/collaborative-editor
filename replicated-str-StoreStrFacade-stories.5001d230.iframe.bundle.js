"use strict";(self.webpackChunkcollaborative_editor=self.webpackChunkcollaborative_editor||[]).push([[789],{"./src/replicated-str/StoreStrFacade.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Facade0:()=>Facade0,Facade0Textarea:()=>Facade0Textarea,Facade1:()=>Facade1,Facade1Textarea:()=>Facade1Textarea,Facade2:()=>Facade2,Facade2Textarea:()=>Facade2Textarea,Facade3:()=>Facade3,Facade3Textarea:()=>Facade3Textarea,Facade4:()=>Facade4,Facade4Textarea:()=>Facade4Textarea,__namedExportsOrder:()=>__namedExportsOrder,default:()=>StoreStrFacade_stories});var react=__webpack_require__("./node_modules/react/index.js"),JsonPatchStore=__webpack_require__("./node_modules/json-joy/lib/json-crdt/json-patch/JsonPatchStore.js"),StrBinding=__webpack_require__("./src/StrBinding.ts"),InputFacade=__webpack_require__("./src/InputFacade.ts"),fixtures=__webpack_require__("./src/__tests__/fixtures.ts");class StoreStrFacade{constructor(store){let strict=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.store=store,this.strict=strict,this.view=store.getSnapshot,this.ins=(pos,str)=>{store.update({op:"str_ins",path:[],pos,str})},this.del=(pos,len)=>{store.update({op:"str_del",path:[],pos,len})},this.subscribe=store.subscribe,this.tick=strict?void 0:()=>this.store.api?.()?.asStr?.().api.model.tick??0}get findId(){if(this.strict)return;const str=this.store.api?.()?.asStr?.();return str?str.findId.bind(str):void 0}get findPos(){if(this.strict)return;const str=this.store.api?.()?.asStr?.();return str?str.findPos.bind(str):void 0}get transaction(){if(this.strict)return;const str=this.store.api?.()?.asStr?.();return str?str.api.transaction.bind(str.api):void 0}}const ID={sid:0,time:0};class ReplicatedStr{constructor(facade){this.facade=facade,this.view=facade.view,this.ins=facade.ins,this.del=facade.del,this.findId=facade.findId??(()=>ID),this.findPos=facade.findPos??(()=>-1),this.api={onChange:{listen:this.facade.subscribe},transaction:callback=>{facade.transaction?facade.transaction(callback):callback()},model:{get tick(){return facade.tick?.()??0}}}}}const StoreStrFacade_stories={title:"StoreStrFacade",component:({textarea,Facade})=>{const inputRef=react.useRef(null),[model,clone]=react.useMemo((()=>{const model=fixtures.o.clone();return[model,model.clone()]}),[1]);return react.useSyncExternalStore(model.api.subscribe,(()=>model.tick)),react.useEffect((()=>{if(!inputRef.current)return;const input=inputRef.current,editor=new Facade(input),store=new JsonPatchStore.K(model,[]),facade=new StoreStrFacade(store,!0),str=new ReplicatedStr(facade),binding=new StrBinding.z((()=>str),editor);return binding.bind(!1),()=>{binding.unbind()}}),[model]),react.createElement("div",null,textarea?react.createElement("textarea",{ref:inputRef}):react.createElement("input",{ref:inputRef,type:"text"}),react.createElement("div",null,react.createElement("button",{onClick:()=>{const input=inputRef.current;input&&(input.value+="!")}},'Append "!" to input')),react.createElement("div",null,react.createElement("button",{onClick:()=>{const str=model.api.str([]);str.ins(str.view().length,"?")}},'Append "?" to model')),react.createElement("div",null,react.createElement("button",{onClick:()=>{setTimeout((()=>{const str=model.api.str([]);str.ins(str.view().length,"?")}),2e3)}},'Append "?" to model after 2s')),react.createElement("div",null,react.createElement("button",{onClick:()=>{setTimeout((()=>{model.api.str([]).ins(0,"1. ")}),2e3)}},'Prepend "1. " to model after 2s')),react.createElement("div",null,react.createElement("button",{onClick:()=>{setTimeout((()=>{model.reset(clone)}),2e3)}},"RESET after 2s")),react.createElement("pre",{style:{fontSize:"10px"}},react.createElement("code",null,model.root+"")))},argTypes:{}},Facade0={args:{Facade:InputFacade.pl}},Facade0Textarea={args:{Facade:InputFacade.pl,textarea:!0}},Facade1={args:{Facade:InputFacade.i4}},Facade1Textarea={args:{Facade:InputFacade.i4,textarea:!0}},Facade2={args:{Facade:InputFacade.pM}},Facade2Textarea={args:{Facade:InputFacade.pM,textarea:!0}},Facade3={args:{Facade:InputFacade.iJ}},Facade3Textarea={args:{Facade:InputFacade.iJ,textarea:!0}},Facade4={args:{Facade:InputFacade.pr}},Facade4Textarea={args:{Facade:InputFacade.pr,textarea:!0}},__namedExportsOrder=["Facade0","Facade0Textarea","Facade1","Facade1Textarea","Facade2","Facade2Textarea","Facade3","Facade3Textarea","Facade4","Facade4Textarea"];Facade0.parameters={...Facade0.parameters,docs:{...Facade0.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade0\n  } as any\n}",...Facade0.parameters?.docs?.source}}},Facade0Textarea.parameters={...Facade0Textarea.parameters,docs:{...Facade0Textarea.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade0,\n    textarea: true\n  } as any\n}",...Facade0Textarea.parameters?.docs?.source}}},Facade1.parameters={...Facade1.parameters,docs:{...Facade1.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade1\n  } as any\n}",...Facade1.parameters?.docs?.source}}},Facade1Textarea.parameters={...Facade1Textarea.parameters,docs:{...Facade1Textarea.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade1,\n    textarea: true\n  } as any\n}",...Facade1Textarea.parameters?.docs?.source}}},Facade2.parameters={...Facade2.parameters,docs:{...Facade2.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade2\n  } as any\n}",...Facade2.parameters?.docs?.source}}},Facade2Textarea.parameters={...Facade2Textarea.parameters,docs:{...Facade2Textarea.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade2,\n    textarea: true\n  } as any\n}",...Facade2Textarea.parameters?.docs?.source}}},Facade3.parameters={...Facade3.parameters,docs:{...Facade3.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade3\n  } as any\n}",...Facade3.parameters?.docs?.source}}},Facade3Textarea.parameters={...Facade3Textarea.parameters,docs:{...Facade3Textarea.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade3,\n    textarea: true\n  } as any\n}",...Facade3Textarea.parameters?.docs?.source}}},Facade4.parameters={...Facade4.parameters,docs:{...Facade4.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade4\n  } as any\n}",...Facade4.parameters?.docs?.source}}},Facade4Textarea.parameters={...Facade4Textarea.parameters,docs:{...Facade4Textarea.parameters?.docs,source:{originalSource:"{\n  args: {\n    Facade: InputFacade4,\n    textarea: true\n  } as any\n}",...Facade4Textarea.parameters?.docs?.source}}}},"./src/InputFacade.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i4:()=>InputFacade1,iJ:()=>InputFacade3,pM:()=>InputFacade2,pl:()=>InputFacade0,pr:()=>InputFacade4});class InputFacade0{constructor(input){this.input=input}get(){return this.input.value}set(text){this.input.value=text}}class InputFacade1 extends InputFacade0{onInput=e=>{this._onInput(e)};_onInput(){this.onchange?.()}constructor(input){super(input),this.input=input,input.addEventListener("input",this.onInput)}getLength(){return this.input.value.length}dispose(){this.input.removeEventListener("input",this.onInput)}}class InputFacade2 extends InputFacade1{constructor(input){super(input),this.input=input,document.addEventListener("selectionchange",this.onSelectionChange)}getSelection(){const input=this.input,{selectionStart,selectionEnd,selectionDirection}=input;return["number"==typeof selectionStart?selectionStart:-1,"number"==typeof selectionEnd?selectionEnd:-1,"backward"===selectionDirection?-1:"forward"===selectionDirection?1:0]}setSelection(start,end,direction){const input=this.input;input.selectionStart=start>-1?start:null,input.selectionEnd=end>-1?end:null,input.selectionDirection=-1===direction?"backward":1===direction?"forward":"none"}onSelectionChange=()=>{this.onselection?.()};dispose(){super.dispose(),document.removeEventListener("selectionchange",this.onSelectionChange)}}class InputFacade3 extends InputFacade2{_onInput(e){const event=e,{input}=this,{data,inputType,isComposing}=event;if(!isComposing){switch(inputType){case"insertText":{if(!data||1!==data.length)break;const{selectionStart,selectionEnd}=input;if(null===selectionStart||null===selectionEnd)break;if(selectionStart!==selectionEnd)break;if(selectionStart<=0)break;const selection=this.selection;if(selectionStart-data.length!==selection.start)break;if("number"!=typeof selection.end||"number"!=typeof selection.end)break;const remove=selection.end-selection.start,change=[selection.start,remove,data];return void this.onchange([change])}case"deleteContentBackward":{const{start,end}=this.selection;if("number"!=typeof start||"number"!=typeof end)break;const change=start===end?[start-1,1,""]:[start,end-start,""];return void this.onchange([change])}}this.onchange()}}constructor(input){super(input),this.input=input}}class InputFacade4 extends InputFacade3{ins(position,text){const selection=this.getSelection(),value=this.get(),next=value.slice(0,position)+text+value.slice(position);if(this.set(next),selection){let[start,end]=selection;const length=text.length;start>=position&&(start+=length),end>position&&(end+=length),this.setSelection(start,end,selection[2])}}del(position,length){const selection=this.getSelection(),value=this.get(),next=value.slice(0,position)+value.slice(position+length);if(this.set(next),selection){let[start,end]=selection;start>=position&&(start=Math.max(position,start-length)),end>=position&&(end=Math.max(position,end-length)),this.setSelection(start,end,selection[2])}}}},"./src/StrBinding.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>StrBinding});const applyChange=(view,position,remove,insert)=>view.slice(0,position)+insert+view.slice(position+remove);class Selection{start=null;end=null;dir=0;ts=0;tick=0;startId=null;endId=null}const diff=__webpack_require__("./node_modules/fast-diff/diff.js");var DIFF_CHANGE_TYPE=function(DIFF_CHANGE_TYPE){return DIFF_CHANGE_TYPE[DIFF_CHANGE_TYPE.DELETE=-1]="DELETE",DIFF_CHANGE_TYPE[DIFF_CHANGE_TYPE.EQUAL=0]="EQUAL",DIFF_CHANGE_TYPE[DIFF_CHANGE_TYPE.INSERT=1]="INSERT",DIFF_CHANGE_TYPE}(DIFF_CHANGE_TYPE||{});class StrBinding{static bind=(str,editor,polling)=>{const binding=new StrBinding(str,editor);return binding.syncFromModel(),binding.bind(polling),binding.unbind};race=(()=>(()=>{let invoked=!1;return fn=>{if(!invoked){invoked=!0;try{fn()}finally{invoked=!1}}}})())();constructor(str,editor){this.str=str,this.editor=editor,this.view=str().view(),editor.selection=this.selection=new Selection}saveSelection(){const{editor,selection}=this,str=this.str();if(!str)return;const[selectionStart,selectionEnd,selectionDirection]=editor.getSelection?.()||[-1,-1,0],{start,end}=selection,now=Date.now(),tick=str.api.model.tick;start===selectionStart&&end===selectionEnd&&(tick===selection.tick||now-selection.ts<3e3)||(selection.start=selectionStart,selection.end=selectionEnd,selection.dir=selectionDirection,selection.ts=now,selection.tick=tick,selection.startId="number"==typeof selectionStart?str.findId((selectionStart??0)-1)??null:null,selection.endId="number"==typeof selectionEnd?str.findId((selectionEnd??0)-1)??null:null)}syncFromModel(){const editor=this.editor,str=this.str();if(!str)return;const view=(this.view=str.view())||"";if(editor.ins&&editor.del){const editorText=editor.get();if(view===editorText)return;const changes=diff(editorText,view),changeLen=changes.length;let pos=0;for(let i=0;i<changeLen;i++){const change=changes[i],[type,text]=change,len=text.length;switch(type){case DIFF_CHANGE_TYPE.DELETE:editor.del(pos,len);break;case DIFF_CHANGE_TYPE.EQUAL:pos+=len;break;case DIFF_CHANGE_TYPE.INSERT:editor.ins(pos,text),pos+=len}}}else{editor.set(view);const{selection}=this;if(editor.setSelection){const start=selection.startId?str.findPos(selection.startId)+1:-1,end=selection.endId?str.findPos(selection.endId)+1:-1;editor.setSelection(start,end,selection.dir)}}}onModelChange=()=>{this.race((()=>{this.syncFromModel(),this.saveSelection()}))};syncFromEditor(){let view=this.view;const value=this.editor.get();if(value===view)return;const selection=this.selection,caretPos=selection.start===selection.end?selection.start??void 0:void 0,changes=diff(view,value,caretPos),changeLen=changes.length,str=this.str();str&&(str.api.transaction((()=>{let pos=0;for(let i=0;i<changeLen;i++){const change=changes[i],[type,text]=change;switch(type){case DIFF_CHANGE_TYPE.DELETE:view=applyChange(view,pos,text.length,""),str.del(pos,text.length);break;case DIFF_CHANGE_TYPE.EQUAL:pos+=text.length;break;case DIFF_CHANGE_TYPE.INSERT:view=applyChange(view,pos,0,text),str.ins(pos,text),pos+=text.length}}})),this.view=view,this.saveSelection())}onchange=(changes,verify)=>{this.race((()=>{if(changes instanceof Array&&changes.length>0){const str=this.str();if(!str)return;let applyChanges=!0;if(verify){let view=this.view;for(let i=0;i<length;i++){const change=changes[i],[position,remove,insert]=change;view=applyChange(view,position,remove,insert)}const editor=this.editor;editor.getLength&&view.length!==editor.getLength()||view!==editor.get()?applyChanges=!1:this.view=view}if(applyChanges){const length=changes.length;try{return str.api.transaction((()=>{let view=this.view;for(let i=0;i<length;i++){const change=changes[i],[position,remove,insert]=change;view=applyChange(view,position,remove,insert),remove&&str.del(position,remove),insert&&str.ins(position,insert)}this.view=view})),void this.saveSelection()}catch{}}}this.syncFromEditor()}))};pollingInterval=1e3;_p=null;pollChanges=()=>{this._p=setTimeout((()=>{this.race((()=>{try{const view=this.view,editor=this.editor;(!!editor.getLength&&view.length!==editor.getLength()||view!==editor.get())&&this.syncFromEditor()}catch{}this._p&&this.pollChanges()}))}),this.pollingInterval)};stopPolling(){this._p&&clearTimeout(this._p),this._p=null}_s=null;bind=polling=>{this.syncFromModel();const editor=this.editor;editor.onchange=this.onchange,editor.onselection=()=>this.saveSelection(),polling&&this.pollChanges(),this._s=this.str().api.onChange.listen(this.onModelChange)};unbind=()=>{this.stopPolling(),this._s?.(),this.editor.dispose?.()}}},"./src/__tests__/fixtures.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>model0});var json_joy_lib_json_crdt__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/json-joy/lib/json-crdt/index.js");const model0=json_joy_lib_json_crdt__WEBPACK_IMPORTED_MODULE_0__.Model.create(json_joy_lib_json_crdt__WEBPACK_IMPORTED_MODULE_0__.s.str("Hello"))},"./node_modules/json-joy/lib/json-crdt/json-patch/JsonPatch.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.JsonPatch=void 0;const deepEqual_1=__webpack_require__("./node_modules/json-joy/lib/json-equal/deepEqual/index.js"),nodes_1=__webpack_require__("./node_modules/json-joy/lib/json-crdt/nodes/index.js"),util_1=__webpack_require__("./node_modules/json-joy/lib/json-pointer/util.js"),clock_1=__webpack_require__("./node_modules/json-joy/lib/json-crdt-patch/clock/index.js");exports.JsonPatch=class JsonPatch{constructor(model,pfx=[]){this.model=model,this.pfx=pfx}apply(ops){const length=ops.length;return this.model.api.transaction((()=>{for(let i=0;i<length;i++)this.applyOp(ops[i])})),this}applyOp(op){switch(op.op){case"add":this.add(op.path,op.value);break;case"remove":this.remove(op.path);break;case"replace":this.replace(op.path,op.value);break;case"move":this.move(op.path,op.from);break;case"copy":this.copy(op.path,op.from);break;case"test":this.test(op.path,op.value);break;case"str_ins":this.strIns(op.path,op.pos,op.str);break;case"str_del":this.strDel(op.path,op.pos,op.len??0,op.str);break;default:throw new Error("UNKNOWN_OP")}return this.model.api.apply(),this}builder(){return this.model.api.builder}toPath(path){return this.pfx.concat((0,util_1.toPath)(path))}add(path,value){const builder=this.builder(),steps=this.toPath(path);if(steps.length){const objSteps=steps.slice(0,steps.length-1),node=this.model.api.find(objSteps),key=steps[steps.length-1];if(node instanceof nodes_1.ObjNode)builder.insObj(node.id,[[String(key),builder.json(value)]]);else{if(!(node instanceof nodes_1.ArrNode))throw new Error("NOT_FOUND");{const builderValue=builder.json(value);if("-"===key){const length=node.length(),after=node.find(length-1)||node.id;builder.insArr(node.id,after,[builderValue])}else{const index=~~key;if(""+index!==key)throw new Error("INVALID_INDEX");if(index){const after=node.find(index-1);if(!after)throw new Error("NOT_FOUND");builder.insArr(node.id,after,[builderValue])}else builder.insArr(node.id,node.id,[builderValue])}}}}else this.setRoot(value)}remove(path){const builder=this.builder(),steps=this.toPath(path);if(steps.length){const objSteps=steps.slice(0,steps.length-1),node=this.model.api.find(objSteps),key=steps[steps.length-1];if(node instanceof nodes_1.ObjNode){const stringKey=String(key);if(void 0===node.get(stringKey))throw new Error("NOT_FOUND");builder.insObj(node.id,[[stringKey,builder.const(void 0)]])}else{if(!(node instanceof nodes_1.ArrNode))throw new Error("NOT_FOUND");{const key=steps[steps.length-1],index=~~key;if(""+index!==key)throw new Error("INVALID_INDEX");const id=node.find(index);if(!id)throw new Error("NOT_FOUND");builder.del(node.id,[(0,clock_1.interval)(id,0,1)])}}}else this.setRoot(null)}replace(path,value){this.remove(path),this.add(path,value)}move(path,from){if(path=(0,util_1.toPath)(path),from=(0,util_1.toPath)(from),(0,util_1.isChild)(from,path))throw new Error("INVALID_CHILD");const json=this.json(this.toPath(from));this.remove(from),this.add(path,json)}copy(path,from){path=(0,util_1.toPath)(path);const json=this.json(this.toPath(from));this.add(path,json)}test(path,value){path=this.toPath(path);const json=this.json(path);if(!(0,deepEqual_1.deepEqual)(json,value))throw new Error("TEST")}strIns(path,pos,str){path=this.toPath(path);const{node}=this.model.api.str(path),length=node.length(),after=pos?node.find(length<pos?length-1:pos-1):node.id;if(!after)throw new Error("OUT_OF_BOUNDS");this.builder().insStr(node.id,after,str)}strDel(path,pos,len,str=""){path=this.toPath(path);const{node}=this.model.api.str(path),length=node.length();if(length<=pos)return;const deletionLength=Math.min(len??str.length,length-pos),range=node.findInterval(pos,deletionLength);if(!range)throw new Error("OUT_OF_BOUNDS");this.builder().del(node.id,range)}get(path){return this._get(this.toPath(path))}_get(steps){const model=this.model;if(!steps.length)return model.view();{const objSteps=steps.slice(0,steps.length-1),node=model.api.find(objSteps),key=steps[steps.length-1];if(node instanceof nodes_1.ObjNode)return node.get(String(key))?.view();if(node instanceof nodes_1.ArrNode){const index=~~key;if(""+index!==key)throw new Error("INVALID_INDEX");const arrNode=node.getNode(index);if(!arrNode)throw new Error("NOT_FOUND");return arrNode.view()}}}json(steps){const json=this._get(steps);if(void 0===json)throw new Error("NOT_FOUND");return json}setRoot(json){const builder=this.builder();builder.root(builder.json(json))}}},"./node_modules/json-joy/lib/json-crdt/json-patch/JsonPatchStore.js":(__unused_webpack_module,exports,__webpack_require__)=>{exports.K=void 0;const JsonPatch_1=__webpack_require__("./node_modules/json-joy/lib/json-crdt/json-patch/JsonPatch.js"),util_1=__webpack_require__("./node_modules/json-joy/lib/json-pointer/util.js");class JsonPatchStore{constructor(model,path=[]){this.model=model,this.path=path,this.update=change=>{const ops=Array.isArray(change)?change:[change];this.patcher.apply(ops)},this.get=(path="")=>this.patcher.get(path),this.getSnapshot=()=>this.api().view(),this.pfx=path.length?path.join():"";const api=model.api;this.patcher=new JsonPatch_1.JsonPatch(model,path),this.subscribe=listener=>api.onChange.listen(listener)}bind(path){return new JsonPatchStore(this.model,this.path.concat((0,util_1.toPath)(path)))}api(){return this.model.api.find(this.path)}}exports.K=JsonPatchStore},"./node_modules/json-joy/lib/json-equal/deepEqual/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});__webpack_require__("./node_modules/tslib/tslib.es6.mjs").__exportStar(__webpack_require__("./node_modules/json-joy/lib/json-equal/deepEqual/v5.js"),exports)},"./node_modules/json-joy/lib/json-equal/deepEqual/v5.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.deepEqual=void 0;const isArray=Array.isArray;exports.deepEqual=(a,b)=>{if(a===b)return!0;let length,i,keys;if(isArray(a)){if(!isArray(b))return!1;if(length=a.length,length!==b.length)return!1;for(i=length;0!=i--;)if(!(0,exports.deepEqual)(a[i],b[i]))return!1;return!0}if(a&&b&&"object"==typeof a&&"object"==typeof b){if(keys=Object.keys(a),length=keys.length,length!==Object.keys(b).length)return!1;if(isArray(b))return!1;for(i=length;0!=i--;){const key=keys[i];if(!(0,exports.deepEqual)(a[key],b[key]))return!1}return!0}return!1}}}]);
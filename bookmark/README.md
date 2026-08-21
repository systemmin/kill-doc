# 书签脚本集

**这个目录下记录了一些书签脚本，无需油猴插件就可以执行的`js`代码。**

- `min.js`：表示已压缩可在浏览器执行的`js`代码
- 脚本命名：以网站域名命名
- 没有 `min`：源代码

## 书签脚本如何使用？

去[这里](https://dtking.cn/blog/BookmarkScript/)学习一哈，或者自行AI，或网上搜索。


## 网站列表

### 中国食品药品检定研究院

```js
// 名称 中国食品药品检定研究院
// 介绍 
// 示例网址 http://app.nifdc.org.cn/jianybz/jybzTwoGj.do?formAction=viewBzpdfjs
// 匹配网址 http://app.nifdc.org.cn
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(()=>{"use strict";const src=document.querySelector("iframe").src;let urlParams=new URLSearchParams(src.substring(src.indexOf("?")+1));let downloadUrl=urlParams.get("file");window.open(downloadUrl,"_blank")})();
```

### 临床指南

```js
// 名称 临床指南
// 介绍 下载原始PDF文件
// 示例网址 https://guide.medlive.cn/cloud/guide/view?id=9005&sub_type=3&file_id=e7147a21bb94f707dbb3d88e6bb415c2
// 匹配网址 https://guide.medlive.cn/
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(()=>{"use strict";javascript:const src=document.querySelector("iframe").src;const downloadUrl=src.substring(80);const target=decodeURIComponent(downloadUrl);const news=target.substring(0,target.length-9);window.open(news,"_blank")})();
```

### 网页像素测量尺（ESC

```js
// 名称 网页像素测量尺（ESC 退出）
// 介绍 测量网页元素宽高以及元素距离浏览器左右边缘的距离
// 示例网址 *://*/*
// 匹配网址 *://*/*
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(function(){"use strict";let enabled=true;let currentElement=null;const pinnedElements=new Map;const root=document.createElement("div");root.id="__pixel_ruler_root__";Object.assign(root.style,{position:"fixed",left:"0",top:"0",width:"100vw",height:"100vh",pointerEvents:"none",zIndex:"2147483647",overflow:"visible"});function init(){if(!document.body){requestAnimationFrame(init);return}document.body.appendChild(root);document.addEventListener("mousemove",handleMouseMove,true);document.addEventListener("click",handleClick,true);document.addEventListener("keydown",handleKeyDown,true);window.addEventListener("resize",updateAll,true);window.addEventListener("scroll",updateAll,true)}if(document.body){init()}else{const observer=new MutationObserver((()=>{if(document.body){observer.disconnect();init()}}));observer.observe(document.documentElement,{childList:true,subtree:true})}function handleMouseMove(e){if(!enabled){return}let element=document.elementFromPoint(e.clientX,e.clientY);if(!element){return}if(isInspectorElement(element)){root.style.display="none";element=document.elementFromPoint(e.clientX,e.clientY);root.style.display=""}if(!element){return}if(shouldIgnore(element)){return}if(element===document.body||element===document.documentElement){return}if(element!==currentElement){currentElement=element;renderCurrent(element)}}function handleClick(e){e.preventDefault();if(!enabled){return}let element=e.target;if(!element){return}if(isInspectorElement(element)){return}if(shouldIgnore(element)){return}if(element===document.body||element===document.documentElement){return}if(pinnedElements.has(element)){return}const overlay=createMeasurement(element,true);pinnedElements.set(element,overlay);root.appendChild(overlay.container);updateMeasurement(element,overlay)}function handleKeyDown(e){if(e.key==="Escape"||e.key==="Esc"){e.preventDefault();disable()}}function renderCurrent(element){removeCurrent();const overlay=createMeasurement(element,false);overlay.container.dataset.current="true";root.appendChild(overlay.container);updateMeasurement(element,overlay)}function removeCurrent(){const current=root.querySelector('[data-current="true"]');if(current){current.remove()}}function createMeasurement(element,pinned){const container=document.createElement("div");Object.assign(container.style,{position:"fixed",left:"0",top:"0",width:"0",height:"0",pointerEvents:"none"});const box=document.createElement("div");Object.assign(box.style,{position:"fixed",boxSizing:"border-box",border:pinned?"2px solid #ff3b30":"2px solid #008cff",background:pinned?`\n                        repeating-linear-gradient(\n                            -45deg,\n                            rgba(255,59,48,.18),\n                            rgba(255,59,48,.18) 6px,\n                            rgba(255,59,48,.04) 6px,\n                            rgba(255,59,48,.04) 12px\n                        )\n                        `:`\n                        repeating-linear-gradient(\n                            -45deg,\n                            rgba(0,140,255,.18),\n                            rgba(0,140,255,.18) 6px,\n                            rgba(0,140,255,.04) 6px,\n                            rgba(0,140,255,.04) 12px\n                        )\n                        `});container.appendChild(box);const leftLine=createVerticalLine(pinned);const rightLine=createVerticalLine(pinned);container.appendChild(leftLine);container.appendChild(rightLine);const sizeLabel=createSizeLabel(pinned);container.appendChild(sizeLabel);const leftLabel=createDistanceLabel(pinned);const rightLabel=createDistanceLabel(pinned);container.appendChild(leftLabel);container.appendChild(rightLabel);return{container:container,box:box,leftLine:leftLine,rightLine:rightLine,sizeLabel:sizeLabel,leftLabel:leftLabel,rightLabel:rightLabel}}function createVerticalLine(pinned){const line=document.createElement("div");Object.assign(line.style,{position:"fixed",top:"0",height:"100vh",width:"1px",borderLeft:pinned?"1px dashed rgba(255,59,48,.65)":"1px dashed rgba(0,140,255,.65)",pointerEvents:"none"});return line}function createSizeLabel(pinned){const label=document.createElement("div");Object.assign(label.style,{position:"fixed",padding:"3px 7px",background:pinned?"#ff3b30":"#008cff",color:"#fff",borderRadius:"3px",fontFamily:'Arial, "Microsoft YaHei", sans-serif',fontSize:"12px",lineHeight:"16px",fontWeight:"bold",whiteSpace:"nowrap",boxShadow:"0 1px 5px rgba(0,0,0,.3)",pointerEvents:"none",zIndex:"20",transform:"translateX(-50%)"});return label}function createDistanceLabel(pinned){const label=document.createElement("div");Object.assign(label.style,{position:"fixed",padding:"2px 5px",background:pinned?"rgba(255,59,48,.92)":"rgba(0,0,0,.82)",color:"#fff",borderRadius:"3px",fontFamily:'Arial, "Microsoft YaHei", sans-serif',fontSize:"11px",lineHeight:"14px",whiteSpace:"nowrap",pointerEvents:"none",zIndex:"30",boxShadow:"0 1px 4px rgba(0,0,0,.25)",transition:"none"});return label}function updateMeasurement(element,overlay){if(!document.documentElement.contains(element)){overlay.container.remove();pinnedElements.delete(element);return}const rect=element.getBoundingClientRect();const viewportWidth=window.innerWidth;const x=rect.left;const width=rect.width;const right=rect.right;const height=rect.height;const y=rect.top;const leftDistance=Math.max(0,x);const rightDistance=Math.max(0,viewportWidth-right);Object.assign(overlay.box.style,{left:`${x}px`,top:`${y}px`,width:`${width}px`,height:`${height}px`});overlay.leftLine.style.left=`${x}px`;overlay.rightLine.style.left=`${right}px`;overlay.sizeLabel.textContent=`${round(width)} × ${round(height)} px`;overlay.sizeLabel.style.left=`${x+width/2}px`;if(height>=28){overlay.sizeLabel.style.top=`${y+height/2-10}px`}else{overlay.sizeLabel.style.top=`${Math.max(2,y-25)}px`}updateLeftDistance(overlay,x,y,width,height,leftDistance);updateRightDistance(overlay,x,y,width,height,right,rightDistance,viewportWidth)}function updateLeftDistance(overlay,x,y,width,height,distance){overlay.leftLabel.textContent=`${round(distance)} px`;const labelWidth=estimateLabelWidth(distance);const outsideSpace=x;if(outsideSpace>=labelWidth+12){overlay.leftLabel.style.left=`${x/2}px`;overlay.leftLabel.style.top=`${y+height/2-8}px`;overlay.leftLabel.style.transform="translateX(-50%)"}else{overlay.leftLabel.style.left=`${Math.min(x+5,x+width/2)}px`;overlay.leftLabel.style.top=`${y+height/2-8}px`;overlay.leftLabel.style.transform="none"}}function updateRightDistance(overlay,x,y,width,height,right,distance,viewportWidth){overlay.rightLabel.textContent=`${round(distance)} px`;const labelWidth=estimateLabelWidth(distance);const outsideSpace=viewportWidth-right;if(outsideSpace>=labelWidth+12){overlay.rightLabel.style.left=`${right+distance/2}px`;overlay.rightLabel.style.top=`${y+height/2-8}px`;overlay.rightLabel.style.transform="translateX(-50%)"}else{overlay.rightLabel.style.left=`${Math.max(x+width-labelWidth-5,x+width/2)}px`;overlay.rightLabel.style.top=`${y+height/2-8}px`;overlay.rightLabel.style.transform="translateX(-100%)"}}function estimateLabelWidth(value){return String(Math.round(value)).length*7+18}function updateAll(){if(!enabled){return}if(currentElement){const currentContainer=root.querySelector('[data-current="true"]');if(currentContainer){const overlay=currentContainer.__overlay;if(overlay){updateMeasurement(currentElement,overlay)}}}for(const[element,overlay]of pinnedElements){updateMeasurement(element,overlay)}}function isInspectorElement(element){return element===root||root.contains(element)}function shouldIgnore(element){if(!element||element.nodeType!==1){return true}const tag=element.tagName.toLowerCase();return["script","style","meta","link","noscript","title"].includes(tag)}function round(value){if(Math.abs(value-Math.round(value))<.01){return Math.round(value)}return value.toFixed(1)}function disable(){if(!enabled){return}enabled=false;currentElement=null;pinnedElements.clear();root.remove();document.removeEventListener("mousemove",handleMouseMove,true);document.removeEventListener("click",handleClick,true);document.removeEventListener("keydown",handleKeyDown,true);window.removeEventListener("resize",updateAll,true);window.removeEventListener("scroll",updateAll,true)}})();
```

### 任意网页元素截图

```js
// 名称 任意网页元素截图
// 介绍 使用 snapdom 对网页元素截图
// 示例网址 *://*/*
// 匹配网址 *://*/*
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(async function(){"use strict";let loading=false;const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/@zumer/snapdom/dist/snapdom.min.js";script.fetchpriority="high";script.addEventListener("load",(()=>{loading=true}));document.body.appendChild(script);await new Promise(((resolve,reject)=>{const interval=setInterval((()=>{if(loading){clearInterval(interval);resolve(true)}}),100)}));const btn=document.createElement("button");btn.textContent="截图";Object.assign(btn.style,{position:"fixed",bottom:"20px",right:"20px",zIndex:9999,padding:"10px 15px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",cursor:"pointer"});document.body.appendChild(btn);let hoverBox;let selecting=false;function createHoverBox(){hoverBox=document.createElement("div");Object.assign(hoverBox.style,{position:"absolute",outline:"1px solid red",backgroundColor:"rgba(255,0,0,0.05)",zIndex:9998,pointerEvents:"none"});document.body.appendChild(hoverBox)}function enableSelection(){if(selecting)return;selecting=true;createHoverBox();document.addEventListener("mousemove",onMouseMove);document.addEventListener("click",onClickSelect,true);document.addEventListener("keydown",onKeyDown,true)}function disableSelection(){selecting=false;document.removeEventListener("mousemove",onMouseMove);document.removeEventListener("click",onClickSelect,true);document.removeEventListener("keydown",onKeyDown,true);if(hoverBox){hoverBox.remove();hoverBox=null}}function onMouseMove(e){if(!selecting)return;const el=document.elementFromPoint(e.clientX,e.clientY);if(!el||el===hoverBox||el===btn)return;const rect=el.getBoundingClientRect();Object.assign(hoverBox.style,{top:rect.top+window.scrollY+"px",left:rect.left+window.scrollX+"px",width:rect.width+"px",height:rect.height+"px",display:"block"})}function onClickSelect(e){e.preventDefault();e.stopPropagation();const el=document.elementFromPoint(e.clientX,e.clientY);if(!el||el===btn){disableSelection();return}disableSelection();snapshot(el)}function onKeyDown(e){if(e.key==="Escape"){disableSelection()}}async function snapshot(el,filename){const result=await snapdom(el);await result.download({format:"jpg",filename:filename||document.title})}btn.addEventListener("click",(()=>{enableSelection()}))})();
```

### 前沿知识库

```js
// 名称 前沿知识库
// 介绍 下载公开投资研究报告
// 示例网址 https://wk.askci.com/details/a761cd28815e4a3ca06d460fc0e4a001/
// 匹配网址 https://wk.askci.com/
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(()=>{"use strict";javascript:const src=document.querySelector("iframe").src;let urlParams=new URLSearchParams(src.substring(src.indexOf("?")+1));let downloadUrl=urlParams.get("pdfpath");window.open(downloadUrl,"_blank")})();
```

### 黑电子

```js
// 名称 黑电子
// 介绍 代码块高亮，帖子内容必须有代码块才会有效
// 示例网址 http://www.51hei.com/bbs/dpj-240127-1.html
// 匹配网址 http://www.51hei.com
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(async()=>{"use strict";let loading=false;let script=document.createElement("script");script.src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";script.fetchpriority="high";script.addEventListener("load",(()=>{console.log("外部库加载完成！highlight")}));document.body.appendChild(script);script=document.createElement("script");script.src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/c.min.js";script.fetchpriority="high";script.addEventListener("load",(()=>{console.log("外部库加载完成！c.min.js")}));document.body.appendChild(script);script=document.createElement("link");script.href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css";script.fetchpriority="high";script.rel="stylesheet";script.addEventListener("load",(()=>{console.log("外部库加载完成！link");loading=true}));document.body.appendChild(script);await new Promise(((resolve,reject)=>{const interval=setInterval((()=>{if(loading){clearInterval(interval);resolve(true)}}),100)}));const nodes=[...document.querySelectorAll(".blockcode")];for(let node of nodes){let code=node.firstChild;let pre=document.createElement("pre");let pcode=document.createElement("code");pre.style.width="757px";pre.style.overflow="auto";pre.style.borderRadius="10px";pre.style.display="block";pre.id=code.id+"pre";pre.appendChild(pcode);pcode.innerHTML=code.innerHTML;node.after(pre);code.style.display="none";let div=document.createElement("div");let button=document.createElement("button");button.innerText="显示原文";button.dataset.id=code.id;button.onclick=function(){console.log(this.dataset);let id=this.dataset.id;let divCode=document.getElementById(id);let preCode=document.getElementById(id+"pre");if(divCode.style.display==="none"){divCode.style.display="block";preCode.style.display="none";this.innerText="格式化"}else{divCode.style.display="none";preCode.style.display="block";this.innerText="显示原文"}};div.appendChild(button);node.before(div)}hljs.highlightAll()})();
```

### 道客巴巴

```js
// 名称 道客巴巴
// 介绍 更快、更便捷、更高清，强到没朋友
// 示例网址 
// 匹配网址 https://www.doc88.com/
// 版本号码 0.0.2
```

#### 书签代码

```js
javascript:(async()=>{"use strict";let loading=false;const script=document.createElement("script");script.src="https://unpkg.com/jspdf@2.4.0/dist/jspdf.umd.min.js";script.fetchpriority="high";script.addEventListener("load",(()=>{loading=true}));document.body.appendChild(script);await new Promise(((resolve,reject)=>{const interval=setInterval((()=>{if(loading){clearInterval(interval);resolve(true)}}),100)}));const CLASS_NAME_LIST="#pageContainer .inner_page";const title=document.title;console.log(title);let timer=null;const jsPDF=jspdf.jsPDF;const doc=new jsPDF({orientation:"p",unit:"px",compress:true,hotfixes:["px_scaling"]});function updateState(params){const url=new URL(window.location.href);url.searchParams.set("状态",params);history.pushState({},"",url.href)}updateState("开始预览");function updateProgress(current,total){let p=current/total*100;let ps=p.toFixed(0)>100?100:p.toFixed(0);console.log("当前进度",ps);let url=new URL(window.location.href);url.searchParams.set("p",ps);history.pushState({},"",url.href)}function addDataPage(data,i,width,height){let target_h=height,target_w=width;let dir="p";if(width>height){dir="l";target_h=width;target_w=height}doc.addPage([target_w,target_h],dir);doc.addImage(data,"JPEG",0,0,target_w,target_h,i,"FAST");if(doc.internal.pages[1].length===2){doc.deletePage(1)}}function traverseSaveCanvas(){const nodes=document.querySelectorAll(CLASS_NAME_LIST);const len=nodes.length;for(let i=0;i<len;i++){const item=nodes[i];let previousElementSibling=item.previousElementSibling.previousElementSibling;let t=previousElementSibling.innerText;if(t.length!==0){continue}updateProgress(i+1,len);addDataPage(item,i,item.width,item.height)}console.log("处理完成",length);updateState("正在下载");doc.save(`${title}.pdf`,{returnPromise:true}).then((res=>{console.log(res)}))}function isElementInViewport(element){const rect=element.getBoundingClientRect();const windowHeight=window.innerHeight;if(rect.top<=0&&rect.top>=-rect.height){return true}else if(rect.bottom>=0&&rect.bottom<=rect.height){return true}else{return false}}function clearTimer(){if(timer){clearInterval(timer)}}function previewPage(){const nodes=document.querySelectorAll(CLASS_NAME_LIST);const len=nodes.length;let finish=true;for(let i=0;i<len;i++){let node=nodes[i];let previousElementSibling=node.previousElementSibling.previousElementSibling;let fs=node.getAttribute("fs");let t=previousElementSibling.innerText;if(t.length!==0){node.scrollIntoView({behavior:"smooth"});finish=false;updateProgress(i+1,len);break}}if(finish){updateState("开始下载");traverseSaveCanvas();clearTimer()}else{console.log("还没有")}return finish}function continueLoad(){let eb=document.querySelector("#continueButton");if(eb){eb.click()}}timer=setInterval((()=>{continueLoad();let end=previewPage();console.log("定时器")}),500)})();
```
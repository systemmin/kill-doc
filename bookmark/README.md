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

### 百度文库

```js
// 名称 百度文库
// 介绍 更快、更便捷、更高清，强到没朋友
// 示例网址 
// 匹配网址 https://wenku.baidu.com
// 版本号码 0.0.1
```

#### 书签代码

```js
javascript:(async()=>{"use strict";let loading=false;const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/@zumer/snapdom/dist/snapdom.min.js";script.fetchpriority="high";script.addEventListener("load",(()=>{loading=true}));document.body.appendChild(script);await new Promise(((resolve,reject)=>{const interval=setInterval((()=>{if(loading){clearInterval(interval);resolve(true)}}),100)}));let el=document.querySelector("#app-reader-editor");const result=await snapdom(el);await result.download({format:"jpg",filename:document.title})})();
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
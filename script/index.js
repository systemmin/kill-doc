// ==UserScript==
// @name         【最强无套路脚本】你能看见多少我能下载多少&下载公开免费的PPT、PDF、DOC、TXT等文件
// @namespace    http://tampermonkey.net/
// @homepage	 https://github.com/systemmin/kill-doc
// @version      5.4
// @description  百度|原创力|人人|360文库|豆丁|豆丁建筑|道客|MBA智库|得力|七彩学科|金锄头|爱问|蚂蚁|读根网|搜弘|微传网|淘豆网|GB|JJG|行业标准|轻竹办公|自然标准|交通标准|飞书|江苏计量|水利部|招投标|能源标准|认证认可标准等公开免费文档下载
// @author       Mr.Fang
// @match        https://*.book118.com/*
// @match        https://*.renrendoc.com/*
// @match        https://*.docin.com/*
// @match        https://*.doc88.com/*
// @match        https://doc.mbalib.com/*
// @match        https://*.deliwenku.com/*
// @match        https://*.jinchutou.com/*
// @match        https://*.152files.goldhoe.com/*
// @match        https://*.mayiwenku.com/*
// @match        https://*.dugen.com/*
// @match        https://*.7cxk.com/*
// @match        https://ishare.iask.com/*
// @match        https://swf.iask.com/*
// @match        https://*.down.sina.com.cn/*
// @match        https://wenku.baidu.com/*
// @match        https://wkbjcloudbos.bdimg.com/*
// @match        https://wkretype.bdimg.com/*
// @match        https://*.chochina.com/*
// @match        https://*.weizhuannet.com/*
// @match        https://www.taodocs.com/*
// @match        https://wenku.so.com/*
// @match        https://*.360tres.com/*
// @match        https://www.wenkub.com/*
// @match        http://c.gb688.cn/*
// @match        https://jjg.spc.org.cn/resmea/view/stdonline
// @match        https://pro-img-brtm.baijiayun.com/*
// @match        https://hbba.sacinfo.org.cn/attachment/onlineRead/*
// @match        https://www.qzoffice.com/*
// @match        http://www.nrsis.org.cn/mnr_kfs/file/read/*
// @match        https://*.feishu.cn/space/*
// @match        http://www.jtysbz.cn:8009/pdf/viewer/*
// @match        https://www.nssi.org.cn/cssn/js/pdfjs/web/preview.jsp*
// @match        https://online.71nc.cn/*
// @match        http://114.251.111.103:18080/kfs/file/read/*
// @match        https://bulletin.cebpubservice.com/resource/ceb/js/pdfjs-dist/web/viewer.html*
// @match        http://121.36.94.83:9008/jsp/yishenqing/appladd/biaozhunfile/flash/previewImg.jsp*
// @match        http://rbtest.cnca.cn/cnca_kfs/file/read/*
// @require      https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jspdf/2.4.0/jspdf.umd.min.js
// @require      https://unpkg.com/@zip.js/zip.js@2.7.34/dist/zip.min.js
// @require      https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.js
// @icon         https://dtking.cn/favicon.ico
// @run-at 		document-idle
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_setValue
// @grant       GM_download
// @grant       GM_notification
// @grant        unsafeWindow
// @license      Apache-2.0
// @downloadURL https://update.greasyfork.org/scripts/486211/%E3%80%90%E6%9C%80%E5%BC%BA%E6%97%A0%E5%A5%97%E8%B7%AF%E8%84%9A%E6%9C%AC%E3%80%91%E4%BD%A0%E8%83%BD%E7%9C%8B%E8%A7%81%E5%A4%9A%E5%B0%91%E6%88%91%E8%83%BD%E4%B8%8B%E8%BD%BD%E5%A4%9A%E5%B0%91%E4%B8%8B%E8%BD%BD%E5%85%AC%E5%BC%80%E5%85%8D%E8%B4%B9%E7%9A%84PPT%E3%80%81PDF%E3%80%81DOC%E3%80%81TXT%E7%AD%89%E6%96%87%E4%BB%B6.user.js
// @updateURL https://update.greasyfork.org/scripts/486211/%E3%80%90%E6%9C%80%E5%BC%BA%E6%97%A0%E5%A5%97%E8%B7%AF%E8%84%9A%E6%9C%AC%E3%80%91%E4%BD%A0%E8%83%BD%E7%9C%8B%E8%A7%81%E5%A4%9A%E5%B0%91%E6%88%91%E8%83%BD%E4%B8%8B%E8%BD%BD%E5%A4%9A%E5%B0%91%E4%B8%8B%E8%BD%BD%E5%85%AC%E5%BC%80%E5%85%8D%E8%B4%B9%E7%9A%84PPT%E3%80%81PDF%E3%80%81DOC%E3%80%81TXT%E7%AD%89%E6%96%87%E4%BB%B6.meta.js
// ==/UserScript==
(function() {
	'use strict';
	let MF =
		'#MF_fixed{position:fixed;top:50%;transform:translateY(-50%);right:20px;gap:20px;flex-direction:column;z-index:2147483647;display:flex}';
	MF +=
		'.MF_box{padding:10px;cursor:pointer;border-color:rgb(0,102,255);border-radius:5px;background-color:white;color:rgb(0,102,255);margin-right:10px;box-shadow:rgb(207,207,207) 1px 1px 9px 3px}.MF_active{color: green}#MF_speed{color: red;}';
	MF +=
		'@media print{html{height:auto !important}body{display:block !important}#app-left{display:none !important}#app-right{display:none !important}#MF_fixed{display:none !important}.menubar{display:none !important}.top-bar-right{display:none !important}.user-guide{display:none !important}#app-reader-editor-below{display:none !important}.no-full-screen{display:none !important}.comp-vip-pop{display:none !important}.center-wrapper{width:auto !important}.reader-thumb,.related-doc-list,.fold-page-content,.try-end-fold-page,.lazy-load,#MF_textarea,#nav-menu-wrap{display:none !important}}'
	const prefix = "MF_";
	// canvas 禁止重写 drawImage
	const canvasRenderingContext2DPrototype = CanvasRenderingContext2D.prototype;
	const originalDrawImage = canvasRenderingContext2DPrototype.drawImage;
	Object.defineProperty(canvasRenderingContext2DPrototype, 'drawImage', {
		value: originalDrawImage,
		writable: false,
		configurable: false
	});


	/**
	 * @description 添加 URL 到本地缓存
	 * @author Mr.Fang
	 * @time 2024年2月4日
	 * @param {Array} urls 数据
	 * @param key
	 */
	const MF_addURL = (urls, key = 'listData') => {
		let listData = JSON.parse(localStorage.getItem(key)) || [];
		let index = 0;
		let length = listData.length;
		urls.forEach((url) => {
			if (!listData.some(item => item.src === url)) {
				// 添加新的URL对象
				listData.push({
					src: url,
					page: length + index
				});
				index++;
			}
		})
		// 将更新后的URL数组存储回localStorage
		localStorage.setItem(key, JSON.stringify(listData));
		GM_setValue(key, JSON.stringify(listData))
		console.log('URL已添加：');
	}
	/**
	 * Url 地址拼接，无需预览直接从 HTML 中读取相应的参数即可
	 */
	const loadingUrls = (params) => {
		const _pageCount = Viewer._pageCount;
		console.log(_pageCount);
		let dp;
		if (params) {
			dp = u.query('#dp').value.replace('www', 'ww'); // 读根网特殊情况
		} else {
			dp = u.query('#dp').value;
		}
		const urls = [];
		for (var i = 1; i < _pageCount + 1; i++) {
			let u = dp + i + ".gif";
			urls.push(u);
		}
		MF_addURL(urls);
	}

	/**
	 * Url 地址拼接，无需预览直接从 HTML 中读取相应的参数即可
	 */
	const joinDownloadURL = (baseUrl) => {
		const size = Page.size;
		const urls = [];
		for (var i = 0; i < size; i++) {
			urls.push(baseUrl + '/' + i + '.png');
		}
		MF_addURL(urls);
	}


	class Box {
		id = ""; // id
		label = ""; // 按钮文本
		fun = ""; // 执行方法
		constructor(id, label, fun) {
			this.id = id;
			this.label = label;
			this.fun = fun;
		}
	}

	class Utility {
		debug = true;

		/**
		 * 添加 css 样式
		 * @param e 节点
		 * @param data JSON 格式样式
		 */
		style(e, data) {
			Object.keys(data).forEach(key => {
				e.style[key] = data[key]
			})
		}

		attr(e, key, val) {
			if (!val) {
				return e.getAttribute(key);
			} else {
				e.setAttribute(key, val);
			}

		}

		/**
		 *  追加样式
		 * @param css  格式样式
		 */
		appendStyle(css) {
			let style = this.createEl('', 'style');
			style.textContent = css;
			style.type = 'text/css';
			let dom = document.head || document.documentElement;
			dom.appendChild(style);
		}

		/**
		 * @description 创建 dom
		 * @param id 必填
		 * @param elType
		 * @param data
		 */
		createEl(id, elType, data) {
			const el = document.createElement(elType);
			el.id = id || '';
			if (data) {
				this.style(el, data);
			}
			return el;
		}

		query(el) {
			return document.querySelector(el);
		}

		queryAll(el) {
			return document.querySelectorAll(el);
		}

		update(el, text) {
			const elNode = this.query(el);
			if (!elNode) {
				console.log('节点不存在');
			} else {
				elNode.innerHTML = text;
			}
		}

		/**
		 * 进度
		 * @param current 当前数量 -1预览结束
		 * @param total 总数量
		 * @param content 内容
		 */
		preview(current, total, content) {
			return new Promise(async (resolve, reject) => {
				if (current === -1) {
					this.update('#' + prefix + 'text', content ? content : "已完成");
				} else {
					let p = (current / total) * 100;
					let ps = p.toFixed(0) > 100 ? 100 : p.toFixed(0);
					console.log('当前进度', ps)
					this.update('#' + prefix + 'text', '进度' + ps + '%');
					await this.sleep(500);
					resolve();
				}
			})

		}

		preText(content) {
			this.update('#' + prefix + 'text', content);
		}

		gui(boxs) {
			const box = this.createEl(prefix + "fixed", 'div');
			for (let x in boxs) {
				let item = boxs[x];
				if (!item.id) continue;
				let el = this.createEl(prefix + item.id, 'button');
				el.append(new Text(item.label));
				if (x === '0') {
					el.classList = prefix + 'box ' + prefix + "active";
				} else {
					el.className = prefix + "box";
				}
				if (item.fun) {
					el.onclick = function() {
						eval(item.fun);
					}
				}
				if (item.id === 'speed') {
					this.attr(el, 'contenteditable', true)
				}
				box.append(el);
			}
			document.body.append(box);
		}

		sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		}

		log(msg) {
			if (this.debug) {
				console.log(msg);
			}
		}

		logt(msg) {
			if (this.debug) {
				console.table(msg);
			}
		}
	}

	const u = new Utility();
	u.appendStyle(MF);


	const btns = [
		new Box('text', '状态 0 %'),
		new Box('start', '自动预览', 'autoPreview()'),
		new Box('stop', '停止预览', 'stopPreview()'),
		new Box('down', '下载图片', 'executeDownload(2)'),
		new Box('pdf', '下载PDF', 'executeDownload(1)')
	]

	const domain = {
		renrendoc: "renrendoc.com",
		book118: 'book118.com',
		docin: 'docin.com',
		wenku: 'wenku.baidu.com',
		so: 'wenku.so.com',
		doc88: 'doc88.com',
		mbalib: 'doc.mbalib.com',
		deliwenku: 'deliwenku.com',
		cxk: '7cxk.com',
		jinchutou: 'jinchutou.com',
		mayiwenku: 'mayiwenku.com',
		dugen: 'ww.dugen.com',
		iask: 'ishare.iask.com',
		chochina: 'chochina.com',
		weizhuan: 'weizhuannet.com',
		taodocs: 'taodocs.com',
		wenkub: 'wenkub.com',
		gb688: 'gb688.cn',
		jjg: 'jjg.spc.org.cn',
		shengtongedu: 'pro-img-brtm.baijiayun.com',
		sacinfo: 'hbba.sacinfo.org.cn',
		qzoffice: 'www.qzoffice.com',
		nrsis: 'www.nrsis.org.cn',
		nea: '114.251.111.103:18080',
		nssi: 'www.nssi.org.cn',
		feishu: 'feishu.cn',
		jtysbz: 'jtysbz.cn',
		jsjlw: 'online.71nc.cn',
		mwr: '121.36.94.83:9008',
		cebpubservice: 'bulletin.cebpubservice.com',
		rbtest: 'rbtest.cnca.cn',
	};
	const {
		host,
		href,
		origin
	} = window.location;
	const jsPDF = jspdf.jsPDF;
	let zipWriter; // 声明全局变量
	zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"), {
		bufferedWrite: true,
		useCompressionStream: false
	});
	const doc = new jsPDF({
		orientation: 'p',
		unit: 'px',
		compress: true
	});
	let pdf_w = 446,
		pdf_h = 631,
		loading = 500, // 毫秒
		pdf_ratio = 0.56,
		title = document.title,
		fileType = '',
		downType = 1, // 下载文件类型
		select = null,
		selectBox = null,
		dom = null,
		beforeFun = null,
		interval = null,
		startPageNo = 0,
		BASE_URL = 'https://wkretype.bdimg.com/retype',
		readerInfoBai = null, // 百度文档参数
		intervalBai = null; // 百度定时任务
	if (host.includes(domain.taodocs)) {
		iscopy = 'TRUE'; // taodocs copy flag
	}

	const params = new URLSearchParams(document.location.search.substring(1));
	if (params.size && params.get('custom')) {
		window.parent.postMessage({
			type: "onload",
			value: 'success'
		}, "*")
		u.log('子页面加载完成！');
	}

	// 百度拷贝文本
	const baiduCopy = () => {
		const observerOptions = {
			characterData: true,
			subtree: true
		};
		// dom 监听器
		const observer = new MutationObserver(function(mutationList, observer) {
			const mutation = mutationList[0];
			let data = mutation.target.data;
			let result = data.substring(data.indexOf('“') + 1, data.lastIndexOf('”'));
			let textarea = u.query('#MF_textarea');
			if (textarea) {
				textarea.innerText = result;
			} else {
				textarea = u.createEl('MF_textarea', 'textarea');
				let style = {
					width: "100%",
					height: "200px",
					outline: "none",
					padding: "10px",
					boxSizing: "border-box",
					fontSize: "16px",
					border: "1px solid rgb(204, 204, 204)"
				}
				u.style(textarea, style)
				textarea.innerText = result;
				let box = u.query('#catalog-main') || u.query('.catalog-main') || u.query(
					'.related-doc-list')
				box.before(textarea);
			}
		});
		const targetNode2 = document.querySelector('.link')
		// 触发监听
		observer.observe(targetNode2, observerOptions);
	}

	// 监听页面卸载，移除百度定时删除广告等 DOM 定时器
	window.onunload = function() {
		if (intervalBai) {
			clearInterval(intervalBai);
			intervalBai = null;
		}
	}

	// 百度 xhr 数据监听
	if (host.includes(domain.wenku)) {
		const _r_text = window.Response.prototype.text;
		window.Response.prototype.text = function() {
			return new Promise((resolve, reject) => {
				_r_text.call(this).then((text) => {
					resolve(text);
				}).catch(reject);
			});
		}
		const _open = window.XMLHttpRequest.prototype.open;
		window.XMLHttpRequest.prototype.open = function(...args) {
			this.addEventListener("load", () => {
				try {
					let content = this.responseText;
					const url = args[1];
					if (url.includes('ndocview/readerinfo')) {
						const {
							data
						} = JSON.parse(content);
						const htmlUrls = data.htmlUrls;
						let list = htmlUrls.png;
						let images = [];
						if (list) {
							images = htmlUrls.png.map(item => {
								return item.pageLoadUrl
							});
						} else {
							images = htmlUrls;
						}
						// 文本内容地址保存
						if (htmlUrls.json) {
							let pageLoadUrl = htmlUrls.json.map(item => {
								return item.pageLoadUrl
							})
							MF_addURL(pageLoadUrl, 'pageData');
						}
						// 纯文本类型文件
						if (fileType === "txt") { // 纯文本类型
							let urls = [];
							const {
								docId,
								freePage,
								rsign,
								md5sum
							} = data;
							for (var i = readerInfoBai.showPage + 1; i < freePage + 1; i++) {
								let x = md5sum.substring(1);
								let n = ["pn=" + i, "rn=1", "type=txt", "spr=0", "rsign=" + rsign,
									"callback=wenku_" + i
								].join("&");
								let url = BASE_URL + "/text/" + docId + "?" + x + "&" + n;
								urls.push(url)
							}
							MF_addURL(urls, 'pageData');
						}
						MF_addURL(images);
					}
				} catch {}
			});
			return _open.apply(this, args);
		}
	}

	const childMessage = (message) => {
		window.parent.postMessage({
			type: "child",
			value: message ? message : ''
		}, "*")
	}
	const parentMessage = (message, attr) => {
		const ifarme = document.getElementById(attr);
		let _window = ifarme.contentWindow;
		_window.postMessage({
			type: 'parent',
			value: message ? message : ''
		}, "*")
	}
	// 监听页面消息事件
	window.addEventListener("message", (e) => {
		// console.log(e)
		const {
			type,
			value
		} = e.data;
		if (type === 'parent') { // 父级-子页面消息
			if (value.includes(origin)) {
				MF_ImageToBase64(value).then(data => {
					childMessage(data);
				})
			}
		} else if (type === 'child') { // 子页面-到父页面消息
			let index = Number(localStorage.getItem("current") || "0");
			let length = Number(localStorage.getItem("length") || "0");
			const {
				blob,
				uint8,
				width,
				height
			} = value;
			if (fileType.includes('ppt') || width > height) {
				doc.addPage([width * pdf_ratio, height * pdf_ratio], 'l');
				doc.addImage(uint8, 'JPEG', 0, 0, width * pdf_ratio, height * pdf_ratio, index, 'FAST')
			} else {
				doc.addPage();
				doc.addImage(uint8, 'JPEG', 0, 0, pdf_w, pdf_h, index, 'FAST')
			}
			if (index === 1) {
				doc.deletePage(1);
			}
			zipWriter.add(index + ".png", new zip.BlobReader(blob));
			localStorage.setItem('current', index + 1 + "");
			downimg();
		} else if (type === 'onload') {
			const url = new URL(e.origin);
			const attrId = url.host.replaceAll(".", "");
			const query = document.getElementById('#' + attrId);
			if (query) {
				downimg();
			}
		}
	})


	/**
	 * @description 前置方法
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const before = () => {
		if (beforeFun) {
			u.log('---------->beforeFun');
			eval(beforeFun)
		}
		// 画布添加监听事件，当数据加载完成删除 id，防止数据被清空
		if (host.includes(domain.wenku)) {
			const els = u.queryAll('canvas');
			for (var i = 0; i < els.length; i++) {
				let eNode = els[i];
				const intersectionObserver = new IntersectionObserver((entries) => {
					let isIntersecting = entries[0].isIntersecting
					if (isIntersecting && eNode.width && eNode.height) {
						eNode.id = '';
					}
				});
				// 开始监听
				intersectionObserver.observe(eNode);
			}
		}
	}

	/**
	 * @description 初始化方法
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const init = () => {
		console.table({
			host,
			href,
			origin
		})
		dom = document.documentElement || document.body;
		if (host.includes(domain.renrendoc)) {
			if (!/.*renrendoc\.com\/.+$/.test(href)) {
				u.log('结束');
				return;
			}
			const node = u.query('h1');
			title = node.innerText.replaceAll(" ", "");
			node.nextElementSibling.children
			const innerText = node.nextElementSibling.children[6].innerText;
			fileType = innerText.split("：")[1].toLowerCase();
			dom = u.query('.main-content');
			beforeFun =
				"let er = u.query('#load_preview_btn');if (er && er.style.display !== 'none') {er.click()}";
			select = "#page img";
			btns.push(new Box('PPT', '获取地址', 'downtxt()'))
		} else if (host.includes(domain.book118)) {
			if (!/.+book118\.com\/.+$/.test(href)) {
				u.log('结束');
				return;
			}
			if (!href.includes('pptView.html') && !params.get("readpage")) {
				let node = u.query('h1')
				node = node ? node : u.query('h2');
				title = node.innerText.replaceAll(" ", "").replaceAll("VIP", "");
				const number = title.lastIndexOf(".");
				fileType = title.substring(number + 1).toLowerCase();
				GM_setValue('title', title);
				if (fileType.includes('ppt')) {
					beforeFun = "let eb = u.query('#btn_ppt_front_pc');if (eb) {eb.click();}";
				} else {
					beforeFun = "let eb = u.query('#btn_preview_remain');if (eb) {eb.click();}";
				}
			} else {
				fileType = 'ppt';
				title = GM_getValue('title');
			}
			select = ".webpreview-item img";
			btns.push(new Box('PPT', '获取地址', 'downtxt()'))
		} else if (host.includes(domain.docin)) {
			if (!/.+docin\.com\/.+$/.test(href)) {
				u.log('结束');
				return;
			}
			select = "#contentcontainer canvas";
			const toImg = params.get('toImg');
			console.log('toImg', toImg);
			title = u.query('meta[property="og:title"]').content;
			fileType = u.attr(u.query('h1').children[0], 'title').toLowerCase();
			if (toImg && toImg === '1') {
				select = "#contentcontainer img"
			}
			console.log('toImg', select);
			if (isUserLogin === '1') { // 登录
				beforeFun = "let eb = u.query('.model-fold-show');if (eb) {eb.click();}";
			}
			if (fileType.includes('ppt') || (toImg && toImg === '1')) {
				btns.push(new Box('PPT', '获取地址', 'downtxt()'))
			}

		} else if (host.includes(domain.wenku)) {
			if (!/.+wenku\.baidu\.com\/(tfview|view).+$/.test(href)) {
				u.log('结束');
				return;
			}
			dom = u.query('.reader-wrap');
			beforeFun =
				"let eb = u.query('.unfold')?u.query('.unfold'):u.query('.read-all');if (eb) {eb.click();}";
			select = "#original-creader-root canvas";
			btns.push(new Box('print-pdf', '打印PDF', 'window.print()'))
			if (fileType.includes('ppt') || fileType.includes('pdf')) {
				btns.push(new Box('PPT', '获取地址', 'downtxt()'))
			} else {
				btns.push(new Box('get-text', '获取文本', 'fullText()'))
			}
		} else if (host.includes(domain.so)) {
			if (!/.+wenku\.so\.com\/.+$/.test(href)) {
				u.log('结束');
				return;
			}
			const {
				Title,
				DocType,
				Field03
			} = asyncData.DocInfo;
			title = Title;
			fileType = DocType.toLowerCase();;
			btns.splice(1, 2);
			btns.push(new Box('PPT', '获取地址', 'downtxt()'))
			MF_addURL(Field03);
		} else if (host.includes(domain.doc88)) {
			if (!/.+doc88\.com\/.+$/.test(href)) {
				u.log('结束');
				return;
			}
			title = u.query('meta[property="og:title"]').content;
			fileType = u.query("#box1 .attribute").innerText.split(" ")[0].split("：")[1].toLowerCase();
			beforeFun = "let eb = u.query('#continueButton');if (eb) {eb.click();}";
			select = "#pageContainer .inner_page";
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
		} else if (host.includes(domain.mbalib)) {
			if (!/doc\.mbalib\.com\/.+$/.test(href)) {
				u.log('结束');
				return;
			}
			dom = u.query('#scroll-m-box');
			title = u.query('h1 p').innerText;
			fileType = title.substring(title.indexOf('.') + 1).toLowerCase();
			select = "#viewer .page"
			btns.splice(1, 0, new Box('speed', '500'));
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
		} else if (host.includes(domain.deliwenku) ||
			host.includes(domain.cxk) ||
			host.includes(domain.jinchutou) ||
			host.includes(domain.mayiwenku) ||
			host.includes(domain.dugen) ||
			host.includes(domain.chochina) ||
			host.includes(domain.weizhuan)
		) {
			if ((!/.+deliwenku\.com\/.+$/.test(href)) &&
				(!/.+7cxk\.com\/.+$/.test(href)) &&
				(!/.+jinchutou\.com\/.+$/.test(href)) &&
				(!/.+mayiwenku\.com\/.+$/.test(href)) &&
				(!/ww\.dugen\.com\/.+$/.test(href)) &&
				(!/.+chochina\.com\/.+$/.test(href)) &&
				(!/.+weizhuannet\.com\/.+$/.test(href))
			) {
				return;
			}
			// 蚂蚁需手动点击全文
			if (host.includes(domain.mayiwenku) || host.includes(domain.dugen)) {
				preview();
				loadingUrls(host.includes(domain.dugen));
			} else {
				loadingUrls();
			}
			if (host.includes(domain.chochina)) {
				title = u.query('h1').innerText;
				fileType = title.substring(title.indexOf('.') + 1).toLowerCase();
			} else {
				title = u.query('meta[property="og:title"]').content;
				fileType = u.query('meta[property="og:document:type"]').content.toLowerCase();
			}
			btns.splice(1, 2);
			btns.push(new Box('PPT', '获取地址', 'downtxt()'))

		} else if (host.includes(domain.iask)) {
			if (!/ishare\.iask\.com\/.+$/.test(href)) return;
			title = pageConfig.access.title;
			fileType = pageConfig.access.format.toLowerCase();;
			btns.splice(1, 2);
			btns.push(new Box('PPT', '获取地址', 'downtxt()'))
			MF_addURL(pageConfig.imgUrl);
		} else if (host.includes(domain.taodocs)) {
			if (!/www\.taodocs\.com\/.+$/.test(href)) return;
			title = u.query('h1').innerText;
			fileType = title.substring(title.indexOf('.') + 1).toLowerCase();
			beforeFun = "let eb = u.query('.fc2e');if (eb) {eb.click();}";
			select = "#canvas canvas";
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
		} else if (host.includes(domain.wenkub)) {
			if (!/www\.wenkub\.com\/.+$/.test(href)) return;
			title = u.query('h1').innerText;
			fileType = title.substring(title.indexOf('.') + 1).toLowerCase();
			beforeFun = "let eb = u.query('.fc2e');if (eb) {eb.click();}";
			select = "#pageContainer img";
		} else if (host.includes(domain.gb688)) {
			if (u.query('#verifyCode')) return;
			fileType = 'pdf';
			select = "#viewer .page";
			btns.splice(1, 0, new Box('speed', '500'));
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
		} else if (host.includes(domain.jjg)) {
			fileType = ".pdf";
			select = "#docViewer_ViewContainer .fwr-page-invisible";
			// select = "#docViewer_ViewContainer .fwr-page-image img";
		} else if (host.includes(domain.shengtongedu)) {
			fileType = "ppt";
		} else if (host.includes(domain.sacinfo)) {
			fileType = "pdf";
			const md5 = href.split('/').pop(); // 秘钥
			joinDownloadURL('https://hbba.sacinfo.org.cn/hbba_onlineRead_page/' + md5)
			btns.splice(1, 2);
			btns.push(new Box('PPT', '获取地址', 'downtxt()'))
		} else if (host.includes(domain.qzoffice)) {
			fileType = "pdf";
			title = params.get('content') || 'AI-PPT';
			btns.splice(1, 2);
			btns.splice(2, 1);
		} else if (host.includes(domain.nrsis)) {
			fileType = "pdf";
			select = ".page canvas";
		} else if (host.includes(domain.nea)) {
			fileType = "pdf";
			select = ".page canvas";
		} else if (host.includes(domain.nssi)) {
			title = document.title,
				fileType = "pdf";
			select = "#viewer .page";
			dom = u.query('#viewerContainer')
			btns.splice(1, 0, new Box('speed', '500'));
		} else if (host.includes(domain.feishu)) {
			fileType = "pdf";
			dom = u.query('#viewerContainer')
			fileType = 'pdf';
			select = "#viewer .page";
			if (title.includes('PDF')) {
				btns.splice(1, 0, new Box('speed', '500'));
				btns.push(new Box('get-text', '获取文本', 'fullText()'))
			} else {
				btns.splice(1, 5);
				btns.push(new Box('get-build', '打包下载', 'buildDown()'))
			}
		} else if (host.includes(domain.jtysbz) || host.includes(domain.cebpubservice)) {
			fileType = "pdf";
			select = "#viewer .page";
			btns.splice(1, 0, new Box('speed', '500'));
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
		} else if (host.includes(domain.jsjlw)) {
			fileType = "pdf";
			select = "#ctn img";
			dom = u.query('#ctn');
		} else if (host.includes(domain.mwr)) {
			fileType = "pdf";
			select = "#imgdiv img";
			title = u.query('.left_titile').innerText;
		} else if (host.includes(domain.rbtest)) {
			fileType = "pdf";
			select = ".page canvas";
		}
		const query = u.query("#btn_ppt_front_pc"); // 原创
		if (!query) {
			u.gui(btns);
		} else {
			query.click();
		}
		console.log('文件名称：', title);
		console.log('文件类型：', fileType);
	}


	(function() {
		// 移除多余 iframe
		document.querySelectorAll('iframe').forEach(item => {
			item.remove()
		})

		// 清空系统缓存数据
		localStorage.removeItem('listData')
		localStorage.removeItem('length')
		localStorage.removeItem('current')
		localStorage.removeItem('pageData')
		localStorage.removeItem('down')
		localStorage.removeItem('SP_text')

		// 百度服务端渲染
		if (host.includes(domain.wenku)) {
			const {
				readerInfo,
				viewBiz
			} = pageData;
			fileType = viewBiz.docInfo.fileType;
			title = viewBiz.docInfo.aiQueryTitle;
			readerInfoBai = readerInfo;
			const htmlUrls = readerInfo.htmlUrls;
			if (htmlUrls) {
				if (fileType.includes('ppt')) {
					MF_addURL(htmlUrls);
				} else if (fileType.includes('pdf')) {
					let images = [];
					if (htmlUrls.png) {
						images = htmlUrls.png.map(item => {
							return item.pageLoadUrl
						})
					} else {
						images = htmlUrls;
					}
					MF_addURL(images);
				}
				// 文本内容地址保存
				if (htmlUrls.json) {
					let pageLoadUrl = htmlUrls.json.map(item => {
						return item.pageLoadUrl
					})
					MF_addURL(pageLoadUrl, 'pageData');
				}
			}
			// 纯文本类型文件
			if (fileType === "txt") { // 纯文本类型
				let urls = [];
				const {
					docId,
					freePage,
					rsign,
					showPage,
					md5sum
				} = readerInfoBai;
				for (var i = 1; i < showPage + 1; i++) {
					let x = md5sum.substring(1);
					let n = ["pn=" + i, "rn=1", "type=txt", "spr=0", "rsign=" + rsign,
						"callback=wenku_" + i
					].join("&");
					let url = BASE_URL + "/text/" + docId + "?" + x + "&" + n;
					urls.push(url)
				}
				MF_addURL(urls, 'pageData');
			}
			setTimeout(() => {
				baiduCopy()
			}, 500)
			intervalBai = setInterval(() => {
				// 右侧侧边栏
				const vip = u.query('#app-right');
				if (vip) {
					vip.remove()
				}
				const chat = u.query('.wk-chat-modal');
				if (chat) {
					chat.remove()
				}
				// 左侧广告轮播
				const banner = u.query('.banner-wrapper');
				if (banner) {
					banner.remove()
				}
			}, 1000);
		}

	})();

	// load 事件
	(() => {
		// 在这里执行渲染完成后的操作
		console.log('HTML 渲染完成!');
		// 监听子页面加载完成，发送消息
		if (!params.size || !params.get('custom')) {
			init()
		}
	})();


	/**
	 * @description 开始方法，自动预览
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const autoPreview = async () => {
		if (host.includes(domain.book118) && fileType.includes('ppt')) {
			localStorage.setItem('start', '1');
			await autoParsingPPT();
			return false;
		}
		if (host.includes(domain.shengtongedu) && fileType.includes('ppt')) {
			localStorage.setItem('start', '1');
			await autoShengTongParsingPPT();
			return false;
		}
		if (host.includes(domain.mbalib) ||
			host.includes(domain.nssi) ||
			host.includes(domain.feishu) ||
			host.includes(domain.cebpubservice) ||
			host.includes(domain.jtysbz) || (host.includes(domain.gb688) && !u.query('#viewer').style
				.transform)) {
			localStorage.setItem('start', '1');
			localStorage.removeItem('SP_index')
			dom.scrollTop = 0;
			await scrollPreview()
			return false;
		}

		if (interval) return false;
		if (host.includes(domain.docin)) {
			// 起始页码
			startPageNo = document.querySelector("#page_cur").value - 1 || 0;
		} else {
			dom.scrollTop = 0;
		}
		interval = setInterval(() => {
			if (host.includes(domain.book118)) {
				scrollPageArea()
			} else if (host.includes(domain.renrendoc)) {
				scrollPageArea()
			} else if (host.includes(domain.docin)) {
				scrollWinArea()
			} else if (host.includes(domain.wenku)) {
				scrollWinArea()
			} else if (host.includes(domain.doc88)) {
				scrollPageAreaDoc88()
			} else if (host.includes(domain.taodocs)) {
				scrollWinAreaTao()
			} else if (host.includes(domain.gb688)) {
				scrollPageAreaDocGB()
			} else if (host.includes(domain.jjg)) {
				scrollPageAreaJJG()
			} else if (host.includes(domain.nrsis) ||
				host.includes(domain.nea) ||
				host.includes(domain.mwr) ||
				host.includes(domain.jsjlw) ||
				host.includes(domain.rbtest)
			) {
				scrollWinArea()
			}
		}, 500);
	}


	/**
	 * @description 结束方法，停止预览
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const stopPreview = async () => {
		console.log('---------->stopPreview');
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		localStorage.removeItem('start')
	}

	/**
	 * @description 结束方法，停止预览，前置方法
	 * @author Mr.Fang
	 * @time 2024年7月22日
	 */
	const stopBeforePreview = async () => {
		if (host.includes(domain.mwr)) {
			const page_index = u.query('.page_index').innerText;
			const page_total = u.query('.page_total').innerText;
			if (page_index === page_total) {
				stopPreview();
				u.preview(-1);
			} else { // 向上滚动一次
				dom.scrollTo({
					top: dom.scrollTop - 100,
					left: 0,
					behavior: "smooth",
				});
			}
		} else {
			stopPreview();
			u.preview(-1);
		}
	}

	/**
	 * @description 执行文件下载
	 * @author Mr.Fang
	 * @time 2024年2月20日
	 * @param type 文件类型
	 */
	const executeDownload = async (type) => {
		downType = type;
		const down = localStorage.getItem('down');
		console.log('down', down)
		console.log('host', host)
		console.log('downType', downType)
		if (!down) {
			// 结束后续执行的方法
			if (host.includes(domain.book118) || host.includes(domain.shengtongedu)) {
				if (fileType.includes('ppt')) {
					conditionDownload();
				} else {
					await parseImage()
				}
			} else if (host.includes(domain.renrendoc)) {
				await parseImage()
			} else if (host.includes(domain.wenku)) {
				const display = u.query('#app-top-right-tool')?.style.display;
				if (!display || display === 'none') {
					await downimg()
				}
			} else if (host.includes(domain.docin)) {
				if (params.get('toImg')) {
					await parseImage()
				} else {
					await imageToBase64()
					conditionDownload();
				}
			} else if (host.includes(domain.mbalib) ||
				host.includes(domain.feishu) ||
				host.includes(domain.nssi) ||
				host.includes(domain.cebpubservice) ||
				host.includes(domain.jtysbz)
			) {
				conditionDownload();
			} else if (
				host.includes(domain.doc88) ||
				host.includes(domain.taodocs) ||
				host.includes(domain.nrsis) ||
				host.includes(domain.nea) ||
				host.includes(domain.rbtest)
			) {
				await imageToBase64()
				conditionDownload();
			} else if (host.includes(domain.deliwenku) ||
				host.includes(domain.cxk) ||
				host.includes(domain.jinchutou) ||
				host.includes(domain.mayiwenku) ||
				host.includes(domain.dugen) ||
				host.includes(domain.iask) ||
				host.includes(domain.chochina) ||
				host.includes(domain.weizhuan) ||
				host.includes(domain.so) ||
				host.includes(domain.sacinfo)
			) {
				await downimg()
			} else if (host.includes(domain.gb688)) {
				if (u.query('#viewer').style.transform) { // bg
					await downloadGBImage();
				} else {
					conditionDownload();
				}
			} else if (host.includes(domain.jsjlw)) {
				await parseImage()
			} else if (host.includes(domain.jjg)) {
				await downloadElement()
				conditionDownload();
			} else if (host.includes(domain.qzoffice)) {
				await handleQzoffice();
				conditionDownload();
			} else if (host.includes(domain.mwr)) {
				await downloadImage();
				conditionDownload();
			}
		} else {
			conditionDownload();
		}
	}
	// 飞书打包下载
	const buildDown = async () => {
		const styles = [...u.queryAll('style')].map(div => div.outerHTML).join('\n');
		if (title.includes('excel')) {
			const container = u.query('.container').innerHTML;
			const content =
				`<!DOCTYPE html><html><head><meta charset="utf-8">${styles}</head><body style="overflow: auto;">${container}</body></html>`
			const htmlBlob = new Blob([content], {
				type: "text/html;charset=utf-8"
			});
			zipWriter.add('index.html', new zip.BlobReader(htmlBlob))
			zipWriter.add('index.txt', new zip.TextReader(u.query('.container').innerText))
		} else if (title.includes('txt')) {
			const container = u.query('#scroll-container').innerHTML;
			const content =
				`<!DOCTYPE html><html><head><meta charset="utf-8">${styles}</head><body>${container}</body></html>`
			const htmlBlob = new Blob([content], {
				type: "text/html;charset=utf-8"
			});
			zipWriter.add('index.html', new zip.BlobReader(htmlBlob))
			zipWriter.add('index.txt', new zip.TextReader(u.query('#scroll-container').innerText))
		}
		await u.sleep(500)
		downzip();
		u.preText('下载完成')
	}

	/**
	 * 根据指定条件下载文件
	 */
	const conditionDownload = () => {
		if (downType === 1) {
			downpdf()
			localStorage.setItem('down', '1')
		} else if (downType === 2) {
			downzip()
			if (!host.includes(domain.qzoffice)) // 排除 qz
				localStorage.setItem('down', '1')
		}
		u.preText('下载完成')
	}

	// 滚动指定 Window
	const scrollWinArea = () => {
		before();
		const scrollTop = dom.scrollTop;
		const height = dom.scrollHeight - dom.clientHeight;
		if (height <= scrollTop) {
			stopBeforePreview();
		} else {
			let top = scrollTop + 500;
			dom.scrollTo({
				top: top,
				left: 0,
				behavior: "smooth",
			});
			u.preview(top, height);
		}
	}

	/**
	 * @description 判断 dom 是否在可视范围内
	 * @author Mr.Fang
	 * @time 2024-6-25
	 * @param {HTMLElement} el
	 */
	const isElementInViewport = (el) => {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		);
	}

	/**
	 * @description 图片添加到 zip 或 pdf
	 * @author Mr.Fang
	 * @time 2024-6-25
	 * @see http://raw.githack.com/MrRio/jsPDF/master/docs/module-addImage.html#~addImage
	 * @param {HTMLImageElement | HTMLCanvasElement | Uint8Array | RGBAData} imageData
	 * @param {Blob} blob
	 * @param {Number} i 下标
	 * @param {Number} width 宽 
	 * @param {Number} height 高
	 * @param {Boolean} natural 原始高度宽度 true 原始尺寸 false A4
	 */
	const saveImageAndPDF = (imageData, blob, i, width, height, natural = false) => {
		let dir = 'p';
		let target_w = pdf_w;
		let target_h = pdf_h;
		if (width > height) {
			dir = 'l';
			target_h = pdf_w;
			target_w = pdf_h;
		}
		if (natural) {
			target_h = height * pdf_ratio;
			target_w = width * pdf_ratio;
		} else {
			target_h = target_h;
			target_w = target_w;
		}

		zipWriter.add(`${i}.png`, new zip.BlobReader(blob));
		doc.addPage([target_w, target_h], dir);
		doc.addImage(imageData, 'JPEG', 0, 0, target_w, target_h, i, 'FAST')
		if (doc.internal.pages[1].length === 2) {
			doc.deletePage(1); // 删除空白页
		}
	}

	/**
	 * @description 保存数据
	 * @author Mr.Fang
	 * @time 2024-6-25
	 * @param {Number} i 下标
	 * @param {HTMLElement} imageData 图片对象
	 * @param {HTMLElement} textLayer 文本对象
	 */
	const previewSave = async (i, imageData, textLayer) => {
		const {
			blob,
			width,
			height
		} = await MF_CanvasToBase64(imageData);
		saveImageAndPDF(imageData, blob, i, width, height, false)
		//获取文本内容
		let texts = JSON.parse(localStorage.getItem('SP_text')) || [];
		texts.push(fileType.includes('doc') ? textLayer.innerText : textLayer.textContent);
		localStorage.setItem('SP_text', JSON.stringify(texts))
		// 更新下标
		localStorage.setItem('SP_index', i + 1);
	}

	/**
	 * @description 预览&下载
	 * @author Mr.Fang
	 * @time 2024-6-25
	 */
	const scrollPreview = async () => {
		if (!localStorage.getItem("start")) {
			u.preview(-1, null, "已终止");
			return;
		}
		before();
		const i = Number(localStorage.getItem('SP_index')) || 0;
		const childrens = u.queryAll(select);
		const current = childrens[i];
		const length = childrens.length;
		// 如果当前对象在可视范围内，进行保存添加
		const imageData = current.querySelector('canvas');
		const textLayer = current.querySelector('.textLayer');
		if (isElementInViewport(current) && imageData && textLayer) {
			await previewSave(i, imageData, textLayer)
			if (i !== length - 1)
				childrens[i + 1].scrollIntoView({
					behavior: "smooth"
				});
		} else {
			current.scrollIntoView({
				behavior: "smooth"
			});
		}
		u.preview(i, length);
		if (i !== length - 1) {
			let speed = 500,
				MF_speed = Number(u.query('#MF_speed').innerText);
			if (MF_speed > 0) {
				speed = MF_speed
			} else {
				u.query('#MF_speed').innerText = 500
			}
			setTimeout(() => {
				console.log(speed, 'ms 后执行');
				scrollPreview()
			}, speed)
		} else {
			console.log('执行结束');
			u.preview(-1);
			localStorage.removeItem('SP_index')
			localStorage.removeItem('start')
		}
	}

	// 滚动指定 Window
	const scrollWinAreaTao = () => {
		const scrollTop = dom.scrollTop;
		const height = dom.scrollHeight - dom.clientHeight;
		const fc2e = u.query('.fc2e');
		let end = 0;
		const images = u.queryAll(select);
		const length = images.length;
		for (let i = 0; i < length; i++) {
			let item = images[i];
			const {
				top
			} = item.getBoundingClientRect();
			if (item.width === 300 || item.height == 150) {
				end = 1;
				dom.scrollTo({
					top: dom.scrollTop + top,
					left: 0,
					behavior: "smooth",
				});
				u.preview(dom.scrollTop + top, height);
				break;
			}
		}
		if (end === 0) {
			if (!fc2e) {
				stopPreview();
				u.preview(-1);
			} else {
				before()
			}
		}
	}
	// 滚动指定区域
	const scrollPageArea = () => {
		before();
		const clientHeight = dom.clientHeight;
		let end = 0;
		const images = u.queryAll(select);
		const length = images.length;
		for (let i = 0; i < length; i++) {
			let item = images[i];
			const {
				top
			} = item.getBoundingClientRect();
			if (item instanceof HTMLImageElement) {
				if (!item.src && !item.getAttribute('data-src')) {
					end = 1;
					dom.scrollTo({
						top: dom.scrollTop + top,
						left: 0,
						behavior: "smooth",
					});
					u.preview(i + 1, length);
					break;
				}
			} else if (item instanceof HTMLDivElement) {
				end = 1;
				dom.scrollTo({
					top: dom.scrollTop + top,
					left: 0,
					behavior: "smooth",
				});
				u.preview(i + 1, length);
				break;
			}
		}
		if (end === 0) {
			u.preview(-1);
			stopPreview();
		}
	}

	// 道客滚动函数
	const scrollPageAreaDoc88 = () => {
		before();
		const clientHeight = dom.clientHeight;
		let end = 0;
		const images = u.queryAll(select);
		const length = images.length;
		const startNum = document.querySelector("#pageNumInput").value - 1 || 0;
		for (let i = startNum; i < length; i++) {
			let item = images[i];
			const {
				top
			} = item.getBoundingClientRect();
			let previousElementSibling = item.previousElementSibling.previousElementSibling;
			let fs = u.attr(item, 'fs');
			let t = previousElementSibling.innerText;
			if (t.length !== 0) {
				end = 1;
				item.scrollIntoView({
					behavior: "smooth"
				});
				u.preview(i + 1, length);
				break;
			}
		}
		if (end === 0) {
			u.preview(-1);
			stopPreview();
		}
	}

	const scrollPageAreaDocGB = () => {
		// 100% 预览
		if (u.query('#scaleSelect').selectedIndex < 9) {
			u.query('#zoomIn').click()
		}

		const clientHeight = dom.clientHeight;
		let end = 0;
		const els = u.queryAll(select);
		const length = els.length;
		for (let i = 0; i < length; i++) {
			let item = els[i];
			if (u.attr(item, 'bg')) {
				end = 1;
				item.scrollIntoView({
					behavior: "smooth"
				});
				u.preview(i + 1, length);
				break;
			}
		}
		if (end === 0) {
			u.preview(-1);
			stopPreview();
		}
	}

	const scrollPageAreaJJG = () => {
		let end = 0;
		// 放大
		if (u.query('.fwr-rb-zoom-box input').value === '100%') {
			u.query('.fwr-rb-bottom-zoomin').click();
			return;
		}
		const pages = u.query(".fwr-rb-bottom-tabs input").value.split('/');
		const els = u.queryAll(select);
		const length = els.length;
		for (let i = Number(pages[0].trim()) - 1; i < length; i++) {
			const item = els[i];
			const page = item.querySelector('.fwr-page-tile')
			if (!page) {
				end = 1;
				u.query('.fwr-rb-bottom-page-next').click();
				u.preview(i + 1, length);
				break;
			}
		}
		if (end === 0) {
			u.preview(-1);
			stopPreview();
		}
	}

	/**
	 * canvas 转 blob 对象
	 * 导出全部按 A4 格式导出，方便兼容大部分文档，支持横竖格式
	 */
	const imageToBase64 = async () => {
		const images = u.queryAll(select);
		const length = images.length;
		for (let i = 0; i < length; i++) {
			const item = images[i];
			if (host.includes(domain.doc88)) {
				let previousElementSibling = item.previousElementSibling.previousElementSibling;
				let t = previousElementSibling.innerText;
				if (t.length !== 0) {
					continue;
				}
			}
			let {
				blob,
				width,
				height
			} = await MF_CanvasToBase64(item);
			saveImageAndPDF(item, blob, i, width, height, host.includes(domain.doc88) || host.includes(
				domain.rbtest))
			await u.preview(i + 1, length);
		}
		console.log('处理完成', length);
	}

	/**
	 * @description 原创力 PPT 解析
	 * @author Mr.Fang
	 * @time 2024年2月21日
	 */
	const autoParsingPPT = async () => {
		if (!localStorage.getItem("start")) {
			u.preview(-1, null, "已终止");
			return;
		}
		const page = Number(u.query('#PageIndex').innerText);
		const total = Number(u.query('#PageCount').innerText);
		const childNodes = u.query("#view").childNodes;
		const count = childNodes.length;
		const max_index = page - 1;
		const current = u.query("#view" + max_index);
		// 动作数量
		const a_len = u.queryAll(`#view${max_index} #animt${max_index}>div`).length;
		if (a_len !== 0) {
			await u.sleep(1000);
		}
		const bgs = MF_RecursiveParsingImages(current);
		await new Promise((resolve) => {
			html2canvas(current, {
				useCORS: true,
				logging: false,
			}).then(function(canvas) {
				let fileName = max_index + "_" + a_len + ".png";
				// 将canvas转换为图片并下载.
				canvas.toBlob(blob => {
						zipWriter.add(fileName, new zip.BlobReader(blob));
					},
					"image/png",
					1);
				// 添加PDF
				// 794px*1123px ;
				doc.addPage([canvas.width * pdf_ratio, canvas.height * pdf_ratio], 'l');
				doc.addImage(canvas, 'JPEG', 0, 0, canvas.width * pdf_ratio, canvas
					.height *
					pdf_ratio, max_index + "_" + a_len, 'FAST')
				if (max_index === 1) {
					doc.deletePage(1);
				}
				resolve();
			});
		})
		if (a_len === 0) {
			try {
				const detail = bgs.map((item, i) => {
					return zipWriter.add(max_index + "/" + i + ".png", new zip.HttpReader(
						item));
				});
				await Promise.all(detail);
				zipWriter.add(max_index + "/" + "文本描述.txt", new zip.TextReader(current.innerText));
			} catch (e) {
				console.error(e);
			}
		}
		u.preview(page, total);
		const pageNext = u.query('#pageNext');
		const btmRight = u.query('.btmRight');

		if (page !== total) {
			btmRight.click();
			await autoParsingPPT();
		}
	}

	/**
	 * 键盘事件 ←左 右→
	 */
	const triggerKeyEvent = (element, key = 'right', type) => {
		var event = new KeyboardEvent(type, {
			bubbles: true,
			cancelable: true,
			key: key,
			keyCode: key === 'letf' ? 37 : 39, // 37是左箭头，39是右箭头
			which: key === 'letf' ? 37 : 39
		});
		element.dispatchEvent(event);
	}

	/**
	 * @description 盛通教育 PPT 解析
	 * @author Mr.Fang
	 * @time 2024年5月10日
	 */
	const autoShengTongParsingPPT = async () => {
		if (!localStorage.getItem("start")) {
			u.preview(-1, null, "已终止");
			return;
		}
		const current = u.query('#playerView > div:nth-child(2)');
		current.style.transform = 'none'
		const {
			total,
			page
		} = await new Promise((resolve) => {
			const childNodes = document.querySelector(
				"#playerView > div:nth-child(2) > div:nth-child(1) > div").childNodes;
			const total = childNodes.length - 1;
			let page = 1;
			childNodes.forEach((item, index) => {
				if (item.childNodes.length > 0) {
					page = index;
				}
			})
			resolve({
				total,
				page
			})
		})
		const max_index = page - 1;

		// 动作数量
		let a_len = 0;
		if (max_index === Number(localStorage.getItem('currentPage'))) {
			a_len = Number(localStorage.getItem('currentPageIndex')) + 1;
		}
		if (a_len !== 0) {
			await u.sleep(1000);
		}
		const bgs = MF_RecursiveParsingImages(current);
		await new Promise((resolve) => {
			html2canvas(current, {
				useCORS: true,
				logging: false,
			}).then(function(canvas) {
				// 将canvas转换为图片并下载.
				let data = canvas.toDataURL();

				let fileName = `${max_index}_${a_len}.png`;
				zipWriter.add(fileName, new zip.Data64URIReader(data));
				// 添加PDF
				// 794px*1123px ;
				doc.addPage([canvas.width * pdf_ratio, canvas.height * pdf_ratio], 'l');
				doc.addImage(data, 'JPEG', 0, 0, canvas.width * pdf_ratio, canvas
					.height *
					pdf_ratio, max_index + "_" + a_len, 'FAST')
				if (max_index === 1) {
					doc.deletePage(1);
				}
				localStorage.setItem('currentPage', max_index);
				localStorage.setItem('currentPageIndex', a_len);
				resolve();
			});
		})
		if (a_len === 0) {
			try {
				const detail = bgs.map((item, i) => {
					return zipWriter.add(max_index + "/" + i + ".png", new zip.HttpReader(
						item));
				});
				await Promise.all(detail);
				zipWriter.add(max_index + "/" + "文本描述.txt", new zip.TextReader(current.innerText));
			} catch (e) {
				console.error(e);
			}
		}
		u.preview(page, total);

		if (page !== total) {
			triggerKeyEvent(document.body, 'right', 'keydown');
			triggerKeyEvent(document.body, 'right', 'keyup');
			await autoShengTongParsingPPT();
		}
	}

	/**
	 * @description 轻竹办公
	 * @author Mr.Fang
	 * @time 2024年5月17日
	 */
	const handleQzoffice = async () => {
		localStorage.removeItem('down')
		// 递归遍历 DOM 节点
		function traverseDOM(node, callback) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				callback(node); // 调用回调函数处理当前节点
				node = node.firstChild; // 获取第一个子节点
				while (node) {
					traverseDOM(node, callback); // 递归遍历子节点
					node = node.nextSibling; // 获取下一个兄弟节点
				}
			}
		}
		// 查找具有指定属性的 <image> 元素
		function findImagesWithAttribute(node) {
			var images = [];
			traverseDOM(node, function(element) {
				if (element.tagName === 'image') {
					images.push(element);
				}
			});
			return images;
		}
		const template = document.getElementById("templateCanvas").cloneNode(true);
		template.style.display = 'block';
		template.style.height = '0px';
		template.style.position = 'relative';
		template.style.display = 'block';
		// 在整个文档中查找具有指定属性的 <image> 元素
		const images = findImagesWithAttribute(template);
		const imageArray = [];
		// 打印找到的元素
		const blobs = [];
		try {
			images.forEach(async (image, i) => {
				const animVal = image.href.animVal;
				let is = imageArray.filter(item => item.href === animVal);
				if (animVal && is.length === 0) {
					image.setAttribute('xlink:href', `./images/${i}.png`)
					imageArray.push({
						name: `./images/${i}.png`,
						href: animVal
					})
					const {
						blob,
						width,
						height
					} = await MF_ImageToBase64(animVal);
					zipWriter.add(`images/${i}.png`, new zip.BlobReader(blob));
				} else {
					image.setAttribute('xlink:href', is[0].name)
				}
			});
		} catch (e) {
			console.log(e);
		}
		const avgArray = document.querySelectorAll(".child-element svg");
		let content = [];
		const outerHTML = template.outerHTML;
		content.push(outerHTML);
		for (let i = 0; i < avgArray.length; i++) {
			const avgArrayElement = avgArray[i];
			const cloneNode = avgArrayElement.cloneNode(true);
			cloneNode.style.position = "static";
			cloneNode.style.width = "100%";
			cloneNode.style.height = "100%";
			cloneNode.style.transform = "none";
			const html = cloneNode.outerHTML;
			content.push(
				"<div classname=\"page-view\" style=\"width: 1200px; height: 820px;\">" +
				html + "</div>");
		}
		// 添加 html
		const htmlBlob = new Blob(['<!DOCTYPE html>' + content.join('\n\n')], {
			type: "text/html;charset=utf-8"
		});
		zipWriter.add('index.html', new zip.BlobReader(htmlBlob))
		zipWriter.add('index.txt', new zip.TextReader(document.querySelector('.texts').innerText))
	}

	/**
	 * @description 解析图片 [src]
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const parseImage = async () => {
		const images = u.queryAll(select);
		if (!images.length) {
			u.log('------>parseImage 暂无数据');
			return;
		}
		const listData = [];
		images.forEach((item) => {
			let src = u.attr(item, 'data-src') || item.src;
			if (src.includes('http:') && location.protocol === 'https') {
				src = src.replace("http:", "https:")
			} else if (src.startsWith("//")) {
				src = "https:" + src;
			}
			if (src) {
				const page = u.attr(item, 'data-page') || u.attr(item.parentElement, 'data-id');
				if (host.includes(domain.docin)) {
					const curr = Number(item.parentElement.id.split('_').pop());
					if (curr >= startPageNo + 1) {
						listData.push({
							page,
							src
						})
					}
				} else {
					listData.push({
						page,
						src
					})
				}
			}
		})
		const store = JSON.stringify(listData);
		u.logt(listData)
		u.log('size:' + images.length);
		GM_setValue('listData', store);
		localStorage.setItem('listData', store)
		u.log('--------->downimg');
		localStorage.removeItem('current')
		downimg()
	}

	/**
	 * @description 下载图片
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const downimg = async () => {
		const images = JSON.parse(GM_getValue('listData'));
		const length = images.length;
		localStorage.setItem('length', length);
		let current = Number(localStorage.getItem("current")) || 0;
		u.log('downimg----------->current:' + current)
		for (let index = current; index < length; index++) {
			const image = images[index];
			const src = image.src;
			if (src.includes(host)) { // 当前域
				const {
					uint8,
					blob,
					width,
					height
				} = await MF_ImageToBase64(src);
				if (fileType.includes('ppt') || width > height) {
					doc.addPage([width * pdf_ratio, height * pdf_ratio], 'l');
					doc.addImage(uint8, 'JPEG', 0, 0, width * pdf_ratio, height * pdf_ratio, index,
						'FAST')
				} else {
					doc.addPage();
					doc.addImage(uint8, 'JPEG', 0, 0, pdf_w, pdf_h, index, 'FAST')
				}
				if (index === 1) {
					doc.deletePage(1);
				}
				zipWriter.add(index + ".png", new zip.BlobReader(blob));
				current = index;
				await u.preview(current, length);
			} else {
				const url = new URL(src);
				const attrId = url.host.replaceAll(".", "")
				const query = document.getElementById('#' + attrId);
				if (query) { // 框架是否存在
					parentMessage(src, "#" + attrId);
				} else {
					const el = u.createEl("#" + attrId, 'iframe');
					el.src = url.origin + '?custom=true';
					el.style.visibility = "hidden";
					document.body.append(el);
				}
				localStorage.setItem('current', index + "");
				u.preview(current, length);
				break;
			}
		}
		// 非当前域下载文件下标会多加一个数值
		if (localStorage.getItem("current")) {
			current -= 1;
		}
		console.log('current', current);
		if (current === length - 1) {
			conditionDownload();
		}
	}

	/**
	 * 图片下载 
	 */
	const downloadImage = async () => {
		const images = [...u.queryAll(select)];
		const len = images.length;
		for (let i = 0; i < len; i++) {
			const image = images[i]
			const canvas = await MF_ImageToCanvas(image);
			const {
				blob,
				width,
				height
			} = await MF_CanvasToBase64(canvas);
			saveImageAndPDF(canvas, blob, i, width, height, false);
			u.preview(i, len);
		}
	}

	const downloadElement = async () => {
		const nodes = u.queryAll(select + ' .fwr-page-tile');
		const len = nodes.length;
		for (let i = 0; i < len; i++) {
			const node = nodes[i]
			const {
				blob,
				canvas
			} = await MF_ImageStitchingToCanvas(node);
			saveImageAndPDF(canvas, blob, i, canvas.width, canvas.height, true);
			u.preview(i, len);
		}
	}

	const MF_ImageToCanvas = (image) => {
		return new Promise((resolve, reject) => {
			const canvas = u.createEl('', 'canvas');
			const {
				naturalWidth: width,
				naturalHeight: height
			} = image;
			canvas.width = width;
			canvas.height = height;
			let ctx = canvas.getContext('2d');
			ctx.fillStyle = '#FFFFFF';
			ctx.fillRect(0, 0, width, height);
			ctx.drawImage(image, 0, 0, width, height);
			resolve(canvas);
		})
	}

	/**
	 * bg pdf 下载
	 */
	const downloadGBImage = async () => {
		const els = u.queryAll(select);
		const length = els.length;
		for (let i = 0; i < length; i++) {
			let item = els[i];
			const {
				blob,
				canvas
			} = await MF_ImagePositionToBase64(item);
			if (!blob) {
				continue;
			}
			saveImageAndPDF(canvas, blob, i, canvas.width, canvas.height, true)
			await u.preview(i + 1, length);
		}
		// 非当前域下载文件下标会多加一个数值
		conditionDownload();
	}


	/**
	 * @param {String} url 请求地址
	 */
	const requestGet = (url) => {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			// xhr.setRequestHeader("Content-Type", "application/json");
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 206 || xhr.status === 200) {
						try {
							let responseText = xhr.responseText;
							let result = responseText.substring(responseText.indexOf('\(') + 1,
								responseText.length - 1);
							u.log(result)
							resolve(JSON.parse(result));
						} catch (e) {
							reject(e);
						}
					} else {
						reject(new Error(`HTTP status code ${xhr.status}`));
					}
				}
			};
			xhr.onerror = function() {
				reject(new Error("Network error"));
			};
			xhr.send();
		});
	}

	/**
	 * 复制到剪切板
	 * @param text
	 */
	const copyToClipboard = (text) => {
		var input = document.createElement("textarea");
		input.value = text;
		document.body.appendChild(input);
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);
	}

	/**
	 * @description 通过接口获取文本内容
	 * @author Mr.Fang
	 * @time 2024年2月20日
	 */
	const fullText = async () => {
		let text = '';
		if (host.includes(domain.wenku)) {
			const pageData = JSON.parse(localStorage.getItem('pageData'));
			if (pageData) {
				for (var i = 0; i < pageData.length; i++) {
					let url = pageData[i].src;
					let resultData = await requestGet(url);
					if (resultData instanceof Array) {
						text += resultData[0].parags[0].c;
					} else {
						resultData.body.forEach(item => {
							if (typeof item.c === "string") {
								text += item.c;
							}
						})
					}
				}
			} else {
				text = u.query('.ql-editor').innerText;
			}

		} else if (host.includes(domain.mbalib) ||
			host.includes(domain.feishu) ||
			host.includes(domain.cebpubservice) ||
			host.includes(domain.jtysbz)) {
			const texts = JSON.parse(localStorage.getItem("SP_text")) || []
			for (let i = 0; i < texts.length; i++) {
				let t = texts[i];
				text += `\n\n====第${i+1}页====\n\n` + t;
			}
			localStorage.removeItem('SP_text')
		} else if (host.includes(domain.doc88)) {
			// const texts = Core.api._VM;
			const texts = Core.api._bf;
			if (!texts) {
				alert('没有文本内容')
				return
			}
			for (let i = 0; i < texts.length; i++) {
				text += `\n\n====第${i+1}页====\n\n` + texts[i];
			}
		} else if (host.includes(domain.taodocs)) {
			const texts = u.queryAll('#canvas .textLayer');
			for (let i = 0; i < texts.length; i++) {
				let t = texts[i];
				text += `\n\n====第${i+1}页====\n\n`;
				text += t.innerText;
			}
		}
		MF_ExportTxt(text, `${title}.txt`);
	}

	/**
	 * @description 下载压缩包，包含图片
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const downzip = () => {
		zipWriter.close().then(blob => {
			GM_download(URL.createObjectURL(blob), `${title}.zip`);
			URL.revokeObjectURL(blob);
		}).catch(error => {
			console.error(error);
		});
	}

	/**
	 * @description 下载 PDF
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const downpdf = () => {
		// 下载 PDF 文件
		doc.save(`${title}.pdf`, {
			returnPromise: true
		});
	}

	/**
	 * @description 下载 txt 文本
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const downtxt = () => {
		const images = JSON.parse(GM_getValue('listData'));
		const text = images.map(item => {
			return item.src
		}).join("\n");
		MF_ExportTxt(text, `${title}.txt`);
	}

	/**
	 * @description 递归加载子节点，获取子节点背景，img 属性值
	 * @author Mr.Fang
	 * @time 2024年1月20日18:05:49
	 * @param children
	 * @returns {*[]}
	 */
	const MF_RecursiveParsingImages = (children) => {
		const list = [];
		if (children.childNodes.length) {
			children.childNodes.forEach(item => {
				if (item || item instanceof HTMLImageElement) {
					if (item instanceof HTMLImageElement) { // 图片
						let src = item.src;
						list.push(src);
					} else if (item.style) {
						let bgi = item.style.backgroundImage;
						if (bgi && bgi !== 'initial' && bgi.includes('url')) {
							let src = bgi.substring(bgi.indexOf("\"") + 1, bgi.lastIndexOf(
								"\""));
							src = src.indexOf("/") === 0 ? src : "/" + src;
							list.push(origin + src);
						}
					}
					if (item.childNodes.length) {
						const images = MF_RecursiveParsingImages(item);
						list.push(...images);
					}
				}
			})
		}
		return list;
	}

	/**
	 * @description 获取文件后缀名
	 * @author Mr.Fang
	 * @time 2024年6月17日16:31:05
	 * @param {name} data 文件名
	 * @returns {String} suffix 后缀 ，默认 pdf
	 */
	const getFileNameSuffix = (name) => {
		const last = name.lastIndexOf(".");
		return last > 0 ? name.substring(last + 1).toLocaleLowerCase() : 'pdf';
	};

	/**
	 * @description 导出 txt 文件
	 * @author Mr.Fang
	 * @time 2024年1月20日18:05:49
	 * @param {Object} data 数据
	 * @param {Object} filename 文件名
	 */
	const MF_ExportTxt = (data, filename) => {
		const csvContent = "data:text/txt;charset=utf-8," + data;
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", filename);

		// 点击链接以下载文件
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	/**
	 * @description 加载图片
	 * @author Mr.Fang
	 * @time 2024年1月20日18:05:49
	 * @param src 图片地址
	 * @returns {Promise<unknown>}
	 */
	const MF_ImageToBase64 = (src) => {
		return new Promise((resolve, reject) => {
			// 1、创建 Image 对象
			const image = new Image();
			// 2、onload 加载成功触发
			image.onload = function() {
				try {
					let canvas = u.createEl('', 'canvas');
					const {
						naturalWidth: width,
						naturalHeight: height
					} = image;
					canvas.width = width;
					canvas.height = height;
					let ctx = canvas.getContext('2d');
					ctx.fillStyle = '#FFFFFF';
					ctx.fillRect(0, 0, width, height);
					ctx.drawImage(image, 0, 0, width, height);
					canvas.toBlob(async blob => {
							// canvas 转 blob 对象
							// blob 转 uint8 、PDF 需要 uint8 对象
							const uint8 = await MF_BlobToUint8Array(blob)
							resolve({
								uint8,
								blob,
								width,
								height
							});
						},
						"image/png",
						1, );
				} catch (e) {
					reject(e);
				}
			}
			image.onerror = reject;
			image.src = src;
		})
	}

	/**
	 * @description 基于背景图片定位，转画布
	 * @author Mr.Fang
	 * @time 2024年3月13日
	 * @param src 图片地址
	 * @returns {Promise<unknown>}
	 */
	const MF_ImagePositionToBase64 = (el) => {
		const base_gb = "http://c.gb688.cn/bzgk/gb/";
		const style = el.style;
		const cw = Number(style.width.replace('px', ''));
		const ch = Number(style.height.replace('px', ''));
		// 所有子节点
		const childrens = el.children;
		// 背景图片地址处理
		if (childrens.length < 2) {
			return new Promise((resolve, reject) => {
				resolve({
					blob: null
				})
			})
		}
		const imageUrl = childrens[0].style.backgroundImage;
		const fullUrl = base_gb + imageUrl.substring(5, imageUrl.length - 2);
		if (!imageUrl) {
			return new Promise((resolve, reject) => {
				resolve({
					blob: null
				})
			})
		}
		return new Promise((resolve, reject) => {
			// 1、创建 Image 对象
			const image = new Image();
			// 2、onload 加载成功触发
			image.onload = function() {
				try {
					let canvas = u.createEl('', 'canvas');
					canvas.width = cw;
					canvas.height = ch;
					// 获取上下文对象
					const ctx = canvas.getContext('2d');
					ctx.fillStyle = "#fff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					for (var i = 0; i < childrens.length; i++) {
						const child = childrens[i];
						const pos = child.style.backgroundPosition.split(' ');
						const coord = child.className.split('-');
						const dx = Number(coord[1]);
						const dy = Number(coord[2]);
						const sx = Math.abs(pos[0].replace('px', ''));
						const sy = Math.abs(pos[1].replace('px', ''));
						const rect = child.getBoundingClientRect();
						const {
							width: sw,
							height: sh
						} = rect;
						ctx.drawImage(image, sx, sy, sw, sh, dx * sw, dy * sh, sw, sh);
						if (i === childrens.length - 1) {
							// 转 base64 输出
							canvas.toBlob(
								(blob) => {
									resolve({
										blob,
										canvas
									});
								},
								"image/png",
								1,
							);
						}
					}
				} catch (e) {
					reject(e);
				}
			}
			image.onerror = reject;
			image.src = fullUrl;
		})
	}

	const MF_ImageStitchingToCanvas = (node) => {

		return new Promise((resolve, reject) => {
			try {
				// 获取最后一个分辨率 / tiles-layer-125 分辨率/ div/ 行 div [img]
				const children = node.lastElementChild.children;
				const firstNode = children[0];
				// 计算画布宽度
				const cwidth = [...firstNode.querySelectorAll('img')].reduce((start, item) => start +
					item.width, 0);
				const cheight = children.length * firstNode.querySelector('img').height;
				const canvas = u.createEl('', 'canvas');
				canvas.width = cwidth;
				canvas.height = cheight;
				// 获取上下文对象
				const ctx = canvas.getContext('2d');
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				// 拼接
				for (let i = 0; i < children.length; i++) {
					const chils = [...children[i].querySelectorAll('img')];
					let iw = 0;
					for (let j = 0; j < chils.length; j++) {
						const {
							width,
							height
						} = chils[j];
						ctx.drawImage(chils[j], iw, i * height, width, height);
						iw += width
					}
				}
				canvas.toBlob(
					(blob) => {
						resolve({
							blob,
							canvas,
						});
					},
					"image/png",
					1,
				);
			} catch (e) {
				//TODO handle the exception
				reject(e)
			}

		})
	}

	/**
	 * @description 图片拼接转 blob
	 * @author Mr.Fang
	 * @time 2024年6月5日
	 * @param el 节点对象
	 * @returns {Promise<blob>}
	 */
	const MF_ImageJoinToBlob = (el) => {
		return new Promise((resolve, reject) => {
			const children = el.children;
			const {
				naturalWidth,
				naturalHeight
			} = children[0];
			// 1、创建画布
			let canvas = u.createEl('', 'canvas');
			canvas.width = naturalWidth * 6;
			canvas.height = naturalHeight;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			// 2、获取所有图片节点
			const listData = []
			for (var i = 0; i < children.length; i++) {
				const img = children[i];
				const left = img.style.left.replace('px', '')
				listData.push({
					index: i,
					left: Number(left)
				})
			}
			listData.sort((a, b) => a.left - b.left);
			// 3、遍历绘制画布
			for (var i = 0; i < listData.length; i++) {
				const img = children[listData[i].index];
				ctx.drawImage(img, i * naturalWidth, 0, naturalWidth, naturalHeight);
			}
			// 4、导出
			canvas.toBlob(
				(blob) => {
					resolve({
						blob,
						canvas,
					});
				},
				"image/png",
				1,
			);
		})
	}

	/**
	 * @description 将 blob 对象转 uint8Array
	 * @author Mr.Fang
	 * @time 2024年5月27日
	 * @param {Object} blob 图片对象
	 * @returns {Promise<Uint8Array>}
	 */
	const MF_BlobToUint8Array = (blob) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.onload = function() {
				resolve(new Uint8Array(this.result));
			};
			fileReader.onerror = function(error) {
				reject(error);
			};
			fileReader.readAsArrayBuffer(blob);
		});
	}

	/**
	 * @description 画布输出 blob 对象
	 * @author Mr.Fang
	 * @time 2024年1月20日18:05:49
	 * @param src 图片地址
	 * @returns {Promise<Object>}
	 */
	const MF_CanvasToBase64 = (canvas) => {
		return new Promise((resolve, reject) => {
			const {
				width,
				height
			} = canvas;
			canvas.toBlob(
				(blob) => {
					resolve({
						blob,
						width,
						height
					});
				},
				"image/png",
				1,
			);
		})
	}
})();
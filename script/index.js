// ==UserScript==
// @name         【最强无套路脚本】kill-doc你能看见多少我能下载多少&下载公开免费的PPT、PDF、DOC、TXT等文件
// @namespace    http://tampermonkey.net/
// @homepage	 https://github.com/systemmin/kill-doc
// @version      1.9
// @description  百度|原创力|人人|360文库|豆丁|豆丁建筑|道客|MBA智库|得力|七彩学科|金锄头|爱问|蚂蚁|读根网|搜弘|微传网|淘豆网|GB|JJG|行业标准|轻竹办公|等公开免费文档下载
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
// @match        http://jjg.spc.org.cn/resmea/view/stdonline
// @match        https://pro-img-brtm.baijiayun.com/*
// @match        https://hbba.sacinfo.org.cn/attachment/onlineRead/*
// @match        https://www.qzoffice.com/edit*
// @require      https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jspdf/2.4.0/jspdf.umd.min.js
// @require      https://unpkg.com/@zip.js/zip.js@2.7.34/dist/zip.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
// @icon         https://dtking.cn/favicon.ico
// @run-at 		document-idle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_download
// @grant       GM_notification
// @grant        unsafeWindow
// @license      Apache-2.0
// ==/UserScript==

(function() {
	'use strict';
	let MF =
		'#MF_fixed{position:fixed;top:50%;transform:translateY(-50%);right:20px;gap:20px;flex-direction:column;z-index:2147483647;display:flex}';
	MF +=
		'.MF_box{padding:10px;cursor:pointer;border-color:rgb(0,102,255);border-radius:5px;background-color:white;color:rgb(0,102,255);margin-right:10px;box-shadow:rgb(207,207,207) 1px 1px 9px 3px}.MF_active{color: green;}';
	MF +=
		'@media print{html{height:auto !important}body{display:block !important}#app-left{display:none !important}#app-right{display:none !important}#MF_fixed{display:none !important}.menubar{display:none !important}.top-bar-right{display:none !important}.user-guide{display:none !important}#app-reader-editor-below{display:none !important}.no-full-screen{display:none !important}.comp-vip-pop{display:none !important}.center-wrapper{width:auto !important}.reader-thumb,.related-doc-list,.fold-page-content,.try-end-fold-page,.lazy-load,#MF_textarea,#nav-menu-wrap{display:none !important}}'
	const prefix = "MF_";

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
		pdf_ratio = 0.56,
		title = document.title,
		fileType = '',
		downType = 1, // 下载文件类型
		select = null,
		selectBox = null,
		dom = null,
		beforeFun = null,
		interval = null,
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

	/**
	 * 人人监听侧边栏点击切换问题
	 */
	const renObserve = () => {
		const targetNode = u.query(".center-wrap");
		if (targetNode) {
			const observerOptions = {
				childList: true,
				attributes: false,
				subtree: false
			};
			// dom 监听器
			const observer = new MutationObserver(function(mutationList, observer) {
				mutationList.forEach((mutation) => {
					const addedNodes = mutation.addedNodes;
					if (addedNodes.length) {
						addedNodes.forEach(item => {
							if (item.className === 'main-content') {
								dom = item;
								let node = u.query('h1');
								title = node.innerText.replaceAll(" ", "");
								node.nextElementSibling.children
								let innerText = node.nextElementSibling.children[6]
									.innerText;
								fileType = innerText.split("：")[1].toLowerCase();
								localStorage.removeItem('down')
							}
						})
					}
				});
			});
			// 触发监听
			observer.observe(targetNode, observerOptions);
		}
	}

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
				textarea.style.width = "100%"
				textarea.style.height = "200px"
				textarea.style.outline = "none";
				textarea.style.padding = "10px";
				textarea.style.boxSizing = "border-box";
				textarea.style.fontSize = "16px"
				textarea.style.border = "1px solid rgb(204, 204, 204)"
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
				data,
				width,
				height
			} = value;
			if (fileType.includes('ppt') || width > height) {
				doc.addPage([width * pdf_ratio, height * pdf_ratio], 'l');
				doc.addImage(data, 'JPEG', 0, 0, width * pdf_ratio, height * pdf_ratio, index, 'FAST')
			} else {
				doc.addPage();
				doc.addImage(data, 'JPEG', 0, 0, pdf_w, pdf_h, index, 'FAST')
			}
			if (index === 1) {
				doc.deletePage(1);
			}
			zipWriter.add(index + ".png", new zip.Data64URIReader(data));
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
			console.log('---------->beforeFun');
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
				console.log('结束');
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
				console.log('结束');
				return;
			}
			if (!href.includes('pptView.html')) {
				const node = u.query('h1');
				title = node.innerText.replaceAll(" ", "");
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
				console.log('结束');
				return;
			}
			title = u.query('meta[property="og:title"]').content;
			fileType = u.attr(u.query('h1').children[0], 'title').toLowerCase();
			select = "#contentcontainer canvas";
			if (isUserLogin === '1') {
				beforeFun = "let eb = u.query('.model-fold-show');if (eb) {eb.click();}";
			}
			if (fileType.includes('ppt')) {
				btns.push(new Box('PPT', '获取地址', 'downtxt()'))
			}

		} else if (host.includes(domain.wenku)) {
			if (!/.+wenku\.baidu\.com\/(tfview|view).+$/.test(href)) {
				console.log('结束');
				return;
			}
			dom = u.query('.reader-wrap');
			beforeFun = "let eb = u.query('.unfold');if (eb) {eb.click();}";
			select = "#original-creader-root canvas";
			btns.push(new Box('print-pdf', '打印PDF', 'window.print()'))
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
			if (fileType.includes('ppt') || fileType.includes('pdf')) {
				btns.push(new Box('PPT', '获取地址', 'downtxt()'))
			}
		} else if (host.includes(domain.so)) {
			if (!/.+wenku\.so\.com\/.+$/.test(href)) {
				console.log('结束');
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
				console.log('结束');
				return;
			}
			title = u.query('meta[property="og:title"]').content;
			fileType = u.query("#box1 .attribute").innerText.split(" ")[0].split("：")[1].toLowerCase();
			beforeFun = "let eb = u.query('#continueButton');if (eb) {eb.click();}";
			select = "#pageContainer .inner_page";
			btns.push(new Box('get-text', '获取文本', 'fullText()'))
		} else if (host.includes(domain.mbalib)) {
			if (!/doc\.mbalib\.com\/.+$/.test(href)) {
				console.log('结束');
				return;
			}
			dom = u.query('#scroll-m-box');
			title = u.query('h1 p').innerText;
			fileType = title.substring(title.indexOf('.') + 1).toLowerCase();
			select = "#viewer canvas";
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
		} else if (host.includes(domain.jjg)) {
			fileType = ".pdf";
			select = "#docViewer_ViewContainer .fwr-page-image img";
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
		// 在这里执行渲染完成后的操作
		console.log('HTML 渲染完成!');
		// 清空系统缓存数据
		localStorage.removeItem('listData')
		localStorage.removeItem('length')
		localStorage.removeItem('current')
		localStorage.removeItem('pageData')
		localStorage.removeItem('down')
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
		if (interval) return false;
		dom.scrollTop = 0;
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
			} else if (host.includes(domain.mbalib)) {
				scrollWinArea()
			} else if (host.includes(domain.taodocs)) {
				scrollWinAreaTao()
			} else if (host.includes(domain.gb688)) {
				scrollPageAreaDocGB()
			} else if (host.includes(domain.jjg)) {
				scrollPageAreaJJG()
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
		if (host.includes(domain.book118) && fileType.includes('ppt')) {
			localStorage.removeItem('start')
		}
		if (host.includes(domain.shengtongedu) && fileType.includes('ppt')) {
			localStorage.removeItem('start')
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
		console.log('down', host)
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
			} else if (host.includes(domain.docin) ||
				host.includes(domain.doc88) ||
				host.includes(domain.mbalib) ||
				host.includes(domain.taodocs)
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
				await downBgImg();
			} else if (host.includes(domain.jjg)) {
				await parseImage()
			} else if (host.includes(domain.qzoffice)) {
				await handleQzoffice();
				conditionDownload();
			}
		} else {
			conditionDownload();
		}
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
			stopPreview();
			u.preview(-1);
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
		for (let i = 0; i < length; i++) {
			let item = images[i];
			const {
				top
			} = item.getBoundingClientRect();
			let previousElementSibling = item.previousElementSibling.previousElementSibling;
			let fs = u.attr(item, 'fs');
			let t = previousElementSibling.innerText;
			if (!fs || t.length) {
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

	const scrollPageAreaDocGB = () => {
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
		const clientHeight = dom.clientHeight;
		let end = 0;
		const els = u.queryAll(select);
		const length = els.length;
		for (let i = 0; i < length; i++) {
			let item = els[i];
			if (!u.attr(item, 'src')) {
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

	const imageToBase64 = async () => {
		const images = u.queryAll(select);
		const length = images.length;
		for (let i = 0; i < length; i++) {
			let {
				data,
				width,
				height
			} = await MF_CanvasToBase64(images[i]);
			let fileName = i + ".png";
			zipWriter.add(fileName, new zip.Data64URIReader(data));
			if (fileType.includes('ppt')) {
				doc.addPage([width * pdf_ratio, height * pdf_ratio], 'l');
				doc.addImage(data, 'JPEG', 0, 0, width * pdf_ratio, height * pdf_ratio, i, 'FAST')
			} else {
				doc.addPage();
				doc.addImage(data, 'JPEG', 0, 0, pdf_w, pdf_h, i, 'FAST')
			}
			if (i === 1) {
				doc.deletePage(1);
			}
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
				// 将canvas转换为图片并下载.
				let data = canvas.toDataURL();
				let fileName = max_index + "_" + a_len + ".png";
				zipWriter.add(fileName, new zip.Data64URIReader(data));
				// 添加PDF
				// 794px*1123px ;
				doc.addPage([canvas.width * pdf_ratio, canvas.height * pdf_ratio], 'l');
				doc.addImage(data, 'JPEG', 0, 0, canvas.width * pdf_ratio, canvas.height *
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
					return zipWriter.add(max_index + "/" + i + ".png", new zip.HttpReader(item));
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
				doc.addImage(data, 'JPEG', 0, 0, canvas.width * pdf_ratio, canvas.height *
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
					return zipWriter.add(max_index + "/" + i + ".png", new zip.HttpReader(item));
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
						data,
						width,
						height
					} = await MF_ImageToBase64(animVal);
					zipWriter.add(`images/${i}.png`, new zip.Data64URIReader(data));
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
				listData.push({
					page,
					src
				})
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
					data,
					width,
					height
				} = await MF_ImageToBase64(src);
				if (fileType.includes('ppt') || width > height) {
					doc.addPage([width * pdf_ratio, height * pdf_ratio], 'l');
					doc.addImage(data, 'JPEG', 0, 0, width * pdf_ratio, height * pdf_ratio, index, 'FAST')
				} else {
					doc.addPage();
					doc.addImage(data, 'JPEG', 0, 0, pdf_w, pdf_h, index, 'FAST')
				}
				if (index === 1) {
					doc.deletePage(1);
				}
				zipWriter.add(index + ".png", new zip.Data64URIReader(data));
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
	 * bg pdf 下载
	 */
	const downBgImg = async () => {
		const els = u.queryAll(select);
		const length = els.length;
		for (let i = 0; i < length; i++) {
			let item = els[i];
			const {
				data,
				width,
				height
			} = await MF_ImagePositionToBase64(item);
			if (data === -1) {
				break;
			}
			if (fileType.includes('ppt') || width > height) {
				doc.addPage([width * pdf_ratio, height * pdf_ratio], 'l');
				doc.addImage(data, 'JPEG', 0, 0, width * pdf_ratio, height * pdf_ratio, index, 'FAST')
			} else {
				doc.addPage();
				doc.addImage(data, 'JPEG', 0, 0, pdf_w, pdf_h, i, 'FAST')
			}
			if (i === 1) {
				doc.deletePage(1);
			}
			zipWriter.add(i + ".png", new zip.Data64URIReader(data));
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

		} else if (host.includes(domain.mbalib)) {
			const texts = u.queryAll('#viewer .textLayer');
			for (var i = 0; i < texts.length; i++) {
				let t = texts[i];
				text += `\n\n====第${i+1}页====\n\n`;
				if (fileType.includes('doc')) {
					text += t.innerText;
				} else {
					text += t.textContent;
				}
			}
		} else if (host.includes(domain.doc88)) {
			const texts = Core.api._pK;
			for (var i = 0; i < texts.length; i++) {
				text += `\n\n====第${i+1}页====\n\n` + texts[i];
			}
		} else if (host.includes(domain.taodocs)) {
			const texts = u.queryAll('#canvas .textLayer');
			for (var i = 0; i < texts.length; i++) {
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
			// 在关闭旧的 ZipWriter 后，创建新的 ZipWriter
			zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"), {
				bufferedWrite: true,
				useCompressionStream: false
			});
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
							let src = bgi.substring(bgi.indexOf("\"") + 1, bgi.lastIndexOf("\""));
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
						width,
						height
					} = image;
					canvas.width = width;
					canvas.height = height;
					let context = canvas.getContext('2d');
					context.drawImage(image, 0, 0, width, height);
					const data = canvas.toDataURL();
					resolve({
						data,
						width,
						height
					});
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
		// 父节点
		const {
			x,
			y
		} = el.getBoundingClientRect();
		// 所有子节点
		const childrens = el.children;
		// 背景图片地址处理
		const imageUrl = childrens[0].style.backgroundImage;
		const fullUrl = base_gb + imageUrl.substring(5, imageUrl.length - 2);
		if (!imageUrl) {
			return new Promise((resolve, reject) => {
				resolve({
					data: -1
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
					canvas.width = 1190;
					canvas.height = 1680;
					// 获取上下文对象
					const ctx = canvas.getContext('2d');
					ctx.fillStyle = "#fff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					for (var i = 0; i < childrens.length; i++) {
						const child = childrens[i];
						const pos = child.style.backgroundPosition.split(' ');
						const sx = Math.abs(pos[0].replace('px', ''));
						const sy = Math.abs(pos[1].replace('px', ''));
						const rect = child.getBoundingClientRect();
						const dx = rect.x - x;
						const dy = rect.y - y;
						const {
							width: sw,
							height: sh
						} = rect;
						ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw, sh);
						if (i === childrens.length - 1) {
							// 转 base64 输出
							const data = canvas.toDataURL();
							resolve({
								data,
								width: canvas.width,
								height: canvas.height
							});
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

	/**
	 * @description 画布输出 base64
	 * @author Mr.Fang
	 * @time 2024年1月20日18:05:49
	 * @param src 图片地址
	 * @returns {Promise<unknown>}
	 */
	const MF_CanvasToBase64 = (canvas) => {
		return new Promise((resolve, reject) => {
			const {
				width,
				height
			} = canvas;
			const data = canvas.toDataURL();
			resolve({
				data,
				width,
				height
			});
		})
	}
})();
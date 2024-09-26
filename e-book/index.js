// ==UserScript==
// @name         kill-e-book 
// @namespace    http://tampermonkey.net/
// @homepage	 https://github.com/systemmin/kill-doc
// @version      1.1.2
// @description  文泉书局(bit)|高教书苑|中教经典|可知|可知|先晓书院|工程科技(校)|悦读(校)|社会科学文库|畅想之星等公开免费电子书下载
// @author       Mr.Fang
// @match        https://*.wqxuetang.com/deep/read/pdf*
// @match        https://nlibvpn.bit.edu.cn/*/*/deep/read/pdf?bid=*
// @match        https://ebook.hep.com.cn/index.html*
// @match        https://www.zjjd.cn/read-book*
// @match        https://www.keledge.com/pdfReader*
// @match        https://xianxiao.ssap.com.cn/readerpdf/static/pdf/web/*
// @match        https://ersp.lib.whu.edu.cn/*
// @match        https://dcd.cmpkgs.com/*
// @match        https://sso.zslib.cn/*
// @match        https://www.sklib.cn/pdf_reader/index.html*
// @match        https://www.cxstar.com/onlineepub*
// @require      https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jspdf/2.4.0/jspdf.umd.min.js
// @require      https://unpkg.com/@zip.js/zip.js@2.7.34/dist/zip.min.js
// @require      https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.js
// @icon         https://dtking.cn/favicon.ico
// @run-at 		 document-idle
// @grant        none
// @license      Apache-2.0
// ==/UserScript==

(function() {
	'use strict';
	let MF =
		'#MF_fixed{position:fixed;top:50%;transform:translateY(-50%);right:20px;gap:10px;flex-direction:column;z-index:2147483647;display:flex}';
	MF +=
		'.MF_box{padding:10px;cursor:pointer;border-color:rgb(0,102,255);border-radius:5px;background-color:white;color:rgb(0,102,255);}.MF_active{color: green}#MF_k_page_no,#MF_k_page_size{color: red;}';
	const prefix = "MF_";
	// canvas 禁止重写 drawImage
	const canvasRenderingContext2DPrototype = CanvasRenderingContext2D.prototype;
	const originalDrawImage = canvasRenderingContext2DPrototype.drawImage;
	Object.defineProperty(canvasRenderingContext2DPrototype, 'drawImage', {
		value: originalDrawImage,
		writable: false,
		configurable: false
	});

	class Box {
		id = ""; // id
		label = ""; // 按钮文本
		title = "";
		fun = ""; // 执行方法
		constructor(id, label, fun) {
			this.id = id;
			this.label = label;
			this.fun = fun;
		}

		setTitle(title) {
			this.title = title;
			return this;
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
				if (item.title) {
					el.title = item.title;
				}
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
				if (item.id === 'k_page_no') {
					this.attr(el, 'contenteditable', true)
				}
				if (item.id === 'k_page_size') {
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
		new Box('k_page_no', '1').setTitle('指定页码，从第几页开始'),
		new Box('k_page_size', '100').setTitle('指定每次下载多少页面'), ,
		new Box('handleStart', '开始执行', 'handleStart()'),
		new Box('handleClean', '结束执行', 'handleClean()'),
		new Box('start', '继续预览', 'autoPreview()'),
		new Box('stop', '停止预览', 'stopPreview()'),
		new Box('pdf', '下载PDF', 'download()')
	]

	const domain = {
		wqxuetang: 'wqxuetang.com',
		nlibvpn: 'nlibvpn.bit.edu.cn',
		ebook: 'ebook.hep.com.cn',
		zjjd: 'www.zjjd.cn',
		keledge: 'www.keledge.com',
		elib: 'www.elib.link',
		xianxiao: 'xianxiao.ssap.com.cn',
		ersp: 'ersp.lib.whu.edu.cn',
		cmpkgs: 'dcd.cmpkgs.com',
		zslib: 'sso.zslib.cn',
		sklib: 'www.sklib.cn',
		cxstar: 'www.cxstar.com',
	};
	const {
		host,
		href,
		origin
	} = window.location;
	const jsPDF = jspdf.jsPDF;

	const doc = new jsPDF({
		orientation: 'p',
		unit: 'px',
		compress: true
	});
	//  794 x 1123 px
	let pdf_w = 446,
		pdf_h = 631,
		loading = 800, // 毫秒
		pdf_ratio = 0.56,
		title = document.title,
		select = null,
		selectPages = null,
		observeClassName = null,
		dom = null,
		params = null,
		interval = null;

	// ，页码，几次
	let k_page_size = 0, // 页面容量
		k_count = 0, // 计次=第几次分页
		k_total = 0; // 计数=每次分页预览数量

	const lastIndex = href.lastIndexOf('?')
	if (lastIndex != -1) {
		params = new URLSearchParams(href.substring(lastIndex));
	}


	/**
	 * @description 初始化方法
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const MF_init = () => {
		console.table({
			host,
			href,
			origin
		})
		dom = document.documentElement || document.body;
		if (host.includes(domain.wqxuetang) || host.includes(domain.nlibvpn)) {
			select = "#pagebox .page-lmg";
			observeClassName = "page-lmg";
			dom = u.query('#scroll');
		} else if (host.includes(domain.ebook)) {
			if (!params)
				return;
			if (href.includes('detail')) {
				setTimeout(() => {
					localStorage.setItem('title', u.query('.bookName').innerText)
				}, 1000)
				return;
			}
			select = ".pdf-main .pdf-page";
			observeClassName = "pdf-reader";
			dom = u.query('#viewerContainer');
		} else if (host.includes(domain.zjjd)) {
			select = "#pdf-render .item";
			dom = u.query('#pdf-render > div');
		} else if (host.includes(domain.keledge)) {
			select = ".pdf-main .pdfViewer";
		} else if (host.includes(domain.elib)) {
			select = "#virtual .listitem";
			dom = u.query('#virtual')
		} else if (host.includes(domain.xianxiao)) {
			select = "#viewer .page";
			dom = u.query('#viewerContainer');
		} else if (host.includes(domain.ersp)) {
			// 重置链接 
			const SkuExternalId = params.get('SkuExternalId')
			if (SkuExternalId) {
				const target = href.replaceAll('ersp.lib.whu.edu.cn/s/com/cmpkgs/dcd/G.https',
					'dcd.cmpkgs.com');
				window.location.href = target;
			}
			return;
		} else if (host.includes(domain.cmpkgs)) {
			select = ".pdf-main .pdf-page";
		} else if (host.includes(domain.zslib)) {
			if (!href.includes('pdfReader')) {
				return;
			}
			select = "#canvas_box .pdf_box";
			dom = u.query('.pdf_reader');
		} else if (host.includes(domain.sklib)) {
			select = "#viewer .page";
			dom = u.query('#viewerContainer');
		} else if (host.includes(domain.cxstar)) {
			select = "#epub-area .page-div-wrapper";
		}
		u.gui(btns);
		console.log('文件名称：', title);
	}


	const MF_loginfo = () => {
		console.log('k_page_size', localStorage.getItem('k_page_size'))
		console.log('k_page_no', localStorage.getItem('k_page_no'))
		console.log('k_count', localStorage.getItem('k_count'))
		console.log('k_total', k_total)
	}


	// load 事件
	(() => {
		MF_init()
		const k_start = localStorage.getItem('k_start');
		k_count = Number(localStorage.getItem('k_count')) || 0;
		k_page_size = Number(localStorage.getItem('k_page_size')) || 0;
		if (k_start) {
			setTimeout(() => {
				autoPreview();
			}, 2000)
		}
		MF_loginfo()
	})()
	// document.onreadystatechange = function() {
	// 	if (document.readyState === "complete") {
	// 		init()
	// 		const k_start = localStorage.getItem('k_start');
	// 		k_count = Number(localStorage.getItem('k_count')) || 0;
	// 		k_page_size = Number(localStorage.getItem('k_page_size')) || 0;
	// 		if (k_start) {
	// 			setTimeout(() => {
	// 				autoPreview();
	// 			}, 2000)
	// 		}
	// 		loginfo()
	// 	}
	// };


	/**
	 * @description 前置方法
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const before = () => {
		console.log('before=============>')
		if (host.includes(domain.wqxuetang) || host.includes(domain.nlibvpn)) {
			if (u.query('.reload_image')) {
				console.log('重新加载')
				u.query('.reload_image').click();
			}
		}
	}

	/**
	 * @description 后置方法
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const after = () => {
		console.log('after=============>')
		if (host.includes(domain.wqxuetang) || host.includes(domain.nlibvpn)) {
			let nodeTitle = u.query('.read-header-title');
			if (!nodeTitle) {
				nodeTitle = u.query('.read-header-name');
			}
			if (nodeTitle) {
				title = nodeTitle.innerText;
			}
		} else if (host.includes(domain.ebook)) {
			let t = localStorage.getItem('title');
			if (t) {
				title = t;
			}
		} else if (host.includes(domain.zjjd)) {
			title = u.query('.title').innerText;
		}
	}


	/**
	 * @description 开始执行
	 */
	const handleStart = () => {
		console.log('handleStart=============>')
		// 重新设置页码参数
		const k_page_no = Number(u.query('#MF_k_page_no').innerText) - 1;
		if (k_page_no > 0) {
			localStorage.setItem('k_page_no', k_page_no)
		} else {
			localStorage.setItem('k_page_no', 0)
		}

		// 设置页面容量
		k_page_size = localStorage.getItem('k_page_size');
		const size = Number(u.query('#MF_k_page_size').innerText);
		if (size > 0) {
			k_page_size = size
		}
		localStorage.setItem('k_page_size', k_page_size)
		u.update('#MF_k_page_size', k_page_size)

		// 自动预览
		autoPreview();
	}

	/**
	 * @description 清空缓存数据
	 */
	const handleClean = () => {
		console.log('handleClean=============>')
		stopPreview();
		k_total = 0;
		k_count = 0;
		localStorage.removeItem('k_page_size')
		localStorage.removeItem('k_page_no')
		localStorage.removeItem('k_count')
		localStorage.removeItem('k_total')
		localStorage.removeItem('k_start')
		u.preview(-1, null, "已终止");
	}

	/**
	 * @description 开始方法，自动预览
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const autoPreview = async () => {
		// 开始执行标识
		localStorage.setItem('k_start', '1');
		// 初始化页码
		if (host.includes(domain.wqxuetang) || host.includes(domain.nlibvpn)) {

		}
		// 自动翻页
		await autoPager()
	}

	/**
	 * @description 结束方法，停止预览
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const stopPreview = async () => {
		console.log('stopPreview=============>')
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		localStorage.removeItem('k_start')
	}

	/**
	 * 判断 dom 是否在可视范围内
	 */
	const isVisible = (el) => {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		);
	}
	// wq 保存图片
	const saveImagePDF = async (els, i) => {
		localStorage.setItem('k_page_no', i + 1);
		let canvas;
		if (host.includes(domain.wqxuetang) || host.includes(domain.nlibvpn)) {
			canvas = await MF_ImageJoinToBlob(els);
		} else if (host.includes(domain.ebook)) {
			canvas = await MF_ImageToBase64(els.src);
		} else if (host.includes(domain.zjjd)) {
			canvas = await MF_ImageToCanvas(els);
		} else if (host.includes(domain.keledge)) {
			canvas = els;
		} else if (host.includes(domain.xianxiao)) {
			canvas = els;
		} else if (host.includes(domain.cmpkgs) || host.includes(domain.zslib) || host.includes(domain
				.sklib) || host.includes(domain.cxstar)) {
			canvas = els
		}
		doc.addPage();
		doc.addImage(canvas, 'JPEG', 0, 0, pdf_w, pdf_h, i, 'FAST')
		if (doc.internal.pages[1].length === 2) {
			doc.deletePage(1); // 删除空白页
		}
		k_total++;
		// 更新dom
		u.update('#MF_k_page_size', k_page_size)
		u.update('#MF_k_page_no', i + 1)

	}

	/**
	 * @description 自动翻页
	 */
	const autoPager = async () => {
		if (!localStorage.getItem("k_start")) {
			u.preview(-1, null, "已停止");
			return;
		}
		before()

		/**
		 * @description 图片是否加载完成
		 * @param {HTMLImageElement} img 图片节点
		 */
		const imageComplete = (img) => {
			return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
		}

		/**
		 * @description 所有字加载完成
		 * @param {HTMLElement} nodes 孩子节点
		 */
		const nodeComplete = (nodes) => {
			if (!nodes.length) return false;
			for (let i = 0; i < nodes.length; i++) {
				if (!imageComplete(nodes[i])) return false;
			}
			return true;
		}

		//======================== 前置条件判断
		// 当前页码
		const nodes = u.queryAll(select);
		const length = nodes.length;
		const k_page_no = Number(localStorage.getItem('k_page_no')) || 0;

		// 多增加一页码，防止缺页
		if (k_total % k_page_size === 0 && k_total != 0) { // 满足分页条件
			download().then(() => {
				localStorage.setItem('k_count', k_count + 1);
				setTimeout(() => {
					window.location.reload()
				}, 2000)
			});
			return;
		}
		let conditions = false;
		let currentNode = undefined;
		try {
			const node = nodes[k_page_no];
			if (host.includes(domain.wqxuetang) || host.includes(domain.nlibvpn)) {
				conditions = nodeComplete(node.children);
				currentNode = node;
			} else if (host.includes(domain.ebook)) {
				const img = node.querySelector('img')
				conditions = isVisible(node) && img;
				currentNode = img;
			} else if (host.includes(domain.zjjd)) {
				const img = node.querySelector('img')
				conditions = isVisible(node) && img && imageComplete(img)
				currentNode = img;
			} else if (host.includes(domain.keledge)) {
				const canvas = node.querySelector('canvas')
				conditions = isVisible(node) && node.style.length && canvas
				currentNode = canvas;
			} else if (host.includes(domain.xianxiao)) {
				const canvas = node.querySelector('canvas')
				conditions = isVisible(node) && canvas
				currentNode = canvas;
			} else if (host.includes(domain.cmpkgs) || host.includes(domain.zslib) || host.includes(domain.cxstar)) {
				const canvas = node.querySelector('canvas')
				conditions = isVisible(node) && canvas
				currentNode = canvas;
			} else if (host.includes(domain.sklib)) {
				const canvas = node.querySelector('canvas')
				const dataLoaded = u.attr(node, 'data-loaded')
				if (dataLoaded && canvas) {
					conditions = true
					currentNode = canvas;
				}

			}
			if (conditions && currentNode) {
				// 保存
				await saveImagePDF(currentNode, k_page_no)
				// 滚动到下一个范围
				if (k_page_no !== length - 1) {
					nodes[k_page_no + 1].scrollIntoView({
						behavior: "smooth"
					});
				}
			} else {
				nodes[k_page_no].scrollIntoView({
					behavior: "smooth"
				});
			}
			u.preview(k_page_no, length);
		} catch (e) {
			console.error(e);
			u.preview(-1);
			download().then(() => {
				handleClean();
			})
			return;
		}
		MF_loginfo()

		if (k_page_no !== length) { // 继续执行
			setTimeout(async () => {
				await autoPager()
				console.log(loading, 'ms 后执行');
			}, loading)
		}
	}


	/**
	 * @description 下载 PDF
	 * @author Mr.Fang
	 * @time 2024年2月2日
	 */
	const download = () => {
		after()

		// 下载 PDF 文件
		return doc.save(`${title}_${k_count}.pdf`, {
			returnPromise: true
		});
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
			resolve(canvas)
		})
	}

	const MF_NodeToCanvas = (node) => {
		return new Promise((resolve) => {
			html2canvas(node, {
				useCORS: true,
				logging: true,
			}).then(function(canvas) {
				resolve(canvas);
			});
		})
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
	 * @description 加载图片
	 * @author Mr.Fang
	 * @time 2024年1月20日18:05:49
	 * @param src 图片地址
	 * @returns {Promise<unknown>}
	 */
	const MF_ImageToBase64 = (src) => {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = function() {
				try {
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
				} catch (e) {
					console.error(e);
					reject(e);
				}
			}
			image.onerror = reject;
			image.src = src;
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
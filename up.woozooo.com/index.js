// ==UserScript==
// @name         蓝奏获取外部链接
// @namespace    http://tampermonkey.net/
// @homepageURL  https://github.com/systemmin/kill-doc/blob/master/up.woozooo.com/index.js
// @version      1.0.1
// @description  内部：批量获取文件夹，文件分享链接；外部：自动提交携带密码的访问链接，批量获取下载链接，分享链接；
// @author       MR.Fang
// @match        https://up.woozooo.com/mydisk.php?*
// @match        https://*.lanzouj.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=woozooo.com
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @run-at 		 document-end
// @license      Apache-2.0
// ==/UserScript==

(function() {
	'use strict'
	GM_addStyle(
		'.td-down{max-width:200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;} th{text-align: start;} .f_sel{ position: relative;}.share{ position: absolute;right: -51px;top: 0;border-radius:4px;border:1px solid #D5D5D5;background-image:linear-gradient(#FCFCFC,#EEE);background-color:#f7f7f7;text-shadow:0 2px 0 rgba(255,255,255,0.9);font-size:11px;padding:1px 6px;margin:0;height:21px;}'
	)

	const {
		host,
		href,
		origin,
		search
	} = location;

	// 获取外链 URL
	const BASE_URL = 'https://up.woozooo.com/doupload.php';

	/**
	 * @description 轻提示
	 * @param {String} message 
	 * @param {Number} duration
	 */
	const showToast = (message, duration) => {
		const styles = {
			"position": "fixed",
			"top": "20px",
			"left": "50%",
			"transform": "translateX(-50%)",
			"z-index": 9999,
			"background-color": "#333",
			"color": "#fff",
			"padding": "10px 20px",
			"border-radius": "5px",
			"text-align": "center",
			"transition": "opacity 0.3s"
		};
		// 创建轻提示元素
		var toast = document.createElement('div');
		toast.className = 'toast';
		toast.textContent = message;
		for (let key of Object.keys(styles)) {
			toast.style[key] = styles[key];
		}
		// 将轻提示添加到页面中
		document.body.append(toast);
		// 隐藏轻提示
		setTimeout(function() {
			setTimeout(function() {
				document.body.removeChild(toast);
			}, 300);
		}, duration || 1000);
	}
	/**
	 * @description 子 iframe 发送消息 
	 * @param {String} message 
	 * @param {String} type: real 真实下载页面
	 */
	const childMessage = (message, type) => {
		if (!window.parent) return;
		window.parent.postMessage({
			type: type,
			value: message ? message : ''
		}, "*")
	}

	// 监听页面消息事件，父子共用
	window.addEventListener("message", (e) => {
		const {
			data
		} = e;
		// 非单个文件下载时
		if (data.type === 'real' && document.getElementById('pwdload')) {
			loadDataIframe(data.value)
		}
	})

	// 获取文件对象 {name,id,size}
	const listFiles = () => {
		return [...document.querySelector('#filelist').childNodes].map(item => {
			return {
				name: item.querySelector('.f_name_title').innerText,
				size: item.querySelector('.f_size').innerText,
				id: item.id.substring(1)
			}
		});
	}
	// 获取文件夹对象 {name,id}
	const listFolders = () => {
		return [...document.querySelector('#sub_folder_list').childNodes].map(item => {
			return {
				name: item.querySelector('.follink').innerText,
				id: item.id.substring(3)
			}
		});
	}

	/**
	 * @description 获取外部链接
	 * @param {Object} body:{task,folder_id,file_id}
	 * @param {String} url 分享地址
	 */
	const external = async (body) => {
		const params = new URLSearchParams(body)
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: params.toString()
		})
		if (response.ok) {
			const data = await response.json();
			if (body.folder_id) {
				const {
					pwd,
					new_url
				} = data.info;
				return new_url + '密码:' + pwd;
			} else {
				const {
					f_id,
					is_newd
				} = data.info;
				return is_newd + '/' + f_id;
			}
		}
		return undefined;
	}

	// 创建 table 盒子
	const createBox = (content) => {
		const template = `<table border="1px" style="border-color: azure;" width="100%" cellpadding="10px" cellspacing="0px">
			<thead>
				<tr>
					<th>文件名</th>
					<th>链接</th>
					<th>文件大小</th>
				</tr>
			</thead>
			<tbody>
				${content}
			</tbody>
		</table>`;
		const file_text = document.getElementById('file-text');
		if (file_text) {
			file_text.innerHTML = template;
		} else {
			const div = document.createElement('div')
			div.innerHTML = template;
			div.style.padding = "10px";
			div.style.border = "1px solid #eee";
			div.id = 'file-text'
			document.getElementById('f_tp').after(div)
		}
		showToast('加载结束');
	}

	// 开始
	const start = async () => {
		let htmlStr = '';
		// 文件夹
		const folders = listFolders();
		if (folders.length) {
			let params = {
				task: 18
			};
			for (let key of folders) {
				params.folder_id = key.id;
				const url = await external(params)
				if (url)
					key['url'] = url
			}
			htmlStr += folders.map(item =>
				`<tr><td>${item.name}</td><td>${item.url}</td><td>/</td></tr>`).join('\n')
		}
		// 文件
		const files = listFiles();
		if (files.length) {
			let params = {
				task: 22
			};
			for (let key of files) {
				params.file_id = key.id;
				const url = await external(params)
				if (url)
					key['url'] = url
			}
			htmlStr += files.map(item =>
				`<tr><td>${item.name}</td><td>${item.url}</td><td>${item.size}</td></tr>`).join('\n')
		}
		createBox(htmlStr);
	}

	const handleShareUrls = async () => {
		const urls = [];
		// 文件夹
		const folders = listFolders();
		if (folders.length) {
			let params = {
				task: 18
			};
			for (let key of folders) {
				params.folder_id = key.id;
				const url = await external(params)
				if (url)
					urls.push(url)
			}
		}
		// 文件
		const files = listFiles();
		if (files.length) {
			let params = {
				task: 22
			};
			for (let key of files) {
				params.file_id = key.id;
				const url = await external(params)
				if (url)
					urls.push(url)
			}
		}
		GM_setClipboard(urls.join('\n'));
		showToast('拷贝成功，赶紧去分享吧！go~');
	}

	const createButton = () => {
		let a = document.createElement('a')
		a.innerText = '批量链接';
		a.title = '一次性获取所有外部链接';
		a.href = "javascript:;";
		a.className = 'diskdao';
		a.onclick = function() {
			showToast('开始加载……');
			start()
		}
		const mydisk_file_bar = document.querySelector('.mydisk_file_bar');
		if (mydisk_file_bar) {
			mydisk_file_bar.append(a);
		}
	}

	const createShareButton = () => {
		const fileText = document.getElementById('file-text')
		if (fileText) {
			fileText.remove()
		}
		if (!document.getElementById('share-btn')) {
			const mydisk_file_bar = document.querySelector('.mydisk_file_bar');
			let a = document.createElement('a')
			a.innerText = '一键分享';
			a.id = 'share-btn'
			a.href = "javascript:;";
			a.className = 'diskdao';
			a.style.backgroundColor = '#92d14f'
			a.onclick = function() {
				handleShareUrls()
			}
			mydisk_file_bar.append(a);
		}
	}
	/**
	 * 处理分享链接
	 */
	const handleShareUrl = async (id) => {
		const params = {};
		if (id.includes('fol')) {
			params.task = 18;
			params.folder_id = id.substring(3);
		} else {
			params.task = 22;
			params.file_id = id.substring(1);
		}
		const url = await external(params)
		GM_setClipboard(url)
		showToast('拷贝成功，赶紧去分享吧！go~');
	}

	const customShareObserver = (idStr) => {
		const targetElement = document.getElementById(idStr);
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				const addeNodes = mutation.addedNodes;
				if (addeNodes.length) {
					const button = document.createElement('button')
					button.innerText = '分享';
					button.className = 'share'
					button.onclick = function() {
						handleShareUrl(this.parentElement.parentElement.id)
					}
					addeNodes[0].querySelector('.f_sel').appendChild(button)
				}
			});
		});
		observer.observe(targetElement, {
			childList: true,
		});
	}

	const customFolderObserver = () => {
		const targetElement = document.getElementById("f_tp");
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				const folderlist = document.getElementById('folderlist')
				const sharebtn = document.getElementById('share-btn')
				if (folderlist && folderlist.children) {
					if (folderlist.children.length) {
						createShareButton()
					} else {
						if (sharebtn)
							sharebtn.remove()
					}
				} else {
					if (sharebtn)
						sharebtn.remove()
				}
			});
		});
		observer.observe(targetElement, {
			childList: true,
		});
	}

	// ===========================内部访问
	if (host === 'up.woozooo.com') {
		createButton(); // 批量按钮列表
		customShareObserver("filelist") // 监听文件列表加载
		customShareObserver("sub_folder_list") // 加载目录列表加载
		customFolderObserver() // 监听二级目录
	}

	// 创建文件下载页面 table
	const createTable = (content) => {
		const d2 = document.querySelector('.d2');
		const infos = document.querySelector('#infos');
		const template = `<table style="border-color: azure;" width="100%" cellpadding="10px" cellspacing="0px">
			<thead>
				<tr>
					<th>文件名</th>
					<th>分享链接</th>
					<th>大小</th>
					<th>时间</th>
				</tr>
			</thead>
			<tbody>
				${content}
			</tbody>
		</table>`;
		const file_text = document.getElementById('file-text');
		if (file_text) {
			file_text.innerHTML = template;
		} else {
			const div = document.createElement('div')
			div.innerHTML = template;
			div.style.padding = "10px";
			div.style.border = "1px solid #eee";
			div.id = 'file-text'
			d2.before(div)
		}
		d2.style.display = 'none';
		infos.style.display = 'none';
	}

	// 获取下载列表数据
	const loadData = () => {
		return [...document.querySelectorAll('#infos>div div:first-child')].map(item => {
			let a = item.querySelector('a');
			let img = item.querySelector('img');
			return {
				name: a.innerText,
				url: a.href,
				img: img.src,
				size: item.nextElementSibling.innerText,
				time: item.nextElementSibling.nextElementSibling.innerText,
				down: ''
			}
		})
	}
	// 创建 iframe
	const createIframe = (src) => {
		let iframe = document.querySelector('iframe');
		if (!iframe) {
			iframe = document.createElement('iframe')
			iframe.style.visibility = "hidden";
			document.body.append(iframe);
			iframe.src = src;
		} else {
			iframe.src = src;
		}
	}
	// 获取中间页面 HTML 内容
	const getMiddleHTML = async (url) => {
		try {
			const response = await fetch(url);
			const html = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			const iframe = doc.querySelector('iframe');
			return iframe.src;
		} catch (e) {
			console.log(e)
		}
	}

	// 加载真实下载页面
	const loadDataIframe = async (url) => {
		const start = Number(localStorage.start) || 0;
		const listData = JSON.parse(localStorage.listData) || [];
		if (url) {
			listData[start].down = url;
			localStorage.listData = JSON.stringify(listData);
		}
		let index = -1;
		for (let i = 0; i < listData.length; i++) {
			const data = listData[i];
			index = i;
			if (!data.down) {
				localStorage.start = i + '';
				const targetURL = await getMiddleHTML(data.url);
				createIframe(targetURL)
				index = -1
				break;
			}
		}
		if (index === listData.length - 1) {
			showToast('加载结束')
			reRendering()
		}
	}

	// 数据保存到本地
	const saveLocalStorage = () => {
		const listData = loadData();
		localStorage.listData = JSON.stringify(listData);
		showToast('开始加载…………')
		loadDataIframe()
	}
	// 重新渲染页面
	const reRendering = () => {
		const listData = JSON.parse(localStorage.listData) || [];

		const content = listData.map(item => {
			return `<tr> <td>&nbsp;<img src="${item.img}" align="absmiddle" border="0">&nbsp;<a href="${item.down}" target="_blank">${item.name}</a></td>
			<td>${item.url}</td>
			<td>${item.size}</td>
			<td><time>${item.time}</time></td></tr>`;
		}).join('\n')
		createTable(content);

		// 获取下载地址列表
		const downs = listData.map(item => item.down).join('\n');
		// 获取外部链接
		const urls = listData.map(item => item.url).join('\n');

		// 处理按钮
		const save = document.getElementById('save')
		save.style.display = 'flex';
		save.style.justifyContent = 'space-around';

		let button = save.querySelector('a').cloneNode(true);
		button.href = 'javascript:;';
		button.target = "_self"
		button.onclick = function() {
			GM_setClipboard(urls)
			showToast('拷贝成功');
		}
		let span = button.querySelector('span');
		span.innerText = '一键拷贝分享链接';
		span.style.color = "red";
		save.append(button);

		button = save.querySelector('a').cloneNode(true);
		button.href = 'javascript:;';
		button.target = "_self"
		button.onclick = function() {
			GM_setClipboard(downs)
			showToast('拷贝成功');
		}
		span = button.querySelector('span');
		span.innerText = '一键拷贝下载链接';
		span.style.color = "green";
		save.append(button);

	}

	// 下载
	if (host.includes('lanzouj.com') && !href.includes('fn?')) {
		const iframe = document.querySelector('iframe');
		if (!iframe) {
			// 携带密码访问
			const href = decodeURI(location.href); // URL 解码
			const last = href.lastIndexOf(':');
			if (last != -1 && last != 5) { // 携带密码访问 404
				localStorage.pwd = href.substring(last + 1);
				const target = href.substring(0, href.lastIndexOf('密码'));
				window.location.href = target
			} else { // 输入密码页面
				// 输入密码跳转下载页面
				if (localStorage.pwd) {
					document.getElementById('pwd').value = localStorage.pwd;
					document.getElementById('sub').onclick();
				}
			}

			// 监听
			const sub = document.getElementById('sub')
			if (sub) {
				sub.addEventListener('click', (event) => {
					const pwd = document.getElementById('pwd').value
					if (pwd)
						localStorage.pwd = pwd;
				})

			}

			// 监听、渲染
			const targetElement = document.getElementById('pwdload');
			const observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					saveLocalStorage()
					observer.disconnect(); // 释放
				});
			});
			observer.observe(targetElement, {
				attributes: true
			});
		}
	}
	// 真实下载 iframe 页面
	if (href.includes('fn?')) {
		const targetElement = document.getElementById('tourl');
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				const addedNodes = mutation.addedNodes;
				if (addedNodes.length) {
					const aNode = addedNodes[0];
					if (aNode.nodeName === 'A') {
						childMessage(aNode.href, 'real')
						observer.disconnect(); // 释放
					}
				}
			});
		});
		observer.observe(targetElement, {
			childList: true
		});
	}
})();
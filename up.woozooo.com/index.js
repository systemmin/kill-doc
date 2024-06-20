// ==UserScript==
// @name         蓝秦获取外部链接
// @namespace    http://tampermonkey.net/
// @homepageURL  https://github.com/systemmin/kill-doc/blob/master/up.woozooo.com/index.js
// @version      1.0.1
// @description  内部：批量获取文件夹，文件分享链接；外部：自动提交携带密码的访问链接，批量获取下载链接，分享链接；
// @author       MR.Fang
// @match        https://up.woozooo.com/*
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
	GM_addStyle('.td-down{max-width:200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;} th{text-align: start;}')
	const {
		host,
		href,
		origin
	} = location;

	// 获取外链 URL
	const BASE_URL = 'https://up.woozooo.com/doupload.php';

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
		console.log(e)
		const {
			data
		} = e;
		// 非单个文件下载时
		if (data.type === 'real' && document.getElementById('pwdload')) {
			loadDataIframe(data.value)
		}
	})

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

	// 获取外部链接
	const external = async (body, type) => {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: body
		})
		if (response.ok) {
			const data = await response.json();
			if (type === 1) {
				const {
					pwd,
					new_url
				} = data.info;
				return new_url + '密码:' + pwd;
			} else if (type === 2) {
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
	}

	// 开始
	async function start() {
		let htmlStr = '';
		// 文件夹
		const folders = listFolders();
		if (folders.length) {
			for (let key of folders) {
				const url = await external(`task=18&folder_id=${key.id}`, 1)
				if (url)
					key['url'] = url
			}
			htmlStr += folders.map(item =>
				`<tr><td>${item.name}</td><td>${item.url}</td><td>/</td></tr>`).join('\n')
		}
		// 文件
		const files = listFiles();
		if (files.length) {
			for (let key of files) {
				const url = await external(`task=22&file_id=${key.id}`, 2)
				if (url)
					key['url'] = url
			}
			htmlStr += files.map(item =>
				`<tr><td>${item.name}</td><td>${item.url}</td><td>${item.size}</td></tr>`).join('\n')
		}
		createBox(htmlStr);
	}

	const createButton = (content) => {
		const a = document.createElement('a')
		a.innerText = '批量链接';
		a.title = '一次性获取所有外部链接';
		a.href = "javascript:;";
		a.className = 'diskdao';
		a.onclick = function() {
			start()
		}
		const mydisk_file_bar = document.querySelector('.mydisk_file_bar');
		if (mydisk_file_bar) {
			mydisk_file_bar.append(a);
		}
	}

	// ===========================内部访问
	if (host === 'up.woozooo.com') {
		createButton();
	}
	
	// 创建文件下载页面 table
	const createTable = (content) => {
		const d2 = document.querySelector('.d2');
		const infos = document.querySelector('#infos');
		const template = `<table style="border-color: azure;" width="100%" cellpadding="10px" cellspacing="0px">
			<thead>
				<tr>
					<th>文件名</th>
					<th>下载链接</th>
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
			console.log('加载结束')
			reRendering()
		}
	}
	
	// 数据保存到本地
	const saveLocalStorage = () => {
		const listData = loadData();
		localStorage.listData = JSON.stringify(listData);
		loadDataIframe()
	}
	// 重新渲染页面
	const reRendering = () => {
		const listData = JSON.parse(localStorage.listData) || [];

		const content = listData.map(item => {
			return `<tr> <td>&nbsp;<img src="${item.img}" align="absmiddle" border="0">&nbsp;<a href="${item.url}" target="_blank">${item.name}</a></td>
			<td><div  class="td-down" title="${item.down}">${item.down}</div></td>
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
			alert('拷贝成功');
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
			alert('拷贝成功');
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
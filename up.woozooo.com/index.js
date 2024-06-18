// ==UserScript==
// @name         蓝秦获取外部链接
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  获取文件夹、文件外部链接
// @author       MR.Fang
// @match        https://up.woozooo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=woozooo.com
// @grant        none
// @run-at 		 document-end
// @license      Apache-2.0
// ==/UserScript==

(function() {
	'use strict';
	// 获取外链 URL
	const BASE_URL = 'https://up.woozooo.com/doupload.php';

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
				return new_url + '  密码：' + pwd;
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
		const template = `<table border="1px" style="border-color: azure;" width="100%" contenteditable="true" cellpadding="10px" cellspacing="0px">
			<thead>
				<tr>
					<td>文件名</td>
					<td>链接</td>
					<td>文件大小</td>
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
	createButton()
})();
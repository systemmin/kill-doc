// 名称 中国食品药品检定研究院
// 介绍 
// 示例网址 http://app.nifdc.org.cn/jianybz/jybzTwoGj.do?formAction=viewBzpdfjs
// 匹配网址 http://app.nifdc.org.cn
// 版本号码 0.0.1
javascript: (() => {
	'use strict';
	const src = document.querySelector('iframe').src;
	let urlParams = new URLSearchParams(src.substring(src.indexOf('?') + 1));
	let downloadUrl = urlParams.get('file');
	window.open(downloadUrl, '_blank');
})();
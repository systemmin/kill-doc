// 名称 前沿知识库
// 介绍 下载公开投资研究报告
// 示例网址 https://wk.askci.com/details/a761cd28815e4a3ca06d460fc0e4a001/
// 匹配网址 https://wk.askci.com/
// 版本号码 0.0.1
javascript: (() => {
	'use strict';
	javascript: const src = document.querySelector('iframe').src;
	let urlParams = new URLSearchParams(src.substring(src.indexOf('?') + 1));
	let downloadUrl = urlParams.get('pdfpath');
	window.open(downloadUrl, '_blank');
})();
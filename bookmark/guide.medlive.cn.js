// 名称 临床指南
// 介绍 下载原始PDF文件
// 示例网址 https://guide.medlive.cn/cloud/guide/view?id=9005&sub_type=3&file_id=e7147a21bb94f707dbb3d88e6bb415c2
// 匹配网址 https://guide.medlive.cn/
// 版本号码 0.0.1
javascript: (() => {
	'use strict';
	javascript: const src = document.querySelector('iframe').src;
	const downloadUrl = src.substring(80);
	const target = decodeURIComponent(downloadUrl);
	const news = target.substring(0, target.length - 9);
	window.open(news, '_blank');
})();
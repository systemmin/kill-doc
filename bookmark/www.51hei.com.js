// 名称 黑电子
// 介绍 代码块高亮，帖子内容必须有代码块才会有效
// 示例网址 http://www.51hei.com/bbs/dpj-240127-1.html
// 匹配网址 http://www.51hei.com
// 版本号码 0.0.1
javascript: (async () => {
	'use strict';

	let loading = false;
	let script = document.createElement('script');
	script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
	script.fetchpriority = "high";
	script.addEventListener("load", () => {
		console.log("外部库加载完成！highlight");
		// loading = true;
	});
	document.body.appendChild(script);

	script = document.createElement('script');
	script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/c.min.js";
	script.fetchpriority = "high";
	script.addEventListener("load", () => {
		console.log("外部库加载完成！c.min.js");
		// loading = true;
	});
	document.body.appendChild(script);


	script = document.createElement('link');
	script.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css";
	script.fetchpriority = "high";
	script.rel = "stylesheet";
	script.addEventListener("load", () => {
		console.log("外部库加载完成！link");
		loading = true;
	});
	document.body.appendChild(script);

	await new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (loading) {
				clearInterval(interval);
				resolve(true);
			}
		}, 100);
	});

	const nodes = [...document.querySelectorAll('.blockcode')];
	for (let node of nodes) {
		let code = node.firstChild;
		let pre = document.createElement('pre');
		let pcode = document.createElement('code');
		pre.style.width = '757px';
		pre.style.overflow = 'auto';
		pre.style.borderRadius = '10px';
		pre.style.display = "block";
		pre.id = code.id + 'pre';
		pre.appendChild(pcode);
		pcode.innerHTML = code.innerHTML;
		node.after(pre);
		code.style.display = "none";

		let div = document.createElement('div');
		let button = document.createElement('button');
		button.innerText = "显示原文";
		button.dataset.id = code.id;
		button.onclick = function() {
			console.log(this.dataset);
			let id = this.dataset.id;
			let divCode = document.getElementById(id);
			let preCode = document.getElementById(id + 'pre');
			if (divCode.style.display === 'none') {
				divCode.style.display = "block";
				preCode.style.display = "none";
				this.innerText = "格式化";
			} else {
				divCode.style.display = "none";
				preCode.style.display = "block";
				this.innerText = "显示原文";
			}
		};
		div.appendChild(button)
		node.before(div);
	};

	hljs.highlightAll();


})();
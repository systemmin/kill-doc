javascript: (async () => {
	'use strict';

	let loading = false;
	alert('已开始！');
	const script = document.createElement('script');
	script.src = "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jspdf/2.4.0/jspdf.umd.min.js";
	script.fetchpriority = "high";
	script.addEventListener("load", () => {
		console.log("外部库加载完成！");
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

	const CLASS_NAME_LIST = '#pageContainer .inner_page';
	const title = document.title;
	console.log(title);
	let timer = null;

	const jsPDF = jspdf.jsPDF;
	const doc = new jsPDF({
		orientation: 'p',
		unit: 'px',
		compress: true,
		hotfixes: ["px_scaling"]
	});

	function addDataPage(data, i, width, height) {
		let target_h = height,
			target_w = width;
		let dir = 'p';
		if (width > height) {
			dir = 'l';
			target_h = width;
			target_w = height;
		}
		doc.addPage([target_w, target_h], dir);
		doc.addImage(data, 'JPEG', 0, 0, target_w, target_h, i, 'FAST');
		if (doc.internal.pages[1].length === 2) {
			doc.deletePage(1);
		}
	}

	function traverseSaveCanvas() {
		const nodes = document.querySelectorAll(CLASS_NAME_LIST);
		const len = nodes.length;
		for (let i = 0; i < len; i++) {
			const item = nodes[i];
			let previousElementSibling = item.previousElementSibling.previousElementSibling;
			let t = previousElementSibling.innerText;
			if (t.length !== 0) {
				continue;
			}
			addDataPage(item, i, item.width, item.height);
		}
		console.log('处理完成', length);
		doc.save(`${title}.pdf`, {
			returnPromise: true
		}).then(res => {
			console.log(res);
		});

	}

	function isElementInViewport(element) {
		const rect = element.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		if (rect.top <= 0 && rect.top >= -rect.height) {
			return true;
		} else if (rect.bottom >= 0 && rect.bottom <= rect.height) {
			return true;
		} else {
			return false;
		}
	}

	function clearTimer() {
		if (timer) {
			clearInterval(timer);
		}
	}

	function previewPage() {
		const nodes = document.querySelectorAll(CLASS_NAME_LIST);
		const len = nodes.length;
		let finish = true;
		for (let i = 0; i < len; i++) {
			let node = nodes[i];
			let previousElementSibling = node.previousElementSibling.previousElementSibling;
			let fs = node.getAttribute('fs');
			let t = previousElementSibling.innerText;
			if (t.length !== 0) {
				node.scrollIntoView({
					behavior: "smooth"
				});
				finish = false;
				break;
			}
		}
		if (finish) {
			console.log('预览结束');
			console.log('开始保存');
			traverseSaveCanvas();
			clearTimer();
		} else {
			console.log('还没有');
		}
		return finish
	}

	function continueLoad() {
		let eb = document.querySelector('#continueButton');
		if (eb) {
			eb.click();
		}
	}

	timer = setInterval(() => {
		continueLoad();
		let end = previewPage();
		console.log('定时器');
	}, 500)

})();
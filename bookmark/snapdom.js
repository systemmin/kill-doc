// 名称 任意网页元素截图
// 介绍 使用 snapdom 对网页元素截图
// 示例网址 *://*/*
// 匹配网址 *://*/*
// 版本号码 0.0.1

javascript: (async function() {
	'use strict';
	
	let loading = false;
	const script = document.createElement('script');
	script.src = "https://cdn.jsdelivr.net/npm/@zumer/snapdom/dist/snapdom.min.js";
	script.fetchpriority = "high";
	script.addEventListener("load", () => {
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
	
	const btn = document.createElement('button');
	btn.textContent = '截图';
	Object.assign(btn.style, {
		position: 'fixed',
		bottom: '20px',
		right: '20px',
		zIndex: 9999,
		padding: '10px 15px',
		backgroundColor: '#4CAF50',
		color: 'white',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
	});
	document.body.appendChild(btn);

	let hoverBox;
	let selecting = false;

	function createHoverBox() {
		hoverBox = document.createElement('div');
		Object.assign(hoverBox.style, {
			position: 'absolute',
			outline: '1px solid red',
			backgroundColor: 'rgba(255,0,0,0.05)',
			zIndex: 9998,
			pointerEvents: 'none',
		});
		document.body.appendChild(hoverBox);
	}

	function enableSelection() {
		if (selecting) return;

		selecting = true;
		createHoverBox();

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('click', onClickSelect, true);
		document.addEventListener('keydown', onKeyDown, true);
	}

	function disableSelection() {
		selecting = false;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('click', onClickSelect, true);
		document.removeEventListener('keydown', onKeyDown, true);
		if (hoverBox) {
			hoverBox.remove();
			hoverBox = null;
		}
	}

	function onMouseMove(e) {
		if (!selecting) return;

		const el = document.elementFromPoint(e.clientX, e.clientY);
		if (!el || el === hoverBox || el === btn) return;

		const rect = el.getBoundingClientRect();
		Object.assign(hoverBox.style, {
			top: rect.top + window.scrollY + 'px',
			left: rect.left + window.scrollX + 'px',
			width: rect.width + 'px',
			height: rect.height + 'px',
			display: 'block',
		});
	}

	function onClickSelect(e) {
		e.preventDefault();
		e.stopPropagation();

		const el = document.elementFromPoint(e.clientX, e.clientY);
		if (!el || el === btn) {
			disableSelection();
			return;
		}

		disableSelection();

		snapshot(el)
	}

	function onKeyDown(e) {
		if (e.key === 'Escape') {
			disableSelection();
		}
	}

	async function snapshot(el, filename) {
		const result = await snapdom(el);
		await result.download({
			format: 'jpg',
			filename: filename || document.title
		});
	}

	btn.addEventListener('click', () => {
		enableSelection();
	});
})();
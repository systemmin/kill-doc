// 名称 网页像素测量尺（ESC 退出）
// 介绍 测量网页元素宽高以及元素距离浏览器左右边缘的距离
// 示例网址 *://*/*
// 匹配网址 *://*/*
// 版本号码 0.0.1

javascript: (function () {
    'use strict';

    let enabled = true;

    // 当前鼠标元素
    let currentElement = null;

    // 已锁定元素
    const pinnedElements = new Map();

    // ============================================================
    // 根容器
    // ============================================================

    const root = document.createElement('div');

    root.id = '__pixel_ruler_root__';

    Object.assign(root.style, {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '2147483647',
        overflow: 'visible'
    });

    // ============================================================
    // 初始化
    // ============================================================

    function init() {

        if (!document.body) {
            requestAnimationFrame(init);
            return;
        }

        document.body.appendChild(root);

        document.addEventListener(
            'mousemove',
            handleMouseMove,
            true
        );

        document.addEventListener(
            'click',
            handleClick,
            true
        );

        document.addEventListener(
            'keydown',
            handleKeyDown,
            true
        );

        window.addEventListener(
            'resize',
            updateAll,
            true
        );

        window.addEventListener(
            'scroll',
            updateAll,
            true
        );
    }

    if (document.body) {
        init();
    } else {

        const observer = new MutationObserver(() => {

            if (document.body) {

                observer.disconnect();

                init();
            }
        });

        observer.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true
            }
        );
    }

    // ============================================================
    // 鼠标移动
    // ============================================================

    function handleMouseMove(e) {

        if (!enabled) {
            return;
        }

        let element =
            document.elementFromPoint(
                e.clientX,
                e.clientY
            );

        if (!element) {
            return;
        }

        // 鼠标碰到自己的 overlay 时
        // 暂时隐藏再重新获取真实元素
        if (isInspectorElement(element)) {

            root.style.display = 'none';

            element =
                document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );

            root.style.display = '';
        }

        if (!element) {
            return;
        }

        if (shouldIgnore(element)) {
            return;
        }

        if (
            element === document.body ||
            element === document.documentElement
        ) {
            return;
        }

        if (element !== currentElement) {

            currentElement = element;

            renderCurrent(element);
        }
    }

    // ============================================================
    // 鼠标点击
    // ============================================================

    function handleClick(e) {
		// 阻止 click 击事件
		e.preventDefault();
        if (!enabled) {
            return;
        }

        let element = e.target;

        if (!element) {
            return;
        }

        if (isInspectorElement(element)) {
            return;
        }

        if (shouldIgnore(element)) {
            return;
        }

        if (
            element === document.body ||
            element === document.documentElement
        ) {
            return;
        }

        // 已经锁定
        if (pinnedElements.has(element)) {
            return;
        }

        const overlay =
            createMeasurement(
                element,
                true
            );

        pinnedElements.set(
            element,
            overlay
        );

        root.appendChild(
            overlay.container
        );

        updateMeasurement(
            element,
            overlay
        );
    }

    // ============================================================
    // ESC
    // ============================================================

    function handleKeyDown(e) {

        if (
            e.key === 'Escape' ||
            e.key === 'Esc'
        ) {

            e.preventDefault();

            disable();
        }
    }

    // ============================================================
    // 当前元素
    // ============================================================

    function renderCurrent(element) {

        removeCurrent();

        const overlay =
            createMeasurement(
                element,
                false
            );

        overlay.container.dataset.current =
            'true';

        root.appendChild(
            overlay.container
        );

        updateMeasurement(
            element,
            overlay
        );
    }

    function removeCurrent() {

        const current =
            root.querySelector(
                '[data-current="true"]'
            );

        if (current) {
            current.remove();
        }
    }

    // ============================================================
    // 创建测量 Overlay
    // ============================================================

    function createMeasurement(
        element,
        pinned
    ) {

        const container =
            document.createElement('div');

        Object.assign(
            container.style,
            {
                position: 'fixed',
                left: '0',
                top: '0',
                width: '0',
                height: '0',
                pointerEvents: 'none'
            }
        );

        // ========================================================
        // 元素矩形
        // ========================================================

        const box =
            document.createElement('div');

        Object.assign(
            box.style,
            {
                position: 'fixed',

                boxSizing: 'border-box',

                border:
                    pinned
                        ? '2px solid #ff3b30'
                        : '2px solid #008cff',

                background:
                    pinned
                        ? `
                        repeating-linear-gradient(
                            -45deg,
                            rgba(255,59,48,.18),
                            rgba(255,59,48,.18) 6px,
                            rgba(255,59,48,.04) 6px,
                            rgba(255,59,48,.04) 12px
                        )
                        `
                        : `
                        repeating-linear-gradient(
                            -45deg,
                            rgba(0,140,255,.18),
                            rgba(0,140,255,.18) 6px,
                            rgba(0,140,255,.04) 6px,
                            rgba(0,140,255,.04) 12px
                        )
                        `
            }
        );

        container.appendChild(box);

        // ========================================================
        // 左贯穿线
        // ========================================================

        const leftLine =
            createVerticalLine(pinned);

        // ========================================================
        // 右贯穿线
        // ========================================================

        const rightLine =
            createVerticalLine(pinned);

        container.appendChild(leftLine);
        container.appendChild(rightLine);

        // ========================================================
        // 宽高
        // ========================================================

        const sizeLabel =
            createSizeLabel(pinned);

        container.appendChild(
            sizeLabel
        );

        // ========================================================
        // 左距离
        // ========================================================

        const leftLabel =
            createDistanceLabel(pinned);

        // ========================================================
        // 右距离
        // ========================================================

        const rightLabel =
            createDistanceLabel(pinned);

        container.appendChild(leftLabel);
        container.appendChild(rightLabel);

        return {
            container,

            box,

            leftLine,
            rightLine,

            sizeLabel,

            leftLabel,
            rightLabel
        };
    }

    // ============================================================
    // 创建竖向贯穿线
    // ============================================================

    function createVerticalLine(
        pinned
    ) {

        const line =
            document.createElement('div');

        Object.assign(
            line.style,
            {
                position: 'fixed',

                top: '0',

                height: '100vh',

                width: '1px',

                borderLeft:
                    pinned
                        ? '1px dashed rgba(255,59,48,.65)'
                        : '1px dashed rgba(0,140,255,.65)',

                pointerEvents: 'none'
            }
        );

        return line;
    }

    // ============================================================
    // 宽高标签
    // ============================================================

    function createSizeLabel(
        pinned
    ) {

        const label =
            document.createElement('div');

        Object.assign(
            label.style,
            {
                position: 'fixed',

                padding: '3px 7px',

                background:
                    pinned
                        ? '#ff3b30'
                        : '#008cff',

                color: '#fff',

                borderRadius: '3px',

                fontFamily:
                    'Arial, "Microsoft YaHei", sans-serif',

                fontSize: '12px',

                lineHeight: '16px',

                fontWeight: 'bold',

                whiteSpace: 'nowrap',

                boxShadow:
                    '0 1px 5px rgba(0,0,0,.3)',

                pointerEvents: 'none',

                zIndex: '20',

                transform:
                    'translateX(-50%)'
            }
        );

        return label;
    }

    // ============================================================
    // 左右距离标签
    // ============================================================

    function createDistanceLabel(
        pinned
    ) {

        const label =
            document.createElement('div');

        Object.assign(
            label.style,
            {
                position: 'fixed',

                padding: '2px 5px',

                background:
                    pinned
                        ? 'rgba(255,59,48,.92)'
                        : 'rgba(0,0,0,.82)',

                color: '#fff',

                borderRadius: '3px',

                fontFamily:
                    'Arial, "Microsoft YaHei", sans-serif',

                fontSize: '11px',

                lineHeight: '14px',

                whiteSpace: 'nowrap',

                pointerEvents: 'none',

                zIndex: '30',

                boxShadow:
                    '0 1px 4px rgba(0,0,0,.25)',

                transition:
                    'none'
            }
        );

        return label;
    }

    // ============================================================
    // 更新测量
    // ============================================================

    function updateMeasurement(
        element,
        overlay
    ) {

        if (
            !document.documentElement.contains(
                element
            )
        ) {

            overlay.container.remove();

            pinnedElements.delete(
                element
            );

            return;
        }

        const rect =
            element.getBoundingClientRect();

        const viewportWidth =
            window.innerWidth;

        // ========================================================
        // 元素尺寸
        // ========================================================

        const x =
            rect.left;

        const width =
            rect.width;

        const right =
            rect.right;

        const height =
            rect.height;

        const y =
            rect.top;

        // ========================================================
        // 到浏览器左右边缘的距离
        // ========================================================

        const leftDistance =
            Math.max(
                0,
                x
            );

        const rightDistance =
            Math.max(
                0,
                viewportWidth - right
            );

        // ========================================================
        // 元素框
        // ========================================================

        Object.assign(
            overlay.box.style,
            {
                left:
                    `${x}px`,

                top:
                    `${y}px`,

                width:
                    `${width}px`,

                height:
                    `${height}px`
            }
        );

        // ========================================================
        // 左右贯穿线
        // ========================================================

        overlay.leftLine.style.left =
            `${x}px`;

        overlay.rightLine.style.left =
            `${right}px`;

        // ========================================================
        // 宽高
        // ========================================================

        overlay.sizeLabel.textContent =
            `${round(width)} × ${round(height)} px`;

        overlay.sizeLabel.style.left =
            `${x + width / 2}px`;

        /*
         * 宽高标签：
         *
         * 优先放元素内部
         * 元素太矮则放元素上方
         */

        if (height >= 28) {

            overlay.sizeLabel.style.top =
                `${y + height / 2 - 10}px`;

        } else {

            overlay.sizeLabel.style.top =
                `${Math.max(
                    2,
                    y - 25
                )}px`;
        }

        // ========================================================
        // 左右距离显示
        // ========================================================

        updateLeftDistance(
            overlay,
            x,
            y,
            width,
            height,
            leftDistance
        );

        updateRightDistance(
            overlay,
            x,
            y,
            width,
            height,
            right,
            rightDistance,
            viewportWidth
        );
    }

    // ============================================================
    // 左距离
    // ============================================================

    function updateLeftDistance(
        overlay,
        x,
        y,
        width,
        height,
        distance
    ) {

        overlay.leftLabel.textContent =
            `${round(distance)} px`;

        /*
         * 左边空间足够：
         *
         * viewport
         *     │
         *     │ 100px
         *     │
         *     ↓
         *     ┌─────────────┐
         *
         * 数字放元素外面
         */

        const labelWidth =
            estimateLabelWidth(distance);

        const outsideSpace =
            x;

        if (
            outsideSpace >=
            labelWidth + 12
        ) {

            // 外部
            overlay.leftLabel.style.left =
                `${x / 2}px`;

            overlay.leftLabel.style.top =
                `${y + height / 2 - 8}px`;

            overlay.leftLabel.style.transform =
                'translateX(-50%)';

        } else {

            /*
             * 左边空间不够
             *
             * 放到元素内部
             */

            overlay.leftLabel.style.left =
                `${Math.min(
                    x + 5,
                    x + width / 2
                )}px`;

            overlay.leftLabel.style.top =
                `${y + height / 2 - 8}px`;

            overlay.leftLabel.style.transform =
                'none';
        }
    }

    // ============================================================
    // 右距离
    // ============================================================

    function updateRightDistance(
        overlay,
        x,
        y,
        width,
        height,
        right,
        distance,
        viewportWidth
    ) {

        overlay.rightLabel.textContent =
            `${round(distance)} px`;

        const labelWidth =
            estimateLabelWidth(distance);

        const outsideSpace =
            viewportWidth - right;

        if (
            outsideSpace >=
            labelWidth + 12
        ) {

            // 外部
            overlay.rightLabel.style.left =
                `${right + distance / 2}px`;

            overlay.rightLabel.style.top =
                `${y + height / 2 - 8}px`;

            overlay.rightLabel.style.transform =
                'translateX(-50%)';

        } else {

            /*
             * 右边空间不足
             *
             * 放元素内部
             */

            overlay.rightLabel.style.left =
                `${Math.max(
                    x + width - labelWidth - 5,
                    x + width / 2
                )}px`;

            overlay.rightLabel.style.top =
                `${y + height / 2 - 8}px`;

            overlay.rightLabel.style.transform =
                'translateX(-100%)';
        }
    }

    // ============================================================
    // 估算文字宽度
    // ============================================================

    function estimateLabelWidth(
        value
    ) {

        return (
            String(
                Math.round(value)
            ).length * 7
            + 18
        );
    }

    // ============================================================
    // 更新全部
    // ============================================================

    function updateAll() {

        if (!enabled) {
            return;
        }

        // 当前元素
        if (currentElement) {

            const currentContainer =
                root.querySelector(
                    '[data-current="true"]'
                );

            if (currentContainer) {

                const overlay =
                    currentContainer.__overlay;

                if (overlay) {

                    updateMeasurement(
                        currentElement,
                        overlay
                    );
                }
            }
        }

        // 已锁定
        for (
            const [element, overlay]
            of pinnedElements
        ) {

            updateMeasurement(
                element,
                overlay
            );
        }
    }

    // ============================================================
    // 判断工具元素
    // ============================================================

    function isInspectorElement(
        element
    ) {

        return (
            element === root ||
            root.contains(element)
        );
    }

    // ============================================================
    // 忽略元素
    // ============================================================

    function shouldIgnore(
        element
    ) {

        if (
            !element ||
            element.nodeType !== 1
        ) {
            return true;
        }

        const tag =
            element.tagName.toLowerCase();

        return [
            'script',
            'style',
            'meta',
            'link',
            'noscript',
            'title'
        ].includes(tag);
    }

    // ============================================================
    // 数字
    // ============================================================

    function round(value) {

        if (
            Math.abs(
                value -
                Math.round(value)
            ) < 0.01
        ) {

            return Math.round(value);
        }

        return value.toFixed(1);
    }

    // ============================================================
    // 退出
    // ============================================================

    function disable() {

        if (!enabled) {
            return;
        }

        enabled = false;

        currentElement = null;

        pinnedElements.clear();

        root.remove();

        document.removeEventListener(
            'mousemove',
            handleMouseMove,
            true
        );

        document.removeEventListener(
            'click',
            handleClick,
            true
        );

        document.removeEventListener(
            'keydown',
            handleKeyDown,
            true
        );

        window.removeEventListener(
            'resize',
            updateAll,
            true
        );

        window.removeEventListener(
            'scroll',
            updateAll,
            true
        );
    }

})();
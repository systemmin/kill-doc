const fs = require('fs');
const path = require('path');
const Terser = require('terser');

const DIR = path.join(__dirname, "bookmark");
const MIN_DIR = path.join(DIR, "min");
const OUTPUT_FILE = path.join(DIR, "README.md");
const BEGIN=`# 书签脚本集

**这个目录下记录了一些书签脚本，无需油猴插件就可以执行的\`js\`代码。**

- \`min.js\`：表示已压缩可在浏览器执行的\`js\`代码
- 脚本命名：以网站域名命名
- 没有 \`min\`：源代码

## 书签脚本如何使用？

去[这里](https://dtking.cn/blog/BookmarkScript/)学习一哈，或者自行AI，或网上搜索。


## 网站列表

`

// 确保 min 目录存在
if (!fs.existsSync(MIN_DIR)) {
	fs.mkdirSync(MIN_DIR, { recursive: true });
}

// 压缩单个文件并生成 Markdown 模板
const compressCode = async (src, dst) => {
	const origin = fs.readFileSync(src, 'utf8');
	const lines = origin.split(/\r?\n/);
	const info = lines.slice(0, 5);
	const name = (info[0]?.split(" ")[2] || 'Unnamed').trim();

	const { code } = await Terser.minify(origin, {
		compress: false,
		mangle: false,
		output: {
			comments: false,
		}
	});

	fs.writeFileSync(dst, code, "utf-8");

	return `### ${name}

\`\`\`js
${info.join('\n')}
\`\`\`

#### 书签代码

\`\`\`js
${code}
\`\`\``;
};

// 主程序
(async () => {
	try {
		const files = fs.readdirSync(DIR).filter(file => file.endsWith('.js'));
		const tasks = files.map(async file => {
			const { name, ext } = path.parse(file);
			const src = path.join(DIR, file);
			const dst = path.join(MIN_DIR, `${name}.min${ext}`);
			return await compressCode(src, dst);
		});

		const parts = await Promise.all(tasks);
		fs.writeFileSync(OUTPUT_FILE, BEGIN+parts.join('\n\n'), 'utf-8');
		console.log('✅ README.md 已生成');
	} catch (err) {
		console.error('❌ 处理过程中出错：', err);
	}
})();

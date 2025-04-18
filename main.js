const fs = require('fs');
const Terser = require('terser');

// 读取原始的 JavaScript 文件
const code = fs.readFileSync('./bookmark/www.doc88.com.js', 'utf8');

// 使用 Terser 压缩代码并删除注释
 Terser.minify(code, {
  compress: false, // 不进行代码压缩，仅删除注释
  mangle: false,   // 不进行变量名混淆
  output: {
    comments: false // 删除所有注释
  }
}).then(res=>{
	console.log(res);
	fs.writeFileSync('./bookmark/www.doc88.com.min.js',res.code,"utf-8");
});

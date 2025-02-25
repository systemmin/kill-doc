<p align="center"><strong>宗旨就是你能看到多少，就能下载多少，挑战不可能</strong><p>
<p align="center">
    <a>
        <img src="https://img.shields.io/badge/jspdf-v2.4.0-blue?style=flat-square" alt="jspdf-v2" />
    </a>
    <a>
        <img src="https://img.shields.io/badge/@zip.js-v2.7.34-blue?style=flat-square" alt="UW2eVx.png" />
    </a> 
	<a>
        <img src="https://img.shields.io/badge/@html2canvas-v1.4.1-blue?style=flat-square" alt="UW2eVx.png" />
    </a>
    <a>
    <img alt="license" src="https://img.shields.io/badge/license-Apache2.0-blue?style=flat-square">
    </a>
</p>

这是一个用于 [Tampermonkey](https://www.tampermonkey.net/) 或其他支持用户脚本的浏览器扩展的 **kill-doc** 篡改猴脚本。

看到经常有小伙伴们需要下载一些免费文档，但是相关网站浏览体验不好各种广告，各种登录验证，需要很多步骤才能下载文档，该脚本就是为了解决您的烦恼而诞生，尽可能做到自动化。


## 安装
1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。[国内](https://www.crxsoso.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)安装
2. 点击 [脚本链接](https://cn-greasyfork.org/zh-CN/scripts/486211) 或手动复制脚本代码。
3. 在 Tampermonkey 中创建一个新脚本，将代码粘贴到编辑器中并保存。

## Q&A

### 1. 脚本已安装，页面没有右侧功能按钮？

[Q209: 开发者模式用于运行用户脚本](https://www.tampermonkey.net/faq.php#Q209)

### 2. 无法下载或文档失效

反馈问题请提供文档地址，不要直接说下载不了，用不了等等。**描述不清楚**一律不再回复。

## 留言

- **新增网站 [BASE64](https://base64.us/) 编码后**留言，留下网站首页以及文档详情页。

## 原理

常见在线预览文档技术原理：

- **提升图片质量与渲染速度**：对于将图片绘制成画布呈现的方式，可以通过优化图片压缩算法和提升渲染效率来改善用户体验。
- **增强二进制数据处理能力**：对于将二进制数据绘制到画布上的方法，可以优化数据处理逻辑，提高数据解析速度，减少延迟。
- **优化多种图片拼接技术**：在处理多种图片拼接页面渲染时，可以通过智能裁剪和图像处理技术，使页面渲染更加流畅和美观。
- **提高直接图片渲染的效率**：直接图片渲染可以减少数据转换环节，提高页面加载速度，同时可以通过懒加载等技术进一步提升性能。
- **改进矢量图片的拆分与定位技术**：拆分多个矢量小图片通过定位设置图片背景的方式，可以优化矢量图像的缩放和自适应，确保高质量的显示效果。
- **利用 `SVG` 和 `Blob Url`**：通过 `SVG` 渲染和 `Blob Url` 临时路径的方式，可以更好地支持动态和交互式的内容展示，同时保证文件的安全性。

⛔脚本只是将画布或图片在浏览器渲染时进行下载，拼接 PDF 文件，**无法下载原始文件，并非破解**。

## 平台

蓝色箭头开始（➡️）和结束（⬅️）同类型平台直接下载无需预览。

|                   **📖** 支持平台                    | 状态 | 自动预览 | 停止预览 | 下载图片 | 下载PDF | 获取文本 | 打印PDF | 获取地址 |
| :-------------------------------------------------: | :--: | :------: | :------: | :------: | :-----: | :------: | :-----: | :------: |
|        [百度文库](https://wenku.baidu.com/)         |  ✅   |    ✅     |    ✅     |  ✔️部分   |  ✔️部分  |  ✔️ 部分  |    ✅    |  ✔️ 部分  |
|       [原创力文档](https://max.book118.com/)        |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|       [人人文库](https://www.renrendoc.com/)        |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|          [360文库](https://wenku.so.com/)           |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|          [豆丁网](https://www.docin.com/)           |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|          [豆丁建筑](https://jz.docin.com/)          |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|         [道客巴巴](https://www.doc88.com/)          |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✔️     |    ❌    |    ❌     |
|         [MBA智库](https://doc.mbalib.com/)          |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✅     |    ❌    |    ❌     |
|       ➡️[得力文库](https://www.deliwenku.com/)       |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|          [七彩学科](https://www.7cxk.com/)          |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|        [金锄头](https://www.jinchutou.com/)         |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|        [爱问文库](https://ishare.iask.com/)         |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|       [蚂蚁文库](https://www.mayiwenku.com/)        |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|           [读根网](https://ww.dugen.com/)           |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|       [搜弘文库](https://wenku.chochina.com/)       |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|       [微传网](https://www.weizhuannet.com/)        |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|      [行业标准](https://hbba.sacinfo.org.cn/)⬅️      |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|         [淘豆网](https://www.taodocs.com/)          |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|     [GB](https://openstd.samr.gov.cn/bzgk/gb/)      |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|   [JJG](https://jjg.spc.org.cn/resmea/view/index)   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|        [轻竹办公](https://www.qzoffice.com/)        |  ✅   |    ❌     |    ❌     |    ✅     |    ❌    |    ❌     |    ✅    |    ❌     |
| [自然标准](http://www.nrsis.org.cn/portal/xxcx/std) |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|           [飞书](https://www.feishu.cn/)            |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |  ✔️部分   |    ❌    |    ❌     |
| [交通标准](http://www.jtysbz.cn/ysbz/fg/index.html) |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✅     |    ❌    |    ❌     |
|          [江苏计量](http://www.jsjlw.com)           |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|          [水利部](http://gjkj.mwr.gov.cn)           |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|    [招投标](https://bulletin.cebpubservice.com/)    |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✅     |    ❌    |    ❌     |
| [能源标准](http://114.251.111.103:18080/zxd/portal) |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|       [认证认可标准](http://rbtest.cnca.cn/)        |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|  [腾讯文档（来自微云）](https://weboffice.qq.com)   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|          [绿色建站](https://gbservice.cn/)          |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|          [电网](https://ecp.sgcc.com.cn/)          |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✅     |    ❌    |    ❌     |

之前支持后来移除的平台请移步 [kill-e-book](https://cn-greasyfork.org/zh-CN/scripts/497405-kill-e-book) 电子书下载脚本

## 功能

1. `F5` 刷新能解决大部分问题。
2. 功能按钮需依次执行，需等待上一个功能执行完成再执行下一个功能。
3. 像这样（1）➡️（2）➡️（3）➡️（4）
4. 特殊情况只需执行（3）


| 功能          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| （0）状态位   | 各个功能执行状态，当前进度。                                 |
| （0）加载速率 | 单位毫秒（ms），当前“MBA智库”，“交通”，“飞书”，“先晓书院”调整速率，默认500毫秒 |
| （1）自动预览 | 就是替你滚动页面，让所有页面进入可视范围内。百度须使用自动预览功能，其他手动也行。 |
| （2）停止预览 | 顾名思义就是停下来，别动了                                   |
| （3）下载图片 | 图片或文本或HTML等打压缩包下载，方便你们后续二次处理，例如：[OCR识别](https://github.com/hiroi-sora/Umi-OCR) |
| （3）下载PDF  | 图片合并导出 PDF 文件                                        |
| （4）获取文本 | 文本内容                                                     |
| （3）打印PDF  | 浏览器本身打印功能，鼠标右键”打印“或 `Ctrl` `+` `P` 键，“目标打印机处” 点击另存为PDF |
| （4）获取地址 | 导出图片地址二次处理，不一定有数据取决于文档类型             |
| （4）打包下载 | 包含html内容和txt内容，在浏览器打开html方便复制到excel中       |

## 使用说明

*如果下载 `PDF` 模糊，可 `下载图片`自行合并*

### 百度文库

1. **PDF**：可编辑，不可编辑，图片格式，下载PDF只支持图片格式。当遇到下载空白页时使用打印PDF功能。可编辑PDF 文件可以点击编辑文档，再自动预览打印PDF，这样就得到了一个可以复制内容的PDF文件。支持复制文本内容和全局文档复制功能（*左上角展示当前复制内容文本框*）
2. **TEXT**：点击自动预览后点击`获取全文`即可，可以使用过打印
3. **Word/PDF**：自动预览后就不能复制文本了，若要复制文本就不要执行自动预览
4. 可编辑文档，优先使用可编辑下预览

### 原创力

1. `PPT` 下载过程全屏预览不要缩小浏览器

### 道客巴巴

1. 获取文本功能需要预览全文，否则数据不完整

### MBA智库

1. 默认速率500可以下载文件，但是获取文本可能获取不完整，可以点击修改速率500改1500就可以获取到文本内容


### 豆丁网/建筑

1. 默认只展示一部分内容，获取更多内容需要登录。
2. 大文件下载（**上百页**）
   - 原始地址后面加参数 `?toImg=1`
   - 例如：原始地址 `https://www.example.com/p-123456.html` 改用 `https://www.example.com/p-123456.html?toImg=1` 地址访问。
   - 分页下载：先预览 100 页面，停止预览，下点下载。**刷新页面**，修改页码到100页，点击开始，继续重复上面步骤直到全部下载完成自行合并。

### GB688
* **canvas 格式** ：可调整预览速率
* **图片 格式** ：要输入验证码以后才可以进行相应操作


### 轻竹办公

等待系统生成结束点击 `下载图片` 即可。支持切换模板下载，支持编辑后再重新下载，反正就是能一直下载。

**注意**：下载后解压缩包，浏览器打开`index.html`，鼠标右键或 `Ctrl` `+` `P`  打印PDF，布局选择横向即可保存PDF。

### 飞书

支持 `PDF`、`PPTX`、`DOCX`、`XLSX` 、`TXT` 等格式文件。xlsx下载HTML格式需要浏览器打开复制再粘贴到excel中就可以了（保持原始格式）

阅读方式切换“**原貌阅读**”，点击右侧第6个按钮**适配页面**（可下载高清PDF），也可以通过 `+` `-` 调整合适的大小。遇到点击“自动预览”马上又停止了，点击停止预览再点击自动预览或F5刷新。

### 招投标

在文当预览页面有右侧第一个链接 **原始发布地址** ，点击进行预览下载。

### 腾讯文档

支持放大进行预览，要是文档模糊可以下载图片。预览中遇到卡顿可鼠标滚动一下页面。

### 绿色建站

- 默认预览页面文档较小，下载不清晰，加载是会自动打开原始地址预览（高清）
- 页面加载出来比较慢，大概10秒左右耐心等待
- 页面会*提示弹出窗口*，**请允许弹框**


## 历史

最新版本

- 2025/01/21 `v6.5` 金锄头无法下载 bug 处理 

历史版本

<details>
	<summary>点击查看</summary>
    <li><span>2024/12/23 </span><code>v6.4</code><span>360 无法下载 bug 处理  </span></li>
    <li><span>2024/12/19 </span><code>v6.3</code><span>优化百度PPT缺页问题 </span></li>
    <li><span>2024/12/16 </span><code>v6.2</code><span>新增电网 </span></li>
    <li><span>2024/12/15 </span><code>v6.1</code><span>GB无法下载ZIP bug </span></li>
    <li><span>2024/12/12 </span><code>v6.0</code><span>新增绿色网站😂 </span></li>
    <li><span>2024/10/05 </span><code>v5.9</code><span>优化GB页面错乱，预览时自动百分百</span></li>
    <li><span>2024/12/04 </span><code>v5.8</code><span>GB 网站更新优化</span></li>
    <li><span>2024/10/30 </span><code>v5.7</code><span>JJG缺少最后一页，删除百度AI拦截</span></li>
    <li><span>2024/10/17 </span><code>v5.6</code><span>优化失效文档</span></li>
    <li><span>2024/10/10 </span><code>v5.5</code><span>增加 腾讯文档</span></li>
    <li><span>2024/09/10 </span><code>v5.4</code><span>增加 GB 画布格式处理</span></li>
    <li><span>2024/09/10 </span><code>v5.3</code><span>优化 GB 遇到空白页 bug</span></li>
    <li><span>2024/09/10 </span><code>v5.2</code><span>优化 GB 遇到空白页 bug</span></li>
    <li><span>2024/08/02 </span><code>v5.1</code><span>优化标准观只能下载10页问题</span></li>
    <li><span>2024/08/29 </span><code>v5.0</code><span>GB优化在100%状态下预览</span></li>
    <li><span>2024/08/28 </span><code>v4.9</code><span>新增 认证认可标准</span></li>
    <li><span>2024/08/23 </span><code>v4.8</code><span>优化JJB放大后下载</span></li>
    <li><span>2024/08/15 </span><code>v4.7</code><span>优化道客巴巴PDF格式问题</span></li>
    <li><span>2024/08/02 </span><code>v4.6</code><span>新增 能源标准</span></li>
    <li><span>2024/07/31 </span><code>v4.5</code><span>新增 招投标</span></li>
    <li><span>2024/07/30 </span><code>v4.3</code><span>移除先晓书院，迁至 kill-e-book</span></li>
    <li><span>2024/07/24 </span><code>v4.2</code><span>豆丁优化，从指定页码开始预览</span></li>
    <li><span>2024/07/23 </span><code>v4.1</code><span>优化道客，删除记住页码功能</span></li>
    <li><span>2024/07/23 </span><code>v4.0</code><span>新增江苏计量、水利部。JJB 协议修改 https</span></li>
    <li><span>2024/07/11 </span><code>v3.9</code><span>道客空页面优化，支持从指定页码开始预览。</span></li>
    <li><span>2024/06/30 </span><code>v3.8</code><span>优化飞书，新增标准库</span></li>
    <li><span>2024/06/25 </span><code>v3.7</code><span>优化缺页问题</span></li>
    <li><span>2024/06/25 </span><code>v3.6</code><span>移除高教书苑</span></li>
    <li><span>2024/06/24 </span><code>v3.5</code><span>新增高教书苑，移除文泉，已知bug优化</span></li>
    <li><span>2024/06/23 </span><code>v3.4</code><span>新增先晓书院</span></li>
    <li><span>2024/06/21 </span><code>v3.3</code><span>新增交通标准</span></li>
	<li><span>2024/06/19 </span><code>v3.2</code><span>优化导出PDF格式，影响范围自然标准、道客、豆丁、淘豆等全部安装A4格式导出。</span></li>
	<li><span>2024/06/19 </span><code>v3.1</code><span>更新已知bug</span></li>
	<li><span>2024/06/19 </span><code>v3.0</code><span>优化横竖文档格式</span></li>
	<li><span>2024/06/18 </span><code>v2.9</code><span>优化已知bug</span></li>
	<li><span>2024/06/16 </span><code>v2.8</code><span>新增飞书</span></li>
	<li><span>2024/06/16 </span><code>v2.7</code><span>优化无法下载图片</span></li>
	<li><span>2024/06/16 </span><code>v2.6</code><span>新增自然资源</span></li>
	<li><span>2024/06/06 </span><code>v2.5</code><span>优化文泉空白页面，页面丢失问题</span></li>
	<li><span>2024/06/06 </span><code>v2.4</code><span>优化文泉记住页码</span></li>
	<li><span>2024/06/06 </span><code>v2.3</code><span>优化文泉书局 </span></li>
	<li><span>2024/06/06 </span><code>v2.2</code><span>增加文泉书局 </span></li>
	<li><span>2024/05/28 </span><code>v2.1</code><span> 大版本更新，影响网站较多，有问题及时反馈</span>
		<li>
			<ul>
				<li>所有网站图片下载处理优化，提升下载速度。来自 <a
						href="https://greasyfork.org/zh-CN/users/398437-joyoffire">（JoyofFire）</a>建议，脚本反馈处查看详情。
				</li>
				<li>MBA智库内容部分修改，脚本也重新做了兼容</li>
				<li>百度文库、爱问文库、豆丁建筑、道客等优化</li>
			</ul>
		</li>
	</li>
	<li><span>2024/05/21 </span><code>v2.0</code><span> 豆丁特殊格式优化处理，wxdown 软件上线了</span></li>
	<li><span>2024/05/18 </span><code>v1.9</code><span> 新增 轻竹办公</span></li>
	<li><span>2024/05/11 </span><code>v1.8</code><span> 新增 行业标准</span></li>
	<li><span>2024/05/10 </span><code>v1.7</code><span> 新增 sheng tong </span></li>
	<li><span>2024/04/26 </span><code>v1.6</code><span> 优化“计量”脚本无法加载菜单问题</span></li>
	<li><span>2024/04/26 </span><code>v1.5</code><span> 新增“计量”</span></li>
	<li><span>2024/04/08 </span><code>v1.4</code><span> 淘豆网增加“获取文本”功能、优化原创力 PPTX 文件下载 bug</span></li>
	<li><span>2024/03/19 </span><code>v1.3</code><span> 增加/优化“获取文本”内容-道客-智库</span></li>
	<li><span>2024/03/13 </span><code>v1.2</code><span> 增加（GB/gb688）网</span></li>
	<li><span>2024/03/11 </span><code>v1.1</code><span> 优化百度文库打印文档问题、增加 Word Txt 类型文档获取文本原格式、隐藏文心一言框</span>
		</li>
	<li><span>2024/03/04 </span><code>v1.0</code><span> 原创力PPT从自定页码开始预览</span></li>
	<li><span>2024/02/27 </span><code>v0.9</code><span> 替换 zip 资源路径,因之前引入链接部分区域可能无法正常加载,导致脚本无法正常执行。</span>
		</li>
	<li><span>2024/02/27 </span><code>v0.8</code><span> 新增360文库、读根网、搜弘、微传网、淘豆网等5个平台</span></li>
	<li><span>2024/02/26 </span><code>v0.7</code><span> 修改百度文库 tfview 路径下PPT无法下载问题</span></li>
	<li><span>2024/02/23 </span><code>v0.6</code><span> 新增5个文库平台</span></li>
	<li><span>2024/02/21 </span><code>v0.5</code><span> 增加百度-豆丁-道客-豆丁建筑</span></li>
	<li><span>2024/02/02 </span><code>v0.4</code><span> 优化已知bug</span></li>
	<li><span>2024/02/01 </span><code>v0.3</code><span> 优化调试信息</span></li>
	<li><span>2024/02/01 </span><code>v0.2</code><span> 初版发布</span></li>
	</ul>
</details>

## 贡献

我们欢迎任何形式的贡献，包括报告问题、提出建议、提交代码或文档。请参考[贡献指南](https://github.com/systemmin/kill-doc/issues)了解如何参与贡献。

*感谢💪所有贡献者*

<a href="https://github.com/kristyzhy" target="_blank" rel="noopener">
<img width="50px" src="https://avatars.githubusercontent.com/u/27731955?s=50" style="max-width: 100%;">
</a>

## 授权

@license 篡改猴脚本遵循 [Apache-2.0](https://spdx.org/licenses/Apache-2.0.html)

## 兼容性
谷歌浏览器

## 注意事项
**注意：** 请确保遵循网站的使用条款和政策。自行承担风险。

- 本脚本完全免费。
- 仅供学习交流，严禁用于商业用途，请勿传播下载的数据。
- 本脚本所获取的资源完全合法，与浏览器能直接获得的资源一致，不存在逆向破解。
- 使用脚本造成的影响由使用者承担。

## 联系方式

如果您有任何问题或建议或合作或定制（有偿），请通过以下方式联系我们：

- 邮箱：[robots_user@qq.com](mailto:robots_user@qq.com)
- GitHub：[kill-doc](https://github.com/systemmin/kill-doc)

感谢使用篡改猴脚本！

## 鼓励作者

**您**的鼓励💪就是我前进的动力🫶鼓励方式有多种，选择你喜欢的😍，当然不鼓励也没关系哦！😄

- [好评 ](https://greasyfork.org/zh-CN/scripts/486211-%E6%9C%80%E5%BC%BA%E6%97%A0%E5%A5%97%E8%B7%AF%E8%84%9A%E6%9C%AC-%E4%BD%A0%E8%83%BD%E7%9C%8B%E8%A7%81%E5%A4%9A%E5%B0%91%E6%88%91%E8%83%BD%E4%B8%8B%E8%BD%BD%E5%A4%9A%E5%B0%91-%E4%B8%8B%E8%BD%BD%E5%85%AC%E5%BC%80%E5%85%8D%E8%B4%B9%E7%9A%84ppt-pdf-doc-txt%E7%AD%89%E6%96%87%E4%BB%B6/feedback)✍️
- [GitHub Start](https://github.com/systemmin/kill-doc)⭐
- 打赏💰（*量力而行，并不推荐*）
  - 大家赚钱老难了😭
  - 有钱谁用脚本啊！😲
  - 当然土豪可以随便赏小弟🤭

- [鸣谢](https://github.com/systemmin/kill-doc/blob/master/AMOUNT.md) 🫡

<img src="https://dtking.cn/pay.png" alt="赞赏" style="zoom: 67%;" />

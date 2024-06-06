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

## 延伸

**最近开发了一款[wxdown公众号离线文章保存](https://www.cnblogs.com/bxmm/p/18201389)软件，老规矩公开免费使用**。后续可能考虑和当前脚本互连互通，进行本地管理自己下载的文件和本地下载大文件，有需要自行下载。

[GitHub 地址](https://github.com/systemmin/wxdown)

## 安装
1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。[国内](https://www.crxsoso.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)安装
2. 点击 [脚本链接](https://greasyfork.org/zh-CN/scripts/486211-%E7%99%BE%E5%BA%A6-%E5%8E%9F%E5%88%9B%E5%8A%9B-%E4%BA%BA%E4%BA%BA-%E8%B1%86%E4%B8%81-%E9%81%93%E5%AE%A2-%E8%B1%86%E4%B8%81%E5%BB%BA%E7%AD%91) 或手动复制脚本代码。
3. 在 Tampermonkey 中创建一个新脚本，将代码粘贴到编辑器中并保存。

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

|                 **📖** 支持平台                 | 状态 | 自动预览 | 停止预览 | 下载图片 | 下载PDF | 获取文本 | 打印PDF | 获取地址 |
| :--------------------------------------------: | :--: | :------: | :------: | :------: | :-----: | :------: | :-----: | :------: |
|      [百度文库](https://wenku.baidu.com/)      |  ✅   |    ✅     |    ✅     |  ✔️部分   |  ✔️部分  |  ✔️ 部分  |    ✅    |  ✔️ 部分  |
|     [原创力文档](https://max.book118.com/)     |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|     [人人文库](https://www.renrendoc.com/)     |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|        [360文库](https://wenku.so.com/)        |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|        [豆丁网](https://www.docin.com/)        |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|       [豆丁建筑](https://jz.docin.com/)        |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|       [道客巴巴](https://www.doc88.com/)       |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✔️     |    ❌    |    ❌     |
|       [MBA智库](https://doc.mbalib.com/)       |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ✅     |    ❌    |    ❌     |
|    ➡️[得力文库](https://www.deliwenku.com/)     |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|       [七彩学科](https://www.7cxk.com/)        |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|      [金锄头](https://www.jinchutou.com/)      |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|      [爱问文库](https://ishare.iask.com/)      |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|     [蚂蚁文库](https://www.mayiwenku.com/)     |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|        [读根网](https://ww.dugen.com/)         |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|    [搜弘文库](https://wenku.chochina.com/)     |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|     [微传网](https://www.weizhuannet.com/)     |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|   [行业标准](https://hbba.sacinfo.org.cn/)⬅️    |  ✅   |    ❌     |    ❌     |    ✅     |    ✅    |    ❌     |    ❌    |    ✅     |
|       [淘豆网](https://www.taodocs.com/)       |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|   [GB](https://openstd.samr.gov.cn/bzgk/gb/)   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
| [JJG](http://jjg.spc.org.cn/resmea/view/index) |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |
|     [轻竹办公](https://www.qzoffice.com/)      |  ✅   |    ❌     |    ❌     |    ✅     |    ❌    |    ❌     |    ✅    |    ❌     |
|   [文泉书局](https://wqbook.wqxuetang.com/)    |  ✅   |    ✅     |    ✅     |    ✅     |    ✅    |    ❌     |    ❌    |    ❌     |


## 功能

1. `F5` 刷新能解决大部分问题。
2. 功能按钮需依次执行，需等待上一个功能执行完成再执行下一个功能。
3. 像这样（1）➡️（2）➡️（3）➡️（4）
4. 特殊情况只需执行（3）


| 功能          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| （0）状态位   | 各个功能执行状态，当前进度。                                 |
| （0）加载速率 | 单位毫秒（ms），当前仅支持“MBA智库”调整速率，默认500毫秒     |
| （1）自动预览 | 就是替你滚动页面，让所有页面进入可视范围内。百度须使用自动预览功能，其他手动也行。 |
| （2）停止预览 | 顾名思义就是停下来，别动了                                   |
| （3）下载图片 | 图片或文本或HTML等打压缩包下载，方便你们后续二次处理，例如：[OCR识别](https://github.com/hiroi-sora/Umi-OCR) |
| （3）下载PDF  | 图片合并导出 PDF 文件                                        |
| （4）获取文本 | 文本内容                                                     |
| （3）打印PDF  | 浏览器本身打印功能，鼠标右键”打印“或 `Ctrl` `+` `P` 键，“目标打印机处” 点击另存为PDF |
| （4）获取地址 | 导出图片地址二次处理，不一定有数据取决于文档类型             |

## 使用


| 平台            | 说明                                                         |
| :-------------- | ------------------------------------------------------------ |
| 百度文库        | `PDF` 格式分为：可编辑，不可编辑，图片格式，下载PDF只支持图片格式。当遇到下载空白页时使用打印PDF功能。可编辑PDF 文件可以点击编辑文档，再自动预览打印PDF，这样就得到了一个可以复制内容的PDF文件。支持复制文本内容和全局文档复制功能（*左上角展示当前复制内容文本框*）。<br />`text `类型点击自动预览后点击`获取全文`即可，可以使用过打印。<br />其他类型文件自行探索大部分都支持。<br />`word/PDF` 自动预览后就不能复制文本了，若要复制文本就不要执行自动预览。<br />**可编辑文档优先使用可编辑下预览** |
| 原创力文档      | `PPT` 下载过程全屏预览不要缩小浏览器                         |
| 人人文库        | 从侧边栏“相似文档”点击切换文档可能无法下载，需要 `F5` 刷新后就可以了 |
| 豆丁网/豆丁建筑 | 想要获取更多文章内容需要登录自己账号，默认只展示一部分内容。 |
| 道客巴巴        | 获取文本功能需要预览全文，否则数据不完整                     |
| MBA智库         | 官网改版，脚本已更新。需要注意默认速率500可以下载文件，但是获取文本可能获取不完整，可以点击修改速率500改1500就可以获取到文本内容 |
| GB              | 要输入验证码以后才可以进行相应操作                           |
| JJG             | 文档阅读页面下载                                             |
| 轻竹办公        | 等待系统生成结束点击 `下载图片` 即可。支持切换模板下载，支持编辑后再重新下载，反正就是能一直下载。<br />**注意**：下载后解压缩包，浏览器打开`index.html`，鼠标右键或 `Ctrl` `+` `P`  打印PDF，布局选择横向即可保存PDF。 |
| 文泉书局        | 仅支持`PDF`，仅可见内容。 注意切换 **原貌** 预览。           |

## 历史

最新版本

- 2024/06/6 `v2.3` 优化文泉书局


历史版本

<details>
			<summary>点击查看</summary>
			<ul>
				<li><span>2024/06/06 </span><code>v2.2</code><span>增加文泉书局 </span></li>
				<li><span>2024/05/28 </span><code>v2.1</code><span> 大版本更新，影响网站较多，有问题及时反馈</span>
					<ul>
						<li>所有网站图片下载处理优化，提升下载速度。来自 <a
								href="https://greasyfork.org/zh-CN/users/398437-joyoffire">（JoyofFire）</a>建议，脚本反馈处查看详情。
						</li>
						<li>MBA智库内容部分修改，脚本也重新做了兼容</li>
						<li>百度文库、爱问文库、豆丁建筑、道客等优化</li>
					</ul>
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

如果您有任何问题或建议或合作或定制，请通过以下方式联系我们：

- 邮箱：[2441553829@qq.com](mailto:2441553829@qq.com)
- GitHub：[kill-doc](https://github.com/systemmin/kill-doc)

感谢使用篡改猴脚本！

## 鼓励作者

**您**的鼓励💪就是我前进得动力🫶鼓励方式有多种，选择你喜欢的😍，当然不鼓励也没关系哦！😄

- [好评 ](https://greasyfork.org/zh-CN/scripts/486211-%E6%9C%80%E5%BC%BA%E6%97%A0%E5%A5%97%E8%B7%AF%E8%84%9A%E6%9C%AC-%E4%BD%A0%E8%83%BD%E7%9C%8B%E8%A7%81%E5%A4%9A%E5%B0%91%E6%88%91%E8%83%BD%E4%B8%8B%E8%BD%BD%E5%A4%9A%E5%B0%91-%E4%B8%8B%E8%BD%BD%E5%85%AC%E5%BC%80%E5%85%8D%E8%B4%B9%E7%9A%84ppt-pdf-doc-txt%E7%AD%89%E6%96%87%E4%BB%B6/feedback)✍️
- [GitHub Start](https://github.com/systemmin/kill-doc)⭐
- 打赏💰（*量力而行，并不推荐*）
  - 大家赚钱老难了😭
  - 有钱谁用脚本啊！😲
  - 当然土豪可以随便赏小弟🤭

- [鸣谢](https://github.com/systemmin/kill-doc/blob/master/AMOUNT.md)🫡

，<img src="https://dtking.cn/pay.png" alt="赞赏" style="zoom: 67%;" />

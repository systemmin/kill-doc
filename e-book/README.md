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
这是一个用于 [Tampermonkey](https://www.tampermonkey.net/) 或其他支持用户脚本的浏览器扩展的 [e-book](https://github.com/systemmin/kill-doc/blob/master/e-book/index.js) 篡改猴脚本。

电子书分页下载，考虑到文件大小内存等因素，采用分页下载。**请务必使用谷歌浏览器**

## 安装
1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展。[国内](https://www.crxsoso.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)安装
2. 点击 [脚本链接](https://greasyfork.org/zh-CN/scripts/497405) 或手动复制脚本代码。
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

|                   **📖** 支持平台                    | 状态 | 页码 | 页面容量 | 开始执行 | 结束执行 | 继续预览 | 停止预览 | 下载PDF |
| :-------------------------------------------------: | :--: | :--: | :------: | :------: | :------: | :------: | -------- | ------- |
| [文泉书局（北理工）](https://wqbook.wqxuetang.com/) |  ✅   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅     | ✅        | ✅       |
|        [高教书苑](https://ebook.hep.com.cn/)        |  ✅   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅     | ✅        | ✅       |
|     [中教经典](https://www.zjjd.cn/zhongtufa/)      |  ✅   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅     | ✅        | ✅       |
|          [可知](https://www.keledge.com/)           |  ✅   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅     | ✅        | ✅       |
|      [先晓书院](https://xianxiao.ssap.com.cn/)      |  ✅   |  ✅   |    ✅     |    ✅     |    ✅     |    ✅     | ✅        | ✅       |


## 功能

1. `F5` 刷新能解决大部分问题。
2. 功能按钮需依次执行，需等待上一个功能执行完成再执行下一个功能。
3. 像这样（1）➡️（2）➡️（3）➡️（4）➡️（5）


| 功能          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| （0）状态位   | 各个功能执行状态，当前进度。                                 |
| （1）页码     | 从第几页开始执行                                             |
| （1）页面容量 | 每次预览多少页，达到指定页数自动下载一次                     |
| （2）开始执行 | 开始自动预览并分页下载                                       |
| （3）结束执行 | 终止，不可继续预览，清空缓存信息。要想开始点击“开始执行”     |
| （5）继续预览 | 停止预览后恢复按钮                                           |
| （4）停止预览 | 暂停一下，可以点击“继续预览”恢复                             |
| （6）下载PDF  | 一般情况不需手动下载，分页会自动下载。当测试暂停也可以自己下载 |

## 使用

正常情况先设置好 `页码` 和 `页面容量`，再开始执行。有问题需要点击 “结束执行” 再 F5 刷新。

### 先晓书院

- 选择**原貌阅读**，请先调整预览界面大小再开始执行，否则下载的 `PDF ` 可能很模糊
- 右侧有 `+` `-` 放大和缩小按钮

## 历史

最新版本 `v1.0.8` 新增 先晓书院

- 2024/06/30 `v1.0.3` 新增 高教书苑
- 2024/07/11 `v1.0.4` 新增 bit
- 2024/07/19 `v1.0.5` 新增 优化已知bug
- 2024/07/19 `v1.0.6` 新增 中教经典
- 2024/07/27 `v1.0.7` 新增 可知
- 2024/07/30 `v1.0.8` 新增 先晓书院

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

- [鸣谢](https://github.com/systemmin/kill-doc/blob/master/AMOUNT.md) 🫡

<img src="https://dtking.cn/pay.png" alt="赞赏" style="zoom: 67%;" />

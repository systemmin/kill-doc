# AutoX 脚本

- GitHub：[AutoX](https://github.com/kkevsekk1/AutoX)
- 开发文档：[Doc](http://doc.autoxjs.com/#/documentation)
- VSCode插件：[Auto.js-Autox.js-VSCodeExt](https://marketplace.visualstudio.com/items?itemName=aaroncheng.auto-js-vsce-fixed)

一个支持无障碍服务的 `Android` 平台上的 `JavaScript` 运行环境 和 开发环境，其发展目标是类似 [`JsBox`](https://apps.apple.com/cn/app/jsbox-%E5%AD%A6%E4%B9%A0%E5%86%99%E4%BB%A3%E7%A0%81/id1312014438) 和 `Workflow`。

## 前提条件

1. 你需要一个安卓手机
2. 你需要安装 [AutoX apk](https://github.com/kkevsekk1/AutoX/releases)
3. 你需要一点动手能力
4. 手机需要打开无障碍功能才能执行脚本

如果以上条件不能满足也没关系，网上冲浪也是可以的。

## 脚本说明

- wx_bill：微信账单导出脚本
- kugou_love：酷狗我的收藏歌单导出

## 微信账单

微信是支持账单导出的（**钱包**->**账单**->**下载账单**->**用于个人对账**），有时间和格式限制。使用脚本没有时间和格式限制，需要指定账单截止日期即可。

### 功能列表

- 导出格式
  - csv (默认)
  - json
  - txt (微信默认格式)
  - md
- 导出时间范围
  - 示例：2024年10月，和账单筛选时间范围一致


### 使用说明

1. 执行脚本前先打开**微信账单**页面
2. 再返回 `autox` 页面执行脚本
3. 执行结束会返回到 `autox` 页面
4. 默认保存文件在 `/sdcard/Download/` 目录

### 实现思路

使用 `autox` 获取页面布局信息一般常用 `id` 或 `className` 获取页面布局信息，但是微信账单页面都没有 `id` 和 `className`，只能获取最外面的容器 `android.webkit.WebView`，一层一层剥洋葱了。下面是页面布局的大概结构

**布局结构**

```html
<view classNam="android.webkit.WebView">
    <view >
        <!-- 筛选条件 -->
        <view >
            <view >
                <button>全部账单</button>
                <button>统计</button>
            <view />
        <view />
        <!-- 账单列表 -->
        <view >
            <view >
                <!-- 两行 view 是一个整体，第一个月份统计，第二月份收入明细 -->
                <view >
                    <view >
                        <view >
                            <button>2024-11</button>
                            <view class="android.widget.TextView">支出<view />
                            <view class="android.widget.TextView">￥200<view />
                            <view class="android.widget.TextView">收入<view />
                            <view class="android.widget.TextView">￥200<view />
                        <view />
                    <view />
                <view />
                <view >
                    <!-- 明细 -->
                    <view >
                        二维码收款-来自计xxxx,11月00日00点00分,收入0.00元,按钮。点按两次并按住可长按
                    <view />
                    <view >
                        二维码收款-来自计xxxx,11月00日00点00分,收入0.00元,按钮。点按两次并按住可长按
                    <view />
                    <view >
                        二维码收款-来自计xxxx,11月00日00点00分,收入0.00元,按钮。点按两次并按住可长按
                    <view />
                    <!-- ......更多 -->
                <view />
            <view />
        <view />  
    <view />
    <view classNam="android.app.Dialog" ><view />
<view />
```

### 导出示例

**txt**

```text
2024年10月	支出￥200.00元 收入￥245.89元
二维码收款-来自计*g     +10.00
2024-10-30 08:48:00
二维码收款-来自B*m     +1.00
2024-10-24 10:53:00
二维码收款-来自L*S     +5.00
2024-10-22 16:56:00
二维码收款-来自*鹿      +6.00
2024-10-18 07:44:00
转账-来来xxxx- yo      +100.00
2024-10-17 16:00:00
二维码收款-来xxxx- yo  +18.88
2024-10-17 14:46:00
…………省略
```

**md**

```text
| 时间                | 用户名       | 类型       | 金额    |
| ------------------- | ------------ | ---------- | ------- |
| 2024-10-30 08:48:00 | 来自计\*g    | 二维码收款 | +10.00  |
| 2024-10-24 10:53:00 | 来自B\*m     | 二维码收款 | +1.00   |
| 2024-10-22 16:56:00 | 来自L\*S     | 二维码收款 | +5.00   |
| 2024-10-18 07:44:00 | 来自\*鹿     | 二维码收款 | +6.00   |
| 2024-10-17 16:00:00 | 来自xxxx- yo | 转账       | +100.00 |
| 2024-10-17 14:46:00 | 来自xxxx- yo | 二维码收款 | +18.88  |
…………省略
```

**csv**

```text
时间,用户名,类型,资金
2024-10-30 08:48:00,来自计*g,二维码收款,+10.00
2024-10-24 10:53:00,来自B*m,二维码收款,+1.00
2024-10-22 16:56:00,来自L*S,二维码收款,+5.00
2024-10-18 07:44:00,来自*鹿,二维码收款,+6.00
2024-10-17 16:00:00,来自xxxx- yo,转账,+100.00
2024-10-17 14:46:00,来自xxxx- yo,二维码收款,+18.88
…………省略
```


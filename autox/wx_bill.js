
/**
 * @description wx 账单导出脚本
 * 1、执行脚本前先打开微信账单页面
 * 2、返回 autox 页面执行脚本
 * 3、执行结束会返回到 autox 页面
 * 4、默认保存文件在 Download 目录
 * @author Mr.Fang
 * @time 2024年11月4日12:01:39
 */

// 等待打开无障碍继续执行
auto.waitFor();

let endFlag = false; // 结束标识
let format = "csv"; // 默认导出格式
let endCondition = '2024年7月'; // 默认截止日期
const savePath = '/sdcard/Download/';  // 本地路径
const options = ["json", "md", "txt", "csv"]; // 导出格式
const listData = []; // 账单数据
const keyMap = new Map(); // 存放日期


/**
 * 字符串日期转标准日期
 * @param {*} inputDate 2024年10月22日7时8分
 * @returns 
 */
function convertDateTime(inputDate) {
    // 解析输入的日期字符串
    const match = inputDate.match(/(\d+)年(\d+)月(\d+)日(\d+)点(\d+)分/);
    if (!match) {
        return '输入的日期格式不正确';
    }
    if (match) {
        const year = match[1];
        const month = String(match[2]).padStart(2, '0'); // 确保月份为两位
        const day = String(match[3]).padStart(2, '0'); // 确保日期为两位
        const hour = String(match[4]).padStart(2, '0'); // 转换为24小时制
        const minute = String(match[5]).padStart(2, '0'); // 确保分钟为两位

        // 构建标准时间格式
        const standardTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
        return standardTime;
    } else {
        console.log('输入格式不正确');
    }
    return "";
}

/**
 * 验证截止日期
 * @param {*} inputDate 2024年10月
 * @returns 
 */
function verifyDateTime(inputDate) {
    // 解析输入的日期字符串
    const dateParts = inputDate.match(/(\d+)年(\d+)月/);
    if (!dateParts) {
        return '输入的截止日期不正确';
    }
    return '';
}

/**
 * 
 * @returns 返回最大长度
 */
function calcMaxLength() {
    const mergedArray = listData.reduce((acc, item) => { return acc.concat(item.list) }, []);
    return mergedArray.reduce((max, item) => Math.max(max, (item.type ? item.type.length : 0) + item.user.length), 10);
}


// 转 csv
function textConvertCSV() {
    // 输出 csv 格式
    let text = '时间,用户名,类型,资金\n';
    const mergedArray = listData.reduce((acc, item) => { return acc.concat(item.list) }, []);
    for (let item of mergedArray) {
        let { time, user, type, amount } = item;
        text += `${time},${user},${type},${amount}\n`;
    }
    return text;
}

// 转 md
function textConvertMD() {
    let text = "| 时间               | 用户名 | 类型 | 金额 |\n";
    text += "| ------------------ | ------ | ---- | ---- |\n";
    const mergedArray = listData.reduce((acc, item) => { return acc.concat(item.list) }, []);
    for (let item of mergedArray) {
        let { time, user, type, amount } = item;
        if (user.includes("*")) {
            user = user.replace("*", "\\*");
        }
        text += `|${time}|${user}|${type}|${amount}|\n`;
    }
    return text;
}

// 转 txt
function textConvertTxt() {
    let text = "";
    const maxlength = calcMaxLength();
    for (let item of listData) {
        let { key, list } = item;
        let keys = key.split('|');
        text += `${keys[0]}\t\t支出￥${keys[1]} 收入￥${keys[2]}\n`;
        list.forEach(detail => {
            // 构造空字符
            let padding = ' '.repeat(maxlength - (detail.type ? detail.type.length : 0) - detail.user.length);
            text += `${detail.type}-${detail.user}${padding}${detail.amount}\n`;
            text += `${detail.time}\n`;
        })
        text += '\n\n';
    }
    return text;
}

/**
 * 保存到本地
 */
function saveLocal() {
    // 输出 csv 格式
    let content = '';
    switch (format) {
        case 'csv': content = textConvertCSV(); break;
        case 'md': content = textConvertMD(); break;
        case 'txt': content = textConvertTxt(); break;
        default: content = JSON.stringify(listData);
    }
    const fullPath = savePath + endCondition + '.' + format
    files.write(fullPath, content)
    console.log('文件写入成功:', fullPath);
    return fullPath;
}

/**
 * 字符串金额转金额
 * @param {*} transaction 
 * @returns 
 */
function convertAmount(transaction) {
    // 使用正则表达式提取金额
    const amountMatch = transaction.match(/(\d+\.?\d*)元/);
    if (!amountMatch) return '无效的交易格式';

    // 提取金额并转换为浮点数
    const amount = parseFloat(amountMatch[1]);

    // 根据交易类型添加正负号
    if (transaction.includes('收入')) {
        return `+${amount.toFixed(2)}`;
    } else if (transaction.includes('支出')) {
        return `-${amount.toFixed(2)}`;
    } else {
        return '无效的交易类型';
    }
}

// 定义一个函数来比较两个对象是否相等
function isSameEntry(entryA, entryB) {
    return entryA.user === entryB.user && entryA.time === entryB.time && entryA.amount === entryB.amount;
}

/**
 * 添加账单数据
 * @param {*} key 日期
 * @param {*} data 明细
 */
function addBill(key, data) {
    if (keyMap.has(key)) {
        let index = keyMap.get(key);
        let { list } = listData[index];
        // 过滤掉arrayA中存在于arrayB的项
        let filtered = list.filter(a => !data.some(b => isSameEntry(a, b)));
        // 合并 filtered 和 data
        listData[index].list = filtered.concat(data);
    } else {
        let index = listData.length;
        listData.push({ key: key, list: data });
        keyMap.set(key, index);
    }
}

function loadData() {
    // 获取页面根账单节点
    let webView = className("android.webkit.WebView").findOne(1000);
    // 账单列表节点
    let elements = webView.children()[0].children()[1].children()[0].children();
    // 节点数量
    let length = elements.length;
    console.log("账单数量:", length);
    for (let i = 0; i < length; i += 2) {
        console.log(i);
        if (i + 1 >= length) {
            console.log('提前结束')
            break;
        }
        // 月份统计数据 示例：2024年11月 支出$00.00收入$00.00
        let firstChildrens = elements[i].children();
        // 账单列表 示例：二维码收款-来自*M,10月18日7点44分,+6.00,……
        let lastChildrens = elements[i + 1].children();
        if (firstChildrens.length === 0) {
            console.log('跳过空节点')
            continue;
        }
        console.log('firstChildrens:', firstChildrens.length);
        console.log('lastChildrens:', lastChildrens.length);

        let months = firstChildrens[0].children().length === 1 ? firstChildrens[0].children()[0].children() : firstChildrens[0].children();
        console.log('months', months.length)
        if (months.length === 0) {
            continue;
        }
        let year = months[0].text();
        if (year === endCondition) {
            endFlag = true;
            console.log("提前结束")
            return true;
        }
        let output = months[2].text();
        let input = months[4].text();
        console.log(`时间：${year} 支出：${output} 收入：${input}`)

        let listTemp = [];
        lastChildrens.forEach(item => {
            // 二维码收款-来自计*xxx,10月30日8点48分,收入1.00元,按钮。点按两次并按住可长按
            let text = item.text();
            if (text) {
                let list = text.split(',');
                list.pop();
                // 收入类型-用户 时间 收入 支出
                let user = list[0], type = "";
                let firstIndex = user.indexOf('-');
                if (firstIndex != -1) {
                    type = user.substring(0, firstIndex);
                    user = user.substring(firstIndex + 1);
                }
                let time = convertDateTime(year.substring(0, 5) + list[1]);
                let amount = convertAmount(list[2]);
                console.log(time, '\t', type, '\t', user, '\t', amount);
                listTemp.push({ time, type, user, amount })
            }
        })
        addBill(year + "|" + output + "|" + input, listTemp);
    }
    // 结束标识
    if (length >= 2) { // 倒数第二个结束标识
        const end = elements[length - 2];
        const entText = end.children()[0].text();
        console.log('entText', entText);
        if (entText === "暂无更多记录") {
            return true;
        }
    }
    // 滚动页面
    webView.scrollForward();
    return false;
}


/**
 * 定时器，每隔 5 秒执行一次
 */

function startInterval() {
    launch("com.tencent.mm");
    sleep(2000);
    const button = text("全部账单").findOne(1000);
    if (button) {
        const interval = setInterval(() => {
            if (endFlag) {
                clearInterval(interval);
                const local = saveLocal();
                launch("org.autojs.autoxjs.v7");
                sleep(1000);
                alert("保存路径" + local)
            } else {
                endFlag = loadData();
            }
        }, 1000)
    } else {
        launch("org.autojs.autoxjs.v7");
        sleep(1000);
        toast("请打开账单页面")
    }
}

/**
 * 开始方法
 */
function start() {
    const input = dialogs.rawInput("请输入截止年月", endCondition);
    console.log('input:', input);
    const result = verifyDateTime(input);
    if (result) {
        toastLog(result);
    } else {
        endCondition = input
        const selectIndex = dialogs.singleChoice("请选择导出格式", options, 3);
        format = options[selectIndex];
        console.log(format);
        toastLog("开始执行");
        startInterval();
    }
}

start();

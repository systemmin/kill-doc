
// 启动酷狗
launch("com.kugou.android");


sleep(2000)

const listData = [];                            // 临工存放数据
const filePath = '/sdcard/Download/music.csv';  // 本地路径
let flag = '';                                  // 结束标识

/**
 * 添加歌曲
 * @param {*} name 
 * @param {*} author 
 * @param {*} vip 
 */
function addItem(name, author, vip) {
    const filter = listData.filter(item => item.name === name && item.author === author)
    if (!filter.length && name) {
        listData.push({ name, author, vip });
    }
}

/**
 * 保存到本地
 */
function writeMusic() {
    // 输出 csv 格式
    let text = '名称,作者,VIP\n';
    for (let item of listData) {
        let { name, author, vip } = item;
        text += `${name},${author},${vip}\n`;
    }
    files.write(filePath, text)
    console.log('文件写入成功', filePath)
}


/**
 * 加载歌曲列表，并滚动页面
 */
function loadList() {
    let listBox = className("androidx.recyclerview.widget.RecyclerView").findOnce(1);
    listBox.children().forEach((child, i) => {
        log(i)

        if (child) {
            flag = child.findOne(id("enu")); // 结束按钮
            var b2w = child.findOne(id("b2w")); // 歌名
            var b2x = child.findOne(id("b2x")); // 作者
            var v8x = child.findOne(id("v91")); // VIP
            let name = '', author = '', vip = false;
            if (flag) {
                console.log('已全部加载完成！')
            }
            if (b2w) {
                name = b2w.text();
            }
            if (b2x) {
                author = b2x.text()
            }
            if (v8x) {
                vip = true;
            }
            addItem(name, author, vip)
        }

    });
    listBox.scrollForward();

}

/**
 * 定时器，每隔 5 秒执行一次
 */
const music = setInterval(() => {
    if (flag) {
        clearInterval(music)
        console.log('结束')
        writeMusic()
    } else {
        loadList();
    }
}, 500)


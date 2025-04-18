# 书签脚本库

## [临床指南](https://guide.medlive.cn/)

`https://guide.medlive.cn/cloud/guide/view?id=9005&sub_type=3&file_id=e7147a21bb94f707dbb3d88e6bb415c2`

```js
javascript: const src=document.querySelector('iframe').src;const downloadUrl=src.substring(80);const target=decodeURIComponent(downloadUrl);const news=target.substring(0,target.length-9);console.log('news: ',news);window.open(news,'_blank');
```


## [前沿知识库](https://wk.askci.com/)

[2025年具身智能市场前景及投资研究报告](https://wk.askci.com/details/282f04ad1a294171a1cdcb30dab1dca0/)

```js
javascript: const src = document.querySelector('iframe').src;let urlParams = new URLSearchParams(src.substring(src.indexOf('?') + 1));let downloadUrl = urlParams.get('pdfpath');window.open(downloadUrl, '_blank');
```

## 书签脚本如何使用？

[谷歌书签脚本](https://dtking.cn/blog/BookmarkScript/)
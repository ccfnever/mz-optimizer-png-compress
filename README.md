# mz-optimizer-png-compress

用于 [mz-fis](https://github.com/mz-team/mz-fis) 优化图片压缩流程的插件

## settings

```javascript
//file :fis-conf.js
  fis.media('sqa')
  .match('*.png', {
    useHash: true,
    optimizer: fis.plugin('png-compress', {
      type: 'pngquant',
      pathName: buildPath //buildPath 为你编译的目标路径
    })
  })
```

    $ mz release sqa





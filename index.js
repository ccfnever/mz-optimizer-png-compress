

var fs = require('fs');

var pngcrunsh;
var pngquant;

/**
 * 该插件会判断 build 仓库是否存在了已经编译过的图片，如果存在则跳过压缩，直接返回uid仓库里面的文件
 * 需要传参 conf 里的 pathName ，作为 release 路径的根目录
 */
module.exports = function(content, file, conf) {

    var targetPath = conf.pathName;
    var targetFile = targetPath + file.getHashRelease();
    var exist;

    try{
        exist = fs.statSync(targetFile).isFile();
    }catch(e){
        exist = false;
    }

    if(exist){
        return fs.readFileSync(targetFile);
    }

    var C;
    if(conf.type === 'pngquant'){
        if(typeof pngquant === 'undefined'){
            try {
                pngquant = require('node-pngquant-native');
            } catch(e){
                pngquant = false;
                fis.log.warning('node-pngquant-native does not support your node ' + process.version +
                    ', report it to https://github.com/xiangshouding/node-pngquant-native/issues');
            }
        }
        C = pngquant;
    } else {
        if(typeof pngcrunsh === 'undefined'){
            try {
                pngcrunsh = require('node-pngcrush');
            } catch(e){
                pngcrunsh = false;
                fis.log.warning('node-pngcrush does not support your node ' + process.version +
                    ', report it to https://github.com/xiangshouding/node-pngcrush/issues');
            }
        }
        C = pngcrunsh;
    }
    if (C && C.compress) {
        return C.option(conf).compress(content);
    } else {
        return content;
    }

};
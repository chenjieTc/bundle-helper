const fs   = require('fs-extra');
const path = require('path');

module.exports = (options) => {
    let {cwdPath, oValue} = options;
    console.log(options)

    if (!oValue) {
        throw Error('配置文件名称不能为空');
    }

    try {
        const globalConfPath = path.resolve(__filename, '../../config.global.json');
        const globalConf = require(globalConfPath);
        // 查看全局配置信息
        if (oValue === 'list') {
            console.log(globalConf);
            return;
        }

        const initConf   = require(path.resolve(cwdPath, `./${oValue}`));
        const lastConf   = Object.assign({}, globalConf, initConf);

        fs.writeJSONSync(globalConfPath, lastConf, {spaces: 4});
    }catch(e) {
        console.log('初始化全局配置失败:\n', e);
    }
};
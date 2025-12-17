/*
 * @Author: gongqinying (eycodes@gmail.com)
 * @Date: 2025-08-29 15:58:18
 * @LastEditTime: 2025-08-29 16:45:13
 * @LastEditors: gongqinying (eycodes@gmail.com)
 * @FilePath: \web-bundle-zip\main.js
 * @Description: 
 */

const ConfigManager = require('./config-manager');
const compress = require('./compress');

module.exports = {
  // 插件加载时
  load() {
    // Editor.log('[web-bundle-zip] 插件已加载');

    // 监听构建完成事件
    Editor.Builder.on('build-finished', this.onBuildFinished);
  },

  // 插件卸载时
  unload() {
    // Editor.log('[web-bundle-zip] 插件已卸载');

    // 卸载时移除监听
    Editor.Builder.removeListener('build-finished', this.onBuildFinished);
  },

  // register your ipc messages here
  messages: {
    'start'() {
      Editor.Panel.open('web-bundle-zip');
    },

    /**
     * 读取配置
     * @param {any} event 
     */
    'read-config'(event) {
      const config = ConfigManager.get();
      event.reply(null, config);
    },

    /**
     * 保存配置
     * @param {any} event 
     * @param {any} config
     */
    'save-config'(event, config) {
      const configFilePath = ConfigManager.set(config);
      // Editor.log(`[${EXTENSION_NAME}]`, 'configSaved', configFilePath);
      event.reply(null, true);
    },
  },

  // 构建完成回调
  onBuildFinished(options, callback) {
    const config = ConfigManager.get();

    // 未开启直接跳过
    if (!config || !config.enabled) {
      callback();
      return;
    };

    const target = options.platform; // 获取构建目标平台
    const needPlatform = 'web-mobile'; // 你想指定的平台，比如 web-mobile/web-desktop/wechatgame 等

    // 检查是否是指定的平台
    const isTargetPlatform = (target === needPlatform);

    // 检查是否有分包信息（小程序等平台才会有 subpackages）
    let hasSubpackages = false;
    if (options && options.buildResults && options.buildResults._buildPackages) {
      const subpackages = options.buildResults._buildPackages;
      if (subpackages && Object.keys(subpackages).length > 0) {
        hasSubpackages = true;
      }
    }

    if (isTargetPlatform || hasSubpackages) {
      Editor.log('[web-bundle-zip] 开始压缩...');
      compress.start();
      Editor.log('[web-bundle-zip] 压缩完成');
    };

    if (callback && typeof callback === 'function') {
      callback();
    }
  }
};
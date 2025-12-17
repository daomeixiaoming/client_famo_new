/*
 * @Author: eycode
 * @Date: 2021-08-04 11:12:11
 * @LastEditTime: 2025-08-29 17:04:35
 * @LastEditors: gongqinying (eycodes@gmail.com)
 * @Description: 
 * @Other: 
 */

const { readFileSync } = require('fs');

/** 包名 */
const PACKAGE_NAME = 'web-bundle-zip';

Editor.Panel.extend({
    // 导入css文件
    style: readFileSync(Editor.url('packages://' + PACKAGE_NAME + '/panel/index.css', 'utf8')),

    // 导入html文件
    template: readFileSync(Editor.url('packages://' + PACKAGE_NAME + '/panel/index.html', 'utf8')),

    ready() {
        const app = new window.Vue({
            el: this.shadowRoot,
            data: {
                enabled: false,
                isProcessing: false,
                applyLabel: '应用',
                titleLabel: 'WEB自动压缩bundle',
            },
            methods: {
                onApplyBtnClick(event) {
                    this.saveConfig();
                },

                /**
                * 读取配置
                */
                readConfig() {
                    Editor.log('readConfig')
                    Editor.Ipc.sendToMain(`${PACKAGE_NAME}:read-config`, (error, config) => {
                        if (error || !config) return;
                        for (const key in config) {
                            const value = config[key];
                            if (Array.isArray(value)) {
                                this[key] = value.join(',').replace(/,/g, ',\n');
                            } else {
                                this[key] = value;
                            }
                        }
                    });
                },

                /**
                 * 保存配置
                 */
                saveConfig() {
                    if (this.isProcessing) return;
                    Editor.log('saveConfig')
                    this.isProcessing = true;

                    // 配置
                    config = {
                        enabled: this.enabled,
                    };

                    // 发消息给主进程保存配置
                    Editor.Ipc.sendToMain(`${PACKAGE_NAME}:save-config`, config, () => {
                        this.isProcessing = false;
                    });
                },
            },
        });

        // 读取配置
        app.readConfig();
    },
});
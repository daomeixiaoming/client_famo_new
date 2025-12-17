/*
 * @Author: gongqinying (eycodes@gmail.com)
 * @Date: 2025-08-29 16:18:21
 * @LastEditTime: 2025-08-29 17:00:03
 * @LastEditors: gongqinying (eycodes@gmail.com)
 * @FilePath: \web-bundle-zip\compress.js
 * @Description: 打包工具
 */

const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const compress = {
	start() {
		// 排除一些不需要压缩的分包
		const exclude = ["internal", "main", "resources"];

		// 获取项目路径
		const projectPath = Editor.Project.path || Editor.projectPath;
		const assetsPath = path.join(projectPath, 'build/web-mobile');

		// 1. 通过 index.html 找到 setting 文件名
		const indexPath = path.join(assetsPath, "index.html");
		if (!fs.existsSync(indexPath)) {
			console.error("未找到 index.html");
			process.exit(1);
		}

		const indexContent = fs.readFileSync(indexPath, "utf-8");
		const settingMatch = indexContent.match(/src=["']([^"']*setting[^"']*\.js)["']/i);

		if (!settingMatch) {
			console.error("index.html 中未找到包含 'src/setting' 的 js 文件路径");
			process.exit(1);
		}

		const settingPath = path.join(assetsPath, settingMatch[1]);

		// 2. 读取 setting.js
		let _CCSettings;
		try {
			const window = {};
			const settingContent = fs.readFileSync(settingPath, "utf-8");
			eval(settingContent); // 执行 setting.js 填充 window._CCSettings
			_CCSettings = window._CCSettings;
		} catch (e) {
			console.error("解析 setting.js 失败:", e);
			process.exit(1);
		}

		if (!_CCSettings || !_CCSettings.bundleVers) {
			console.error("setting.js 中没有找到 bundleVers 对象");
			process.exit(1);
		}

		const bundleVers = _CCSettings.bundleVers;

		// 3. 设置要查找的根目录
		const rootDir = path.join(assetsPath, "assets"); // 修改成你的目录

		// 4. 遍历并压缩
		Object.entries(bundleVers).forEach(([key, value]) => {
			if (exclude.includes(key)) return;

			const folderPath = path.join(rootDir, key);

			if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {

				// 创建 zip
				const zip = new AdmZip();
				const subItems = fs.readdirSync(folderPath);

				subItems.forEach(item => {
					const fullPath = path.join(folderPath, item);
					if (fs.lstatSync(fullPath).isDirectory()) {
						zip.addLocalFolder(fullPath, item);
					}
				});

				// 生成 zip
				const zipName = `${key}.${value}.zip`;
				const outputPath = path.join(folderPath, zipName);
				zip.writeZip(outputPath);
				Editor.log(`压缩完成: ${outputPath}`);

				// 删除原目录（保留 zip）
				subItems.forEach(item => {
					const targetPath = path.join(folderPath, item);
					if (fs.existsSync(targetPath)) {
						const stat = fs.statSync(targetPath);
						if (stat.isDirectory()) {
							fs.rmdirSync(targetPath, { recursive: true });
						};
					}
				});
			} else {
				console.warn(`未找到文件夹: ${key}`);
			}
		});
	}
}

module.exports = compress;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const archiver = require('archiver');

// 配置路径
const DIST = path.resolve(__dirname, '../client_demon/build123/web-mobile'); // Cocos 构建输出目录
const OUTPUT = path.resolve(__dirname, '../dist');
const CDN_BASE_URL = process.env.CDN_BASE_URL || 'famo/game';

// 核心文件列表（必须首屏加载）
const CORE_FILES = [
    'index.html',
    'main.js',
    "cocos2d-js.js",
    "cocos2d-js-min.js",
    'src/project.js',
    'style-mobile.css',
    'src/settings.js',
];

// 资源文件分组配置
const ASSET_GROUPS = [
    {
        name: 'Atals_Home',
        patterns: ['assets/Atals_Home/**']
    },
    {
        name: 'Atals1',
        patterns: ['assets/Atals1/**'],
    },
    {
        name: 'Gui',
        patterns: ['assets/Gui/**']
    },
    {
        name: 'internal',
        patterns: ['assets/internal/**']
    },
    {
        name: 'main',
        patterns: ['assets/main/**']
    },
    {
        name: 'Prefab_Home',
        patterns: ['assets/Prefab_Home/**']
    },
    {
        name: 'Prefab_Login',
        patterns: ['assets/Prefab_Login/**']
    },
    {
        name: 'Prefabs',
        patterns: ['assets/Prefabs/**']
    },
    {
        name: 'Sounds',
        patterns: ['assets/Sounds/**']
    }
];

/**
 * 计算文件 MD5
 */
function hashFile(filePath) {
    const hash = crypto.createHash('md5');
    const buffer = fs.readFileSync(filePath);
    hash.update(buffer);
    return hash.digest('hex');
}

/**
 * 压缩文件到 zip
 */
function zipFiles(files, zipPath, baseDir) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);

        files.forEach(file => {
            const relativePath = path.relative(baseDir, file);
            archive.file(file, { name: relativePath });
        });

        archive.finalize();

        output.on('close', () => {
            console.log(`✓ Created: ${zipPath} (${archive.pointer()} bytes)`);
            resolve(archive.pointer());
        });

        archive.on('error', reject);
    });
}

/**
 * 递归获取目录下所有文件
 */
function getAllFiles(dir, patterns = []) {
    const files = [];
    console.warn("=================getAllFiles==============", dir, patterns);
    if (!fs.existsSync(dir)) {
        return files;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...getAllFiles(fullPath, patterns));
        } else if (stat.isFile()) {
            if (patterns.length === 0) {
                files.push(fullPath);
            } else {
                console.log("==========fullPath=============", fullPath);
                console.log("==========dir1=============", dir);
                const relativePath = path.relative(dir, fullPath);
                console.log("==========relativePath=============", relativePath);
                // console.log("==========patterns=============", patterns);
                // const matches = patterns.some(pattern => {
                //     const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
                //     console.log("==========regex=============", regex, relativePath, fullPath);
                //     return regex.test(relativePath);
                // });
                let abName = patterns[0].split('/')[1];
                let matches = fullPath.indexOf(abName);
                console.warn("==========patterns1111=============", fullPath, matches, abName);
                if (matches != -1) {
                    files.push(fullPath);
                }
            }
        }
    }

    return files;
}

/**
 * 主构建函数
 */
async function build() {
    console.log('🚀 开始构建 H5 游戏资源...\n');

    // 检查源目录
    if (!fs.existsSync(DIST)) {
        console.error(`❌ 错误: 源目录不存在: ${DIST}`);
        console.error('请先执行 Cocos 构建: cocos build -p web-mobile');
        process.exit(1);
    }

    // 创建输出目录
    if (!fs.existsSync(OUTPUT)) {
        fs.mkdirSync(OUTPUT, { recursive: true });
    }

    const version = process.env.VERSION || `v${Date.now()}`;
    const versionDir = path.join(OUTPUT, version);
    if (!fs.existsSync(versionDir)) {
        fs.mkdirSync(versionDir, { recursive: true });
    }

    console.log(`📦 版本: ${version}`);
    console.log(`📂 输出目录: ${versionDir}\n`);

    // 1. 构建核心包
    console.log('📦 构建核心包...');
    const coreFiles = CORE_FILES
        .map(f => path.join(DIST, f))
        .filter(f => fs.existsSync(f));

    if (coreFiles.length === 0) {
        console.error('❌ 错误: 未找到核心文件');
        process.exit(1);
    }

    console.log("===============coreFiles============", coreFiles);
    const coreZipPath = path.join(versionDir, 'core.zip');
    const coreSize = await zipFiles(coreFiles, coreZipPath, DIST);
    const coreHash = hashFile(coreZipPath);

    // 2. 构建资源包
    console.log('\n📦 构建资源包...');
    const assetFiles = [];

    for (const group of ASSET_GROUPS) {
        const groupFiles = [];
        console.log("=================groupFiles1===========", group.patterns.length);
        for (const pattern of group.patterns) {
            console.log("=================groupFiles1===========", pattern);
            const files = getAllFiles(DIST, [pattern]);
            console.log("=================groupFiles2===========", files);
            groupFiles.push(...files);
        }

        console.log("=================groupFiles===========", groupFiles.length);
        if (groupFiles.length > 0) {
            const assetZipPath = path.join(versionDir, `${group.name}.zip`);
            console.log("===============assetZipPath=============", assetZipPath);
            const assetSize = await zipFiles(groupFiles, assetZipPath, DIST);
            const assetHash = hashFile(assetZipPath);

            assetFiles.push({
                name: `${group.name}.zip`,
                url: `${CDN_BASE_URL}/${version}/${group.name}.zip`,
                hash: assetHash,
                size: assetSize,
                priority: ASSET_GROUPS.indexOf(group) + 2,
                type: 'bundle',
                dependencies: ['core.zip']
            });
        }
    }

    // 3. 生成 manifest
    console.log('\n📄 生成 manifest...');
    const manifest = {
        version: version,
        timestamp: Date.now(),
        forceUpdate: false,
        files: [
            {
                name: 'core.zip',
                url: `${CDN_BASE_URL}/${version}/core.zip`,
                hash: coreHash,
                size: coreSize,
                priority: 1,
                type: 'core'
            },
            ...assetFiles
        ]
    };

    const manifestPath = path.join(versionDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`✓ Created: ${manifestPath}`);

    // 4. 生成版本信息
    const versionInfo = {
        version: version,
        buildTime: new Date().toISOString(),
        coreSize: coreSize,
        totalAssetsSize: assetFiles.reduce((sum, f) => sum + f.size, 0),
        fileCount: manifest.files.length
    };

    const versionInfoPath = path.join(versionDir, 'version.json');
    fs.writeFileSync(versionInfoPath, JSON.stringify(versionInfo, null, 2));

    console.log('\n✅ 构建完成!');
    console.log(`\n📊 统计信息:`);
    console.log(`   - 核心包: ${(coreSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   - 资源包: ${(versionInfo.totalAssetsSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   - 总大小: ${((coreSize + versionInfo.totalAssetsSize) / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   - 文件数: ${versionInfo.fileCount}`);
    console.log(`\n📤 上传命令:`);
    console.log(`   ossutil cp -r ${versionDir} oss://your-bucket/game/`);
}

// 执行构建
build().catch(err => {
    console.error('❌ 构建失败:', err);
    process.exit(1);
});


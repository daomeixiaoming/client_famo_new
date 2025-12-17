const path = require('path');

const DIST = path.resolve(__dirname, '../client_demon/build123/web-mobile'); // Cocos 构建输出目录

const f = 'D:\\WorkSpace\\pro_famo\\buiidTest\\client_demon\\build123\\web-mobile\\assets\\Atals1\\config.json';
const dir = ' D:/WorkSpace/pro_famo/buiidTest/client_demon/build123/web-mobile/assets/Atals1';
const fullPath = 'D:/WorkSpace/pro_famo/buiidTest/client_demon/build123/web-mobile/assets/Atals1/config.json';
const relativePath = path.relative(dir, fullPath);
console.log("=============relativePath=========", relativePath);
const patterns = ['assets/Atals1/**'];

const r1 = patterns[0].replace(/\*\*/g, '.*');
const r2 = r1.replace(/\*/g, '[^/]*');
console.log("=============matches1=========", r1, r2);
const regex = new RegExp(patterns[0].replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
// 测试是否匹配
// let res = regex.test(relativePath);



let re = "/assets\/Atals1\//"
let name = "config.json"
let path1 = "/web-mobile/assets/Atals1/config.json -1"
const regex1 = new RegExp(re);
let res = regex1.test(name);
res = path1.indexOf("assets/Atals1")
console.log("=============matches=========", res);


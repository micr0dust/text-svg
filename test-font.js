const createTextSVG = require('./simple-svg');

const options = {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Noto Sans TC, Arial, sans-serif'
};

console.log('選項:', options);

try {
    const svg = createTextSVG('測試中文字體', options);
    console.log('生成的 SVG:');
    console.log(svg);
} catch (error) {
    console.error('錯誤:', error);
}

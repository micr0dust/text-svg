function createTextSVG(text, options = {}) {
    const {
        fontSize = 20,
        color = 'black',
        fontFamily = 'Arial, sans-serif',
        backgroundColor = 'transparent',
        padding = 10
    } = options;
    
    // 改進的文字寬度計算 - 考慮中文字符
    const chineseCharCount = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishCharCount = text.length - chineseCharCount;
    
    // 中文字符寬度約為字體大小，英文字符約為字體大小的 0.6 倍
    const textWidth = (chineseCharCount * fontSize) + (englishCharCount * fontSize * 0.6);
    const textHeight = fontSize;
    
    const svgWidth = Math.max(textWidth + (padding * 2), 50); // 最小寬度 50
    const svgHeight = textHeight + (padding * 2);
    
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${Math.ceil(svgWidth)}" height="${Math.ceil(svgHeight)}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400&amp;display=swap');
            .text { 
                font-family: 'Noto Sans TC', 'Microsoft YaHei', 'SimHei', ${fontFamily}; 
                font-size: ${fontSize}px; 
                fill: ${color}; 
                dominant-baseline: hanging;
                text-anchor: start;
            }
        </style>
    </defs>
    ${backgroundColor !== 'transparent' ? `<rect width="100%" height="100%" fill="${backgroundColor}"/>` : ''}
    <text x="${padding}" y="${padding}" class="text">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
</svg>`;
    
    return svg;
}

module.exports = createTextSVG;

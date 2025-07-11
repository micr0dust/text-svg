function createTextSVG(text, options = {}) {
    const {
        fontSize = 20,
        color = 'black',
        fontFamily = 'Arial, sans-serif',
        backgroundColor = 'transparent',
        padding = 10
    } = options;
    
    // 簡單計算文字寬度 (粗略估算)
    const charWidth = fontSize * 0.6;
    const textWidth = text.length * charWidth;
    const textHeight = fontSize;
    
    const svgWidth = textWidth + (padding * 2);
    const svgHeight = textHeight + (padding * 2);
    
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400&amp;display=swap');
            .text { 
                font-family: 'Noto Sans TC', ${fontFamily}; 
                font-size: ${fontSize}px; 
                fill: ${color}; 
                dominant-baseline: hanging;
            }
        </style>
    </defs>
    ${backgroundColor !== 'transparent' ? `<rect width="100%" height="100%" fill="${backgroundColor}"/>` : ''}
    <text x="${padding}" y="${padding}" class="text">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
</svg>`;
    
    return svg;
}

module.exports = createTextSVG;

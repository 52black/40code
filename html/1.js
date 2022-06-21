
const fs = require('fs');
var minify = require('html-minifier').minify;
const dir = './html/';

var html = "";
html += fs.readFileSync('./p/head.html')
var l = fs.readdirSync(dir)
for (let i = 0; i < l.length; i++) {
    html += fs.readFileSync(dir + l[i])
}
html += fs.readFileSync('./p/foot.html')
html = minify(html, {
    removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true
})
html = fs.readFileSync('./p/h.html') + html
fs.writeFileSync('../index.php', html)
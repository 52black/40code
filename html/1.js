
const fs = require('fs');
 
const dir = './html/';
 
var html="";
html+=fs.readFileSync('./p/head.html')
var l=fs.readdirSync(dir)
for(let i=0;i<l.length;i++){
    html+=fs.readFileSync(dir+l[i])
}
html+=fs.readFileSync('./p/foot.html')
fs.writeFileSync('../index.php',html)
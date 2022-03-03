const fs = require('fs'); 

const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);

const textout = `This is what we know about the avacado : ${textIn}.\n Created on ${Date.now}`;
fs.writeFileSync('./txt/output.txt',textout);
console.log('File written');
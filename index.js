const fs = require('fs'); 
const http = require('http');
const url = require('url');
/*
-------------------FILES-----------------------------

// Blocking Synchronous Way 

const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);
const textout = `This is what we know about the avacado : ${textIn}.\n Created on ${Date.now}`;
fs.writeFileSync('./txt/output.txt',textout);
console.log('File written');

// Non-Blocking Synchronous Way
fs.readFile('./txt/start.txt','utf-8',(err,data1) => {
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2) => {
        console.log(data2);
        fs.readFile('./txt/final.txt', 'utf-8',(err,data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err => {
                console.log('You file has been written 😁');
            });
        });
    });
});
console.log('Will read file');
*/
//---------------------------SERVER-----------------------------//
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {

    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW');
    }
    else if(pathName === '/product'){
        res.end('This is the Product');
    }
    else if(pathName === '/api'){
          res.writeHead(200,{'Content-type':'application/json'});
          res.end(data);    
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html'
        });
        res.end('<h1>Page not found!</h1>')
    }
});

 server.listen(8000,'127.0.0.1',() => { //8000 is the port and 127.0.0.1 is the local host
     console.log('Listening To Request on port 8000');
 }); 

//  Routing -- Routing Basically means implementing different actions for different URLs.

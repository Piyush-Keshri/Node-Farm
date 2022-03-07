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
const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data); //dataObj is an array.

const server = http.createServer((req,res) => {
    const pathName = req.url;
    
    // Overview Page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el));
        console.log(cardsHtml);
        res.end(tempOverview);    
    }

    // Product Page
    else if(pathName === '/product'){
        res.end('This is the Product');
    }

    // API
    else if(pathName === '/api'){
          res.writeHead(200,{'Content-type':'application/json'});
          res.end(data);    
    }

    // Not Found
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

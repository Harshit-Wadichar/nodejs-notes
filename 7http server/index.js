const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res)=>{
    // console.log(req.headers);
    let log = `new request recieved at time ${Date.now()} by the url = ${req.url}\n`;
    fs.appendFile('log.text',log,(err,result)=>{
        res.end('hello harshit');
    })
  switch(req.url){
    case '/': 
      res.end('Hello World');
      break;
    case '/about':
        res.end('About us page');
        break;
    default: res.end('404 page not found');
             break;
  }
});

myServer.listen(8000,()=>console.log('server started'));
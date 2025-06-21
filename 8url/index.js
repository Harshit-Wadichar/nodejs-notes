const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res)=>{
    // console.log(req.headers);
    let log = `new request recieved at time ${Date.now()} by the url = ${req.url}\n`;
    const myUrl = url.parse(req.url , true);
    if(req.url === '/favicon.ico'){
        return res.end();
    }
    console.log(myUrl);
    fs.appendFile('log.text', log, (err,result) => {
      if(err){
        console.log(err);
      }
        res.end('hello harshit');
    });
  switch(myUrl.pathname){
    case '/': 
      res.end('Hello World');
      break;
    case '/about':
        let userName = myUrl.query.name
        res.end(`Hello ${userName}`);
        break;
    case '/search':
      let searchQuery = myUrl.query.search;
      res.end('search results for this question ' + searchQuery + ' is as follows');
    default: res.end('404 page not found');
    break;
  }
});

myServer.listen(8000,()=>console.log('server started'));
let spdy = require('spdy'),
    fs = require('fs');

let options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt')
};

spdy.createServer(options, function(req, res) {
     console.log(req.url);
    if(req.url=='/'){
        pushScript(res);
    }
     if(req.url=='/pushimage'){
        pushImage(res);
    }
}).listen(3000);

function pushScript(res){
 let stream = res
        .push('/main.js', {
            request: {
                accept: '*/\*'
            },
            response: {
                'content-type': 'application/javascript'
            }
        })
        
        .end('console.log("Hello World");');
    
    res.writeHead(200);
    res.end('<script src="/main.js"></script>');
};


function pushImage(res){
   
 let stream = res
        .push('/push.png', {
            request: {
                accept: '*/\*'
            },
            response: {
                'content-type': 'image/jpeg'
            }
        })
         .end(fs.readFileSync(__dirname + '/push.png'));
      
    let stream2 = res
        .push('/pushok.png', {
            request: {
                accept: '*/\*'
            },
            response: {
                'content-type': 'image/jpeg'
            }
        })
         .end(fs.readFileSync(__dirname + '/pushgreen.png'));
    
    res.writeHead(200);
    res.end('<html><body><img src="/push.png" height="100" width="100"></body></html>');
  
};

const http= require('http');

function sayHello(){
    console.log("Hello world")
}

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end(sayHello())
})

const port = 3000

server.listen(port, () => {
    console.log('Listening on port 3000...')
});

sayHello()
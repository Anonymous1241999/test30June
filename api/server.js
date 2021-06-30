var http = require('http');
const https = require('https')

var express = require('express')
var app = express()
const server = http.createServer(app);
let bodyParser = require('body-parser');

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());





app.get('/', function (req, res) {
  res.send(' request to the homepage')
})

app.get('/getposts', function (req, res) {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts',
        method: 'GET',
        
      }

      callback = function(response) {
          console.log(callback);
         
        var str = '';
      
        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        //the whole response has been received, so we just print it out here
        response.on('end', function () {
          console.log(str);
          res.send(str)
        });
      }
      
      https.request(options, callback).end();
      
    //   const reqt = https.request(options, res => {
    //     console.log(`statusCode: ${res.statusCode}`)
      
    //     // res.on('data', d => {
    //     //   process.stdout.write(d)
    //     // })
    //   })
    
  })

  

  app.get('/getcomments/:id', function (req, res) {
      console.log(req.params.id);
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts/'+req.params.id+"/comments",
        method: 'GET',
        
      }

      callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
          str += chunk;
        });
        response.on('end', function () {
          
          res.send(JSON.stringify(JSON.parse(str)))
        });
      }
      
      https.request(options, callback).end();
  })


server.listen(8080, "0.0.0.0", () =>
  console.log("server is running on port 8080")
);
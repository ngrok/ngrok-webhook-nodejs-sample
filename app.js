const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const fs 		= require('fs')

const port = 8080;
const msgBreak = "-------------- New Request Received --------------";

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.all('/*', function (req, res) {
   //    console.log("-------------- New Request --------------");
   //    console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
   //    console.log("Body:"+ JSON.stringify(req.body, null, 3));
   //    res.json({ message: "Thank you for the message" });
   // })

/* 
   To start a HTTP tunnel forwarding to your local port 8080, run cli cmnd "ngrok http 8080"
   Confirm endpoint is working and get url here:
   https://dashboard.ngrok.com/cloud-edge/endpoints
*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', function(req, res){
   const headersReceived = JSON.stringify(req.headers, null, 3);
   const bodyReceived = JSON.stringify(req.body, null, 3);
   
   console.log(msgBreak);
   console.log("Headers:" + headersReceived);
   console.log("Body:" + bodyReceived);

   filePath = __dirname + '/server_log.json'
   const logData = {...req.headers, ...req.body};

   fs.appendFile(filePath, JSON.stringify(logData, null, 3), function(err) {
      if (err) { throw err }
      console.log("File successfully written");
      res.status(200).json({
         message: "File successfully written"
      })
   })
})   

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})

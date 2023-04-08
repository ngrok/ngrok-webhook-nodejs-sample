var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const myArgs = process.argv.slice(2);

app.post('/*', function (req, res) {
   console.log("-------------- New Request POST --------------");
   console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
   console.log("Body:"+ JSON.stringify(req.body, null, 3));
   res.json({ message: "Thank you for the message" });
 })

app.get('/*', function (req, res) {
   console.log("-------------- Validate Request --------------");
   var challenge = req.headers['x-okta-verification-challenge']
   res.json( { "verification" : challenge } );
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})

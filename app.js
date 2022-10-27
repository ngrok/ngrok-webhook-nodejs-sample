var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.all('/*', function (req, res) {
   console.log("-------------- New Request --------------");
   console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
   console.log("Body:"+ JSON.stringify(req.body, null, 3));
   res.json({ message: "Thank you for the message" });
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})

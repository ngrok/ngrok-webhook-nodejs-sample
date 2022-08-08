var express = require('express');
var app = express();
app.use(express.json());
const port = 3000;

app.all('/', function (req, res) {
   console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
   console.log("Body:"+ JSON.stringify(req.body, null, 3));
   //request = req.body;
   //console.log(request);
   res.json({ message: "Thank you" });
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})

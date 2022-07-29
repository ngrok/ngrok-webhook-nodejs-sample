var express = require('express');
var app = express();
app.use(express.json());
const port = 3000;

app.all('/', function (req, res) {
   request = req.body;
   console.log(request);
   res.json({ message: "Thank you" });
})

app.listen(port, function () {
   console.log(`Example app listening at ${port}`)
})
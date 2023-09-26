var express = require('express');
var app = express();
app.use(express.json());
const port = 8080;

app.all('/*', function (req, res) {
   console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
   console.log("Body:"+ JSON.stringify(req.body, null, 3));

   if(req.query.challenge!=null){
      console.log("Query challenge: "+ req.query.challenge);
      //When you enable a webhook in Dropbox, Dropbox makes a one-time get call to the app
      //sending a challenge query parameter value and expects the app to respond with this value.
      res.type('txt');
      res.send(req.query.challenge);
   }else{
      //For all the rest of the requests the app responds the same message.
      res.json({ message: "Thank you for the message" });
   }
})

app.listen(port, function () {
   console.log(`Example Dropbox app listening at ${port}`)
})
var express = require('express');
crypto = require('crypto')

var app = express();
app.use(express.json());
const port = 3000;
const consumer_secret = "Twitter API Key Secret";

get_challenge_response = function(crc_token, consumer_secret) {
  hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')
  return hmac
}

app.post('/*', function (req, res) {
  console.log("-------------- New Request POST --------------");
  console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
  console.log("Body:"+ JSON.stringify(req.body, null, 3));
  res.json({ message: "Thank you for the message" });
})

// Add support for GET requests to Twitter webhook
app.get("/*", (req, res) => {
  // Parse the query param
  var crc_token = req.query["crc_token"];
  console.log("-------------- New Request GET --------------");
  console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
  console.log("Body:"+ JSON.stringify(req.body, null, 3));
  // Check if a token is in the query string of the request
  if (crc_token) {
    var hash = get_challenge_response(crc_token, consumer_secret)
    console.log("crc token hash="+ hash);
    res.status(200);
    res.send({response_token: 'sha256=' + hash})
  } else {
    res.status(400);
    res.send({ message: "Error: crc_token missing from request."})
  }
});

app.listen(port, function () {
   console.log(`Example Twitter app listening at ${port}`)
})
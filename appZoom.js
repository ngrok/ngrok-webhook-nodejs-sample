const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const secretToken = "secret";

app.all('/*', function (req, res) {
   console.log("-------------- New Request --------------");
   console.log("Headers:" + JSON.stringify(req.headers, null, 3));
   console.log("Body:" + JSON.stringify(req.body, null, 3));

   if (req.body.event != null) {
      const body = JSON.stringify(req.body);
      const timestamp = req.headers['x-zm-request-timestamp'];
      const hashedMessage = crypto.createHmac('sha256', secretToken).update(`v0:${timestamp}:${body}`).digest('hex');

      console.log('Timestamp: ' + timestamp);
      console.log('Body: ' + body);
      console.log('Expected HMAC: ' + req.headers['x-zm-signature']);
      console.log('Output HMAC: ' + `v0=${hashedMessage}`);

      if (req.headers['x-zm-signature'] == `v0=${hashedMessage}`) {
         console.log("Request is verified");
         if (req.body.event == "endpoint.url_validation") {
            const plainToken = req.body.payload.plainToken;
            const encryptedToken = crypto.createHmac('sha256', secretToken).update(plainToken).digest('hex');
            const response = { "plainToken": plainToken, "encryptedToken": encryptedToken };
            res.json(response);
            console.log("Endpoint URL is validated with response: " + JSON.stringify(response));
         }
      } else {
         console.log("Request is not verified");
      }
   }
})

app.listen(port, function () {
   console.log(`Example Zoom app listening at ${port}`)
})

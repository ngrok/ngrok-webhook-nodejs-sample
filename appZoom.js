require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const app = express()
app.use(bodyParser.json())
const port = 3000

app.post('/*', function (req, res) {
  let response;
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // construct the message string
  const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`

  const hashForVerify = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(message).digest('hex')

  // hash the message string with your Webhook Secret Token and prepend the version semantic
  const signature = `v0=${hashForVerify}`

  // you validating the request came from Zoom https://marketplace.zoom.us/docs/api-reference/webhook-reference#notification-structure
  if (req.headers['x-zm-signature'] === signature) {

    // Zoom validating you control the webhook endpoint https://marketplace.zoom.us/docs/api-reference/webhook-reference#validate-webhook-endpoint
    if(req.body.event === 'endpoint.url_validation') {
      const hashForValidate = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(req.body.payload.plainToken).digest('hex')

      response = {
        message: {
          plainToken: req.body.payload.plainToken,
          encryptedToken: hashForValidate
        },
        status: 200
      }
      console.log("Response:", response.message)

      res.status(response.status)
      res.json(response.message)
    } else {
      response = { 
        message: 'Authorized request to Webhook Sample Node.js.',
        status: 200 
      }
      console.log(response.message)
      // Business logic here, example make API request to Zoom.

    }
  } else {
    response = { 
      message: 'Unauthorized request to Webhook Sample Node.js.', 
      status: 401 
    }
    console.log(response.message)

    res.status(response.status)
    res.json(response)
  }
})

app.listen(port, function (){
  console.log(`Example Zoom app listening at port ${port}!`)
})

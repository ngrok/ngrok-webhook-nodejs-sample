# Sample Webhook Listener with Node + Express

This sample app works as a webhook listener using Node and ExpressJS.

**Prerequisites**: [Node.js](https://nodejs.org/en/).

## Getting Started

To install this sample, run the following commands:

```bash
git clone https://github.com/ngrok/ngrok-webhook-nodejs-sample.git
cd ngrok-webhook-nodejs-sample
npm i
```

This will get the project installed locally.

## Launching the app

Now you can launch the app:

```bash
npm start
```
Alternativelly, you can run one of the following apps:
    `npm run startFB`

The app runs by default on port 8080

## Making this app public with ngrok

To make your app public using ngrok, enter:

```bash
ngrok http 8080
```

## Help

Please [raise an issue](https://github.com/ngrok/ngrok-webhook-nodejs-sample/issues) if you find a problem with this app, or visit our [Developer Community](https://ngrok.com/slack).

## License

Apache 2.0, see [LICENSE](LICENSE).
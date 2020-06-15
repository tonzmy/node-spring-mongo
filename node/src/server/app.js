import express from 'express'
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import api from './api'
import App from '../components/App'
var cookieParser = require('cookie-parser')
var amqp = require('amqplib/callback_api')
// import storeFactory from '../store'

// const store = storeFactory()
const fileAssets = express.static(path.join(__dirname, '../../dist/assets'))
const staticCSS = fs.readFileSync(path.join(__dirname, '../../dist/assets/styles.css'))
const hostName = (process.env.HOST) ? ''+ process.env.HOST : 'localhost'
const mqHost = (process.env.MQ) ? ''+ process.env.MQ : 'rabbitmq'

const logger = (req, res, next) => {
  console.log(`${req.method} request for ${req.url}`)
  next()
}

// add support of rabbitMQ
const rabbitMQ = (req, res, next) => {
  amqp.connect(`amqp://${mqHost}`, (error0, connection) => {
    if (error0) {
      console.log(error0);
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        console.log(error1);
      }

      var exchange = "logs";
      var msg = `[INFO] ${req.method} request for ${req.url}`;

      channel.assertExchange(exchange, 'fanout', {
        durable: false
      });

      channel.publish(exchange, '', Buffer.from(msg));
      console.log("[rabbitmq]: sent logs successfully");
    });

    setTimeout(() => {
      connection.close();
      console.log("[rabbitmq]: Timeout");
    })

  });
  next()
}

const buildHTMLPage = () => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>Tea</title>
        <style>${staticCSS}</style>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/3adb0dcd0d.js" crossorigin="anonymous"></script>
    </head>
    <body>

        <div id="react-container"></div>
        <script src="/bundle.js"></script>
    </body>
    <footer>
      <p>z299lin</p>
    </footer>
</html>

`

const renderComponentsToHTML = ({url, store}) => ({
    html: renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
})

const makeClientStoreFrom = store => url => ({
  url,
  store: store
})


const htmlResponse = compose(
  buildHTMLPage,
  renderComponentsToHTML
)

const respond = ({url}, res) =>
  res.status(200).send(
    buildHTMLPage()
  )



export default express()
  .use(bodyParser.json())
  .use(logger)
  .user(rabbitMQ)
  .use(fileAssets)
  .use(cookieParser())
  .use('/data', createProxyMiddleware({target: `http://${hostName}:8080`, changeOrigin: true}))
  .use(api)
  .use(respond)

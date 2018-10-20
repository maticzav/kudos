import * as express from 'express'
import * as bodyParser from 'body-parser'

// Routes

import send from './routes/send'

// Config validation

if (!process.env.PORT) {
  throw new Error(`Missing PORT environment variable.`)
}

// Webhook

const webhook = express()

webhook.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
webhook.use(bodyParser.json())

webhook.use('/', send)

// Start

webhook.listen(process.env.PORT, err => {
  if (err) throw err
  console.log(`Webhook listening on: http://localhost:${process.env.PORT}`)
})

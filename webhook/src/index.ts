import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Slack } from './slack'
import { KudosBinding } from './kudos'

// Routes

import slack from './routes/slack'

// Config validation

if (!process.env.PORT) {
  throw new Error(`Missing PORT environment variable.`)
}

if (!process.env.KUDOS_ENDPOINT) {
  throw new Error(`Missing KUDOS_ENDPOINT environment variable.`)
}

// Webhook

const webhook = express()

webhook.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
webhook.use(bodyParser.json())

// Middleware

webhook.use((req, res, next) => {
  req.slack = new Slack({
    organization: process.env.SLACK_ORGANIZATION,
    apiToken: process.env.SLACK_API_TOKEN,
  })
  req.kudos = new KudosBinding({
    uri: process.env.KUDOS_ENDPOINT,
  })
  next()
})

// Routes

webhook.use('/slack', slack)

// Start

webhook.listen(process.env.PORT, err => {
  if (err) throw err
  console.log(`Webhook listening on: http://localhost:${process.env.PORT}`)
})

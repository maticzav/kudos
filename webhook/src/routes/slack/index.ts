import { Router } from 'express'
import { run } from './engine'
import { handleSubscriptionEvent } from './subscriptions'
import { handleActionEvent } from './actions'

// Router

const slack = Router()

slack.post('/', async (req, res) => {
  const executed = await run(req, req.body)

  res.send(executed)
})

slack.post('/actions', async (req, res) => {
  const payload = JSON.parse(req.body.payload)
  const executed = await handleActionEvent(req, payload)

  res.send(executed)
})

slack.post('/events', async (req, res) => {
  switch (req.body.type) {
    case 'url_verification': {
      return res.send(req.body.challenge)
    }
    case 'event_callback': {
      const exec = await handleSubscriptionEvent(req, req.body.event)

      return res.sendStatus(200)
    }
    default: {
      return res.sendStatus(200)
    }
  }
})

export default slack

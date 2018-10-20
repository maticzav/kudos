import { Router } from 'express'
import { run } from './engine'
import { handleSubscriptionEvent } from './subscriptions'

// Router

const slack = Router()

slack.post('/', async (req, res) => {
  const executed = await run(req, req.body)

  res.send(executed)
})

slack.post('/actions', async (req, res) => {
  const payload = JSON.parse(req.body.payload)

  switch (payload.callback_id) {
    case 'share_kudo': {
      const [action] = payload.actions

      switch (action.name) {
        case 'share': {
          const kudoId = action.value

          return res.send({
            text: 'Kudo shared!',
          })
        }
        case 'dont-share': {
          return res.send({
            text: 'Maybe next time...',
          })
        }
      }
    }
    default: {
      return res.sendStatus(200)
    }
  }
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

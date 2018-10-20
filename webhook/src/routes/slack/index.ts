import { Router } from 'express'
import { run } from './engine'

// Router

const slack = Router()

slack.post('/', async (req, res) => {
  const executed = await run(req, req.body)

  res.send(executed)
})

slack.post('/events', async (req, res) => {
  const payload = JSON.parse(req.body.payload)

  switch (payload.callback_id) {
    case 'share_kudo': {
      const [action] = payload.actions
      const kudoId = action.value

      console.log(kudoId)

      return res.send({
        text: 'Kudo shared!',
      })
    }
    default: {
      return res.sendStatus(200)
    }
  }
})

export default slack

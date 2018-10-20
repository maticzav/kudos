import { Router } from 'express'
import { run } from './engine'

// Router

const slack = Router()

slack.post('/', async (req, res) => {
  const executed = await run(req, req.body)

  res.send(executed)
})

export default slack

// const sendKudosRegex = /^<@(.*)\|(.*)>.?(.*)/g
//   const sendKudosMatch = sendKudosRegex.exec(req.body.text)

//   res.setHeader('Content-Type', 'application/json')

//   if (sendKudosMatch) {
//     const recipientUserID = sendKudosMatch[1]
//     const recipientUserName = sendKudosMatch[2]
//     const recipientMsg = sendKudosMatch[3]

//     const sendKudosResponse = {

//     }
//     res.send(JSON.stringify(sendKudosResponse))
//     return
//   }

//   const leaderboardRegex = /^leaderboard/g
//   const leaderboardMatch = leaderboardRegex.exec(req.body.text)

//   if (leaderboardMatch) {
//     const leaderboardResponse = 'Leaderboard!'

//     res.send(JSON.stringify(leaderboardResponse))
//     return
//   }

//   const errorResponse = {
//     text: 'Oops, you didnt specify who to give the Kudos to 😓',
//   }

//   res.send(JSON.stringify(errorResponse))
//   return

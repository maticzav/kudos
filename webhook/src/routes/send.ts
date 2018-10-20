import { Router } from 'express'

const send = Router()

send.post('/command', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const sendKudosRegex = /^<@(.*)\|(.*)>.?(.*)/g
  const sendKudosMatch = sendKudosRegex.exec(req.body.text)

  if (sendKudosMatch) {
    const recipientUserID = sendKudosMatch[1]
    const recipientUserName = sendKudosMatch[2]
    const recipientMsg = sendKudosMatch[3]

    const sendKudosResponse = {
      text: `<@${req.body.user_id}> gives Kudos to <@${recipientUserID}> 🎉`,
      attachments: [
        {
          fallback: 'Want others to know you sent the kudos?',
          title: 'Want others to know you sent the kudos?',
          callback_id: '',
          color: '#3AA3E3',
          attachment_type: 'default',
          actions: [
            {
              name: 'Cancel',
              text: 'Cancel',
              type: 'button',
            },
            {
              name: 'Share',
              text: 'Cancel',
              type: 'button',
            },
          ],
        },
      ],
    }
    res.send(JSON.stringify(sendKudosResponse))
    return
  }

  const leaderboardRegex = /^leaderboard/g
  const leaderboardMatch = leaderboardRegex.exec(req.body.text)

  if (leaderboardMatch) {
    const leaderboardResponse = 'Leaderboard!'

    res.send(JSON.stringify(leaderboardResponse))
    return
  }

  const errorResponse = {
    text: 'Oops, you didnt specify who to give the Kudos to 😓',
  }

  res.send(JSON.stringify(errorResponse))
  return
})

send.post('/events', (req, res) => {
  res.send(200)
})

send.post('/actions', (req, res) => {
  // if (cancel) {

  // }else if (deleted){

  // }
  console.log(req)

  res.send(200)
})

export default send

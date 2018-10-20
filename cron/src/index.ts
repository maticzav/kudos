import { ontime } from 'ontime'
import { Slack } from './slack'

const slack = new Slack({
  organization: process.env.SLACK_ORGANIZATION,
  apiToken: process.env.SLACK_API_TOKEN,
})

ontime(
  {
    cycle: ['1T12:00:00'],
  },
  function(ot) {
    console.log('Its been a month DUDE!')
  },
)

ontime(
  {
    cycle: ['Monday 12:00:00'],
  },
  function(ot) {
    console.log('Its been a e Week DUDE!')
  },
)

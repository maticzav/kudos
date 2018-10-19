import { v1 as neo4j } from 'neo4j-driver'

const auth = neo4j.auth.basic(
  process.env.NEO4J_USER,
  process.env.NEO4J_PASSWORD,
)

const driver = neo4j.driver(process.env.NEO4J_ENDPOINT, auth)

export function getNeo4JSession(): neo4j.Session {
  return driver.session()
}

// Cleanup handler

process.stdin.resume()

function cleanup() {
  driver.close()

  process.exit()
}

//do something when app is closing
process.on('exit', cleanup)

//catches ctrl+c event
process.on('SIGINT', cleanup)

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', cleanup)
process.on('SIGUSR2', cleanup)

//catches uncaught exceptions
process.on('uncaughtException', cleanup)

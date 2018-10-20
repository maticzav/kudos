import { v1 as neo4j } from 'neo4j-driver'

const auth = neo4j.auth.basic(
  process.env.NEO4J_USER,
  process.env.NEO4J_PASSWORD,
)

const driver = neo4j.driver(process.env.NEO4J_ENDPOINT, auth)

import "dotenv/config"

import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"

import { context } from "./context"
import * as resolvers from "./resolvers"
import typeDefs from "./schema"

const setup = async () => {
  // Create express App
  const app = express()
  app.use(cors())
  app.use(express.json())

  // Fixes aws health checks; Can remove if not hosting through aws
  app.get("/", (_, res) => res.sendStatus(200))

  // Create apollo server
  const apolloServer = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers: Object.values(resolvers),
    context,
  })

  await apolloServer.start();

  // Add graphql endpoint to express
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  })

  // Start server
  app.listen({ port: process.env.PORT }, () => {
    console.log(`Apollo Server on http://<url>:${process.env.PORT}/graphql`)
  })
}

setup();




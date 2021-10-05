import 'dotenv/config'

import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'

import { context } from './context'
import { schema } from './schema'

const setup = async () => {
    // Create express App
    const app = express()
    app.use(cors())
    app.use(express.json())

    // Fixes aws health checks; Can remove if not hosting through aws
    app.get('/', (_, res) => res.sendStatus(200))

    // Create apollo server
    const apolloServer = new ApolloServer({
        introspection: true,
        schema,
        context,
    })

    await apolloServer.start()

    // Add graphql endpoint to express
    apolloServer.applyMiddleware({
        app,
        path: '/graphql',
    })

    // Start server
    app.listen({ port: process.env.PORT }, () => {
        console.log(
            `[server]: ⚡️🚀 Apollo Server on http://localhost:${process.env.PORT}/graphql ⚡️🚀 `
        )
    })
}

setup()

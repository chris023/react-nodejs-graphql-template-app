import jwt from 'jsonwebtoken'
import { ContextFunction } from 'apollo-server-core'

import { models, Models } from 'models'
import { createLoaders, Loaders } from 'loaders'

const getRequestor = async (req: any) => {
    const token = req.headers['x-token']

    if (token) {
        try {
            return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
        } catch (e) {
            return null
        }
    }
}

export type Requestor = string | jwt.JwtPayload | null

export interface Context {
    requestor?: Requestor
    models: Models
    loaders: Loaders
}

const context: ContextFunction<any, Context> = async ({ req }) => {
    const requestor = await getRequestor(req)
    const loaders = createLoaders()

    return {
        requestor,
        models,
        loaders,
    }
}

export { context }

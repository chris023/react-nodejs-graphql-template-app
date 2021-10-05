import jwt from 'jsonwebtoken'
import { ContextFunction } from 'apollo-server-core'

import { Models } from 'models'
import { createLoaders, Loaders } from 'loaders'
import { AccessTokenPayload } from 'utils'

const getRequestor = async (req: any) => {
    const token = req.headers['x-token']

    if (token) {
        try {
            return (await jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            )) as AccessTokenPayload
        } catch (e) {
            return null
        }
    }

    return null
}

export interface Context {
    requestor: AccessTokenPayload | null
    models: Models
    loaders: Loaders
}

const context: ContextFunction<any, Context> = async ({ req }) => {
    const requestor = await getRequestor(req)
    const loaders = createLoaders()

    return {
        requestor,
        models: {} as Models,
        loaders,
    }
}

export { context }

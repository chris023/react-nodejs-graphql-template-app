import jwt from 'jsonwebtoken'
import { ContextFunction } from 'apollo-server-core'

import { models, Models } from 'models'
import { createLoaders, Loaders } from 'loaders'
import { AccessTokenPayload } from 'utils'
import { User } from 'models/User'

const getUser = async (req: any): Promise<User | null> => {
    const token = req.headers['x-token']

    if (token) {
        try {
            const { id } = (await jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            )) as AccessTokenPayload

            const user = await models.User.findByPk(id)

            if (user) {
                return user
            }
        } catch (e) {
            return null
        }
    }

    return null
}

export interface Context {
    user: User | null
    models: Models
    loaders: Loaders
}

const context: ContextFunction<any, Context> = async ({ req }) => {
    const user = await getUser(req)
    const loaders = createLoaders()

    return {
        user,
        models,
        loaders,
    }
}

export { context }

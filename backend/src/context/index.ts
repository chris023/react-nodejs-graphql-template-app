import { ContextFunction } from 'apollo-server-core'

import { models, Models } from 'models'
import { createLoaders, Loaders } from 'loaders'
import { User } from 'models/User.model'

import { getUser } from './helpers'

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

import { ContextFunction } from 'apollo-server-core'

import { models, Models, UserAttributes } from 'models'
import { createLoaders, Loaders } from 'loaders'

import { getUser } from './helpers'

export interface Context {
    user: UserAttributes | null
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

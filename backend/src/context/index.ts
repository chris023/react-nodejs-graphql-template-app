import { ContextFunction } from 'apollo-server-core'
import { createLoaders, Loaders } from 'loaders'
import { Models, models, UserAttributes } from 'models'

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

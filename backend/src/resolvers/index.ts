import merge from 'deepmerge'

import { authenticationResolvers } from './authentication'
import { businessResolvers } from './business'
import { customScalars } from './customScalars'
import { userResolvers } from './user'

// TODO: Figure out correct typing here
const mergeResolvers: any = (resolvers: any[]) => {
    resolvers.reduce(
        (acc, curr) => merge(acc, curr),
        {} as { [key: string]: any }
    )
}

export const resolvers = mergeResolvers([
    authenticationResolvers,
    businessResolvers,
    customScalars,
    userResolvers,
])

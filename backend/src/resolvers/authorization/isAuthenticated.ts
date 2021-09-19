import { AuthenticationError } from 'apollo-server-express'
import { IFieldResolver, skip } from 'graphql-resolvers'

import { Context } from 'context'

export const isAuthenticated: IFieldResolver<undefined, Context> = (
    parent,
    args,
    { requestor }
) => {
    return requestor
        ? skip
        : new AuthenticationError('Not authenticated as user.')
}

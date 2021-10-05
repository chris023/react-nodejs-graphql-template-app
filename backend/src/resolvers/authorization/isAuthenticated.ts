import { AuthenticationError } from 'apollo-server-express'
import { IFieldResolver, skip } from 'graphql-resolvers'

import { Context } from 'context'

/**
 * Checks that a valid token has been sent with the request
 *
 * Continues to the next resolver in the chain if a requestor
 * exists in the context, otherwise throws an error
 */
export const isAuthenticated: IFieldResolver<undefined, Context> = (
    _parent,
    _args,
    { requestor }
) => {
    return Boolean(requestor)
        ? skip
        : new AuthenticationError('Not authenticated as user.')
}

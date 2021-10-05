import { ForbiddenError } from 'apollo-server-express'
import { IFieldResolver, skip } from 'graphql-resolvers'

import { Context } from 'context'

/**
 * Checks that the requestor has the role "ADMIN"
 *
 * Continues to the next resolver in the chain if user is admin,
 * otherwise throws an error.
 */
export const isAdmin: IFieldResolver<undefined, Context> = (
    _parent,
    _args,
    { requestor }
) => {
    if (Boolean(requestor?.roles.find((role) => role === 'admin'))) {
        return skip
    } else {
        throw new ForbiddenError('Not authorized as admin.')
    }
}

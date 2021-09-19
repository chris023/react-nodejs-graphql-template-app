import { ForbiddenError } from 'apollo-server-express'
import { IFieldResolver, skip } from 'graphql-resolvers'

import { Context } from 'context'

export const isAdmin: IFieldResolver<undefined, Context> = (
    _parent,
    _args,
    { requestor: { roles } }
) => {
    if (roles && !!roles.find('ADMIN')) {
        return skip
    } else {
        throw new ForbiddenError('Not authorized as admin.')
    }
}

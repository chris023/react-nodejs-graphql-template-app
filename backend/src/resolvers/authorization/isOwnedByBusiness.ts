import { ForbiddenError } from 'apollo-server-express'
import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

/**
 * Continue's to the next resolver in the chain if the requested
 * resource is owned by the user's business, otherwise throws an
 * error.
 */
export const isOwnedByOrg: IFieldResolver<any, Context> = async (
    parent,
    _args,
    { requestor }
) => {
    if (parent && parent?.organizationId !== requestor?.businessId)
        throw new ForbiddenError('Not owned by your organization')

    return parent
}

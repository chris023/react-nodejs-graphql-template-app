import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isOwnedByOrg = async (parent, _args, { requestor }) => {
  if (parent && parent.organizationId !== requestor.organizationId)
    throw new ForbiddenError('Not owned by your organization')

  return parent
}

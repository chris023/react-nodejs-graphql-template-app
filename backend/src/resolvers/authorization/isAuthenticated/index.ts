import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { requestor }) => {
  return requestor ? skip : new AuthenticationError('Not authenticated as user.')
}

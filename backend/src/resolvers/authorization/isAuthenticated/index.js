import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) => {
  return me ? skip : new AuthenticationError('Not authenticated as user.')
}

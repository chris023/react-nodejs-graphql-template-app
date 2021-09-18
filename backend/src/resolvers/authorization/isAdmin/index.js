import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { skip } from 'graphql-resolvers'

export const isAdmin = (parent, args, { me: { roles } }) => {
  if (roles && !!roles.find('ADMIN')) {
    return skip
  } else {
    throw new ForbiddenError('Not authorized as admin.')
  }
}

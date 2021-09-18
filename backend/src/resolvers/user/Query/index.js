import { combineResolvers } from 'graphql-resolvers'

import { requestor } from './requestor'
import { user } from './user'
import { users } from './users'

import { isAuthenticated } from '../../authorization'

const Query = {
  requestor: combineResolvers(isAuthenticated, requestor),
  user: combineResolvers(isAuthenticated, user),
  users: combineResolvers(isAuthenticated, users),
}

export { Query }

import { combineResolvers } from 'graphql-resolvers'

import { me } from './me'
import { user } from './user'
import { users } from './users'

import { isAuthenticated } from '../../authorization'

const Query = {
  me: combineResolvers(isAuthenticated, me),
  user: combineResolvers(isAuthenticated, user),
  users: combineResolvers(isAuthenticated, users),
}

export { Query }

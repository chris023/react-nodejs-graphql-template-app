import { combineResolvers } from 'graphql-resolvers'

import { getMe } from './getMe'
import { user } from './user'
import { users } from './users'

import { isAuthenticated } from '../../authorization'

const Query = {
    getMe: combineResolvers(isAuthenticated, getMe),
    user: combineResolvers(isAuthenticated, user),
    users: combineResolvers(isAuthenticated, users),
}

export { Query }

import { getMe, user, users } from './Query'
import { deleteUser, updateUser } from './Mutation'
import { business } from './fields'

import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated, isAdmin } from 'resolvers/authorization'

const userResolvers = {
    Query: {
        getMe: combineResolvers(isAuthenticated, getMe),
        user: combineResolvers(isAuthenticated, user),
        users: combineResolvers(isAuthenticated, users),
    },
    Mutation: {
        deleteUser: combineResolvers(isAuthenticated, isAdmin, deleteUser),
        updateUser: combineResolvers(isAuthenticated, updateUser),
    },
    User: {
        business,
    },
}

export { userResolvers }

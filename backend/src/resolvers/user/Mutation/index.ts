import { combineResolvers } from 'graphql-resolvers'

import { deleteUser } from './deleteUser'
import { updateUser } from './updateUser'

import { isAuthenticated, isAdmin } from 'resolvers/authorization'

const Mutation = {
    deleteUser: combineResolvers(isAuthenticated, isAdmin, deleteUser),
    updateMe: combineResolvers(isAuthenticated, updateUser),
}

export { Mutation }

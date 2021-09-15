import { combineResolvers } from 'graphql-resolvers'

import { attemptTokenRefresh } from './attemptTokenRefresh'
import { deleteUser } from './deleteUser'
import { generateSignUpToken } from './generateSignUpToken'
import { signIn } from './signIn'
import { signUp } from './signUp'
import { updateMe } from './updateMe'
import { updateMyPassword } from './updateMyPassword'

import { isAuthenticated, isAdmin } from '../../authorization'

const Mutation = {
  attemptTokenRefresh,
  deleteUser: combineResolvers(isAuthenticated, isAdmin, deleteUser),
  generateSignUpToken: combineResolvers(
    isAuthenticated,
    isAdmin,
    generateSignUpToken,
  ),
  signIn,
  signUp,
  updateMe: combineResolvers(isAuthenticated, updateMe),
  updateMyPassword: combineResolvers(isAuthenticated, updateMyPassword),
}

export { Mutation }

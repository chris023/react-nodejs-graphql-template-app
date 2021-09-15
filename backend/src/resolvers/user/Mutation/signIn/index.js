import { AuthenticationError, UserInputError } from 'apollo-server'

import tokens from '../../../../../utils/tokens'

const signIn = async (_parent, { login, password }, { models }) => {
  const user = await models.User.findByLogin(login)

  if (!user)
    throw new UserInputError('No user found with these login credentials.')

  const isValidPassword = await user.validatePassword(password)
  if (!isValidPassword) throw new AuthenticationError('Invalid password.')

  return tokens.create(user)
}

export { signIn }

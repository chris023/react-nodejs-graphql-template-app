import { MutationResolvers } from 'types'
import { createLoginTokens } from 'utils/tokens'

/**
 * Registers new users.  A registration token is required to create a new account
 */
const register: MutationResolvers['register'] = async (
  _parent,
  { email, password },
  { models },
) => {
  const user = await models.User.create({
    password,
    email,
  })

  return { user, tokens: createLoginTokens(user) }
}

export { register }

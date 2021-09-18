import jwt from 'jsonwebtoken'

import tokens from '../../../../utils/tokens'

const signUp = async (_parent, { username, password, token }, { models }) => {
  const { organizationId, email, roles } = await jwt.verify(
    token,
    process.env.SIGNUP_TOKEN_SECRET,
  )

  const user = await models.User.create({
    username,
    password,
    email,
    roles,
    organizationId,
  })

  return tokens.create(user)
}

export { signUp }

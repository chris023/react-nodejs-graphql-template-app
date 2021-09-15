import { ForbiddenError } from 'apollo-server'

import tokens from '../../../../../utils/tokens'

const validRoles = async (roles, models) =>
  Array.isArray(roles) &&
  (await Promise.all(
    roles.reduce(async (acc, name) => {
      const role = await models.Role.findOne({ where: { name } })
      return acc && !!role
    }),
    true,
  ))

const generateSignUpToken = async (
  _parent,
  { email, roles },
  { models, me },
) => {
  if (await validRoles(roles, models)) {
    return {
      token: tokens.generateSignUpToken(me.organizationId, email, roles),
    }
  } else {
    throw new ForbiddenError('Invalid Roles')
  }
}

export { generateSignUpToken }

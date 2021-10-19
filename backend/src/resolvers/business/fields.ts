import { BusinessResolvers } from 'types'

const users: BusinessResolvers['users'] = async ({ id }, _args, { models }) => await models.User.findAll({
  where: {
    businessId: id,
  },
})

export { users }

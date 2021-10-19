import { QueryResolvers } from 'types'

const user: QueryResolvers['user'] = async (_parent, { id }, { models }) => await models.User.findByPk(id)

export { user }

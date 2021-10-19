import { QueryResolvers } from 'types'

const users: QueryResolvers['user'] = async (_parent, _args, { models }) =>
    await models.User.findAll()

export { users }

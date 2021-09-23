import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'
import { User } from 'models/User'

const users: IFieldResolver<
    undefined,
    Context,
    Record<string, any>,
    Promise<User[]>
> = async (_parent, _args, { models }) => await models.User.findAll()

export { users }

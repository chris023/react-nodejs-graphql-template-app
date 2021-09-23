import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'
import { User } from 'models/User'

const getMe: IFieldResolver<undefined, Context, Promise<User | null>> = async (
    _parent,
    _args,
    { models, requestor }
) => await models.User.findByPk(requestor.id)

export { getMe }

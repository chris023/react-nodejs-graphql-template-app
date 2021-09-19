import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

const user: IFieldResolver<undefined, Context> = async (
    _parent,
    _args,
    { models, requestor }
) => await models.User.findByPk(requestor.id)

export { user }

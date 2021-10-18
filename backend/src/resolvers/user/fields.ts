import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'
import { User } from 'models/User.model'

const business: IFieldResolver<User, Context, undefined> = async (
    { businessId },
    _args,
    { models }
) => await models.Business.findByPk(businessId)

export { business }

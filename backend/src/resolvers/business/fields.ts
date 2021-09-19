import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'
import { Business } from 'models/Business'

const users: IFieldResolver<Business, Context> = async (
    { id },
    _args,
    { models }
) =>
    await models.User.findAll({
        where: {
            businessId: id,
        },
    })

export { users }

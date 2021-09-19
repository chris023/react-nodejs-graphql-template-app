import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

interface Args {
    id: string
}

const business: IFieldResolver<undefined, Context, Args> = async (
    _parent,
    { id },
    { models }
) => await models.Business.findByPk(id)

export { business }

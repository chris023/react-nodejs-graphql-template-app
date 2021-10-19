import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

interface Args {
    id: string
    name: string
}

const updateBusiness: IFieldResolver<undefined, Context, Args> = async (
  _parent,
  { id, ...businessFields },
  { models },
) => await models.Business.update(businessFields, { where: { id } })

export { updateBusiness }

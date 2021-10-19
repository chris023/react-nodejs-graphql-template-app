import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

interface Args {
    name: string
}

const createBusiness: IFieldResolver<undefined, Context, Args> = async (
  _parent,
  { name },
  { models },
) => await models.Business.create({
  name,
})

export { createBusiness }

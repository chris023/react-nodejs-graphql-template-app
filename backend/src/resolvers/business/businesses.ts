import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

const businesses: IFieldResolver<undefined, Context> = async (
  _parent,
  _args,
  { models },
) => await models.Business.findAll()

export { businesses }

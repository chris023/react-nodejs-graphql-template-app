import { UserResolvers } from 'types'

const business: UserResolvers['business'] = async (
  _parent,
  _args,
  { models, user: { businessId } },
) => await models.Business.findByPk(businessId)

export { business }

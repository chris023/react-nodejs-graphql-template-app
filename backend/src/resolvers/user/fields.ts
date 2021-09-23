const business = async ({ businessId }, _args, { models }) =>
    await models.business.findByPk(businessId)

export { business }

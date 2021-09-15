const organization = async ({ organizationId }, _args, { models }) =>
  await models.Organization.findByPk(organizationId)

export { organization }

const organization = async (_parent, { id }, { models }) =>
  await models.Organization.findByPk(id)

export { organization }

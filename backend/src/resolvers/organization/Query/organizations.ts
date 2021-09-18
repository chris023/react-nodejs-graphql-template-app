const organizations = async (_parent, _args, { models }) => {
  const organizations = await models.Organization.findAll()
  return organizations
}

export { organizations }

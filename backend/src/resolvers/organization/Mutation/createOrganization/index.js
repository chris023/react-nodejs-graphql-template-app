const createOrganization = async (_parent, { name }, { models }) => {
  return await models.Organization.create({
    name,
  })
}

export { createOrganization }

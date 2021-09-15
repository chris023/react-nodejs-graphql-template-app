const assets = async ({ id }, _args, { models }) => {
  return await models.Asset.findAll({
    where: {
      organizationId: id,
    },
  })
}

export { assets }

const users = async ({ id }, _args, { models }) => {
  return await models.User.findAll({
    where: {
      organizationId: id,
    },
  })
}

export { users }

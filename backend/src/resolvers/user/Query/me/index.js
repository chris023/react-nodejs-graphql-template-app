const requestor = async (_parent, _args, { requestor, models }) => {
  return await models.User.findByPk(requestor.id)
}

export { requestor }

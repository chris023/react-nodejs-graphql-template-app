const users = async (_parent, _args, { models }) => await models.User.findAll()

export { users }

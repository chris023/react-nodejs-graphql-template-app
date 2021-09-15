const me = async (_parent, _args, { me, models }) => {
  return await models.User.findByPk(me.id)
}

export { me }

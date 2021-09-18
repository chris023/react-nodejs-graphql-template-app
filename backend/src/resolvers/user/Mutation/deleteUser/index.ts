const deleteUser = async (_parent, { id }, { models }) => {
  return await models.User.destroy({
    where: { id },
  })
}

export { deleteUser }

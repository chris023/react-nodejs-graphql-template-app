const updateMyPassword = async (
  _parent,
  { oldPassword, newPassword },
  { me, models },
) => {
  const user = await models.User.findByPk(me.id)
  const isValidPassword = await user.validatePassword(oldPassword)
  const hashPassword = await user.generateNewPasswordHash(newPassword)

  if (isValidPassword) {
    const [_, user] = await models.User.update(
      { password: hashPassword },
      { where: { id: me.id }, returning: true, plain: true },
    )

    return user
  } else {
    throw new UserInputError('Old password did not match.')
  }
}

export { updateMyPassword }

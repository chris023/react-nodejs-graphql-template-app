const updateMe = async (
  _parent,
  { username, email, timezone },
  { me, models },
) => {
  const [_, user] = await models.User.update(
    { username, email, timezone },
    { where: { id: me.id }, returning: true, plain: true },
  )
  return user
}

export { updateMe }

const updateMe = async (
  _parent,
  { username, email, timezone },
  { requestor, models },
) => {
  const [_, user] = await models.User.update(
    { username, email, timezone },
    { where: { id: requestor.id }, returning: true, plain: true },
  )
  return user
}

export { updateMe }

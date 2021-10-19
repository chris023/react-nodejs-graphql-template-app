import { MutationResolvers } from 'types'

const updateUser: MutationResolvers['updateUser'] = async (
  _parent,
  args,
  { user, models },
) => {
  const [_, [updatedUser]] = await models.User.update(args, {
    where: { id: user!.id },
    returning: true,
  })

  return updatedUser
}

export { updateUser }

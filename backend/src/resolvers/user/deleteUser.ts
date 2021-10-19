import { MutationResolvers } from 'types'

const deleteUser: MutationResolvers['deleteUser'] = async (
  _parent,
  { id },
  { models },
) => await models.User.destroy({
  where: { id },
})

export { deleteUser }

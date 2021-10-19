import { MutationResolvers } from 'types'

const updateSelf: MutationResolvers['updateSelf'] = async (
    _parent,
    args,
    { user, models }
) => {
    const [_, [updatedUser]] = await models.User.update(args, {
        where: { id: user!.id },
        returning: true,
    })

    return updatedUser
}

export { updateSelf }

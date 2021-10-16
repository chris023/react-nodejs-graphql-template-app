import { UserInputError } from 'apollo-server'
import { MutationResolvers } from 'types'

/**
 * Updates password for the logged in user who is making the request
 */
const changePassword: MutationResolvers['changePassword'] = async (
    _parent,
    { oldPassword, newPassword },
    { user, models }
) => {
    const isValidPassword = await user.validatePassword(oldPassword)

    if (!isValidPassword) {
        throw new UserInputError('Old password did not match.')
    }

    const [_, updatedUser] = await models.User.update(
        { password: await user.generateNewPasswordHash(newPassword) },
        {
            where: { id: user.id },
            returning: true,
        }
    )

    return updatedUser
}

export { changePassword }

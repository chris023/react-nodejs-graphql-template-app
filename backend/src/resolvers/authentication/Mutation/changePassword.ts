import { UserInputError } from 'apollo-server'
import { AuthenticationError } from 'apollo-server-errors'
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
    const hashPassword = await user.generateNewPasswordHash(newPassword)

    if (!isValidPassword) {
        throw new UserInputError('Old password did not match.')
    }

    const [_, updatedUser] = await models.User.update(
        { password: hashPassword },
        {
            where: { id: user.id },
            returning: true,
        }
    )

    return updatedUser
}

export { changePassword }

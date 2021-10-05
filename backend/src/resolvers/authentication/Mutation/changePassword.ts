import { UserInputError } from 'apollo-server'
import { AuthenticationError } from 'apollo-server-errors'
import { MutationResolvers } from 'types'

/**
 * Updates password for the logged in user who is making the request
 */
const changePassword: MutationResolvers['changePassword'] = async (
    _parent,
    { oldPassword, newPassword },
    { requestor, models }
) => {
    if (!requestor) {
        throw new AuthenticationError('Missing requestor')
    }

    const user = await models.User.findByPk(requestor.id)

    if (!user) {
        throw new Error('Invalid User')
    }

    const isValidPassword = await user.validatePassword(oldPassword)
    const hashPassword = await user.generateNewPasswordHash(newPassword)

    if (!isValidPassword) {
        throw new UserInputError('Old password did not match.')
    }

    const [_, updatedUser] = await models.User.update(
        { password: hashPassword },
        {
            where: { id: requestor.id },
            returning: true,
        }
    )

    return updatedUser
}

export { changePassword }

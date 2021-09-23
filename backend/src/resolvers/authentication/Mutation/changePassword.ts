import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'
import { UserInputError } from 'apollo-server'

interface IArgs {
    oldPassword: string
    newPassword: string
}

/**
 * Updates password for the logged in user who is making the request
 */
const changePassword: IFieldResolver<undefined, Context, IArgs> = async (
    _parent,
    { oldPassword, newPassword },
    { requestor, models }
) => {
    if (requestor) {
        const user = await models.User.findByPk(requestor.id)

        if (user) {
            const isValidPassword = await user.validatePassword(oldPassword)
            const hashPassword = await user.generateNewPasswordHash(newPassword)

            if (isValidPassword) {
                const [_, user] = await models.User.update(
                    { password: hashPassword },
                    {
                        where: { id: requestor.id },
                        returning: true,
                    }
                )

                return user
            } else {
                throw new UserInputError('Old password did not match.')
            }
        }
    }

    throw new Error('Unspecified Error')
}

export { changePassword }

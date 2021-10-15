import { AuthenticationError } from 'apollo-server-errors'
import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'
import { User, UserAttributes } from 'models/User'
import { Optional } from 'sequelize/types'

const updateUser: IFieldResolver<
    undefined,
    Context,
    Optional<UserAttributes, 'id'>,
    Promise<User>
> = async (_parent, args, { user, models }) => {
    const [_, [updatedUser]] = await models.User.update(args, {
        where: { id: user!.id },
        returning: true,
    })

    return updatedUser
}

export { updateUser }

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
> = async (_parent, { email, timezone }, { requestor, models }) => {
    if (!requestor) {
        throw new AuthenticationError('Missing requestor')
    }

    const [_, [user]] = await models.User.update(
        { email, timezone },
        { where: { id: requestor.id }, returning: true }
    )

    return user
}

export { updateUser }

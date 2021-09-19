import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'
import { UserAttributes } from 'models/User'
import { Optional } from 'sequelize/types'

const updateUser: IFieldResolver<
    undefined,
    Context,
    Optional<UserAttributes, 'id'>
> = async (_parent, { username, email, timezone }, { requestor, models }) => {
    const [_, user] = await models.User.update(
        { username, email, timezone },
        { where: { id: requestor.id }, returning: true }
    )

    return user
}

export { updateUser as updateMe }

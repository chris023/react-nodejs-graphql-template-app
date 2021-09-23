import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'

interface Args {
    id: string
}

const deleteUser: IFieldResolver<
    undefined,
    Context,
    Args,
    Promise<number>
> = async (_parent, { id }, { models }) => {
    return await models.User.destroy({
        where: { id },
    })
}

export { deleteUser }

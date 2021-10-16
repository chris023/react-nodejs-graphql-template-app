import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'
import { UUIDV4 } from 'utils'
import { User } from 'models/User'

interface IArgs {
    id: UUIDV4
}

const user: IFieldResolver<
    undefined,
    Context,
    IArgs,
    Promise<User | null>
> = async (_parent, { id }, { models }) => await models.User.findByPk(id)

export { user }

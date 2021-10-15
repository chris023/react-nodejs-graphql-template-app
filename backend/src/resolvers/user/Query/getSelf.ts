import { AuthenticationError } from 'apollo-server-errors'
import { Context } from 'context'
import { IFieldResolver } from 'graphql-resolvers'
import { User } from 'models/User'

const getSelf: IFieldResolver<
    undefined,
    Context,
    Promise<User | null>
> = async (_parent, _args, { user }) => {
    user
}

export { getSelf }

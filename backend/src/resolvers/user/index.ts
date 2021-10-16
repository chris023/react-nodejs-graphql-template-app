/** Query resolvers */
import { user } from './user'
import { users } from './users'

/** Mutation resolvers */
import { deleteUser } from './deleteUser'
import { updateUser } from './updateUser'

/** User field resolvers */
import { business } from './fields'

const userResolvers = {
    Query: {
        user,
        users,
    },
    Mutation: {
        deleteUser,
        updateUser,
    },
    User: {
        business,
    },
}

export { userResolvers }

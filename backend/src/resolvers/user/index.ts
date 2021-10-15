import { getSelf, user, users } from './Query'
import { deleteUser, updateUser } from './Mutation'
import { business } from './fields'

const userResolvers = {
    Query: {
        getSelf,
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

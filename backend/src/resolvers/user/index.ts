/** Query resolvers */
/** Mutation resolvers */
import { deleteUser } from './deleteUser'
/** User field resolvers */
import { business } from './fields'
import { updateUser } from './updateUser'
import { user } from './user'
import { users } from './users'

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

/** Query resolvers */
/** Mutation resolvers */
import { changePassword } from './changePassword'
import { getSelf } from './getSelf'
import { updateSelf } from './updateSelf'

const selfResolvers = {
  Query: {
    getSelf,
  },
  Mutation: {
    changePassword,
    updateSelf,
  },
}

export { selfResolvers }

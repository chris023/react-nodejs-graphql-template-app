/** Query resolvers */
import { getSelf } from './getSelf'

/** Mutation resolvers */
import { changePassword } from './changePassword'
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

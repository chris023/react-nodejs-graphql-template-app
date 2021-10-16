/** Query resolvers */
import { business } from './business'
import { businesses } from './businesses'

/** Mutation resolvers */
import { createBusiness } from './createBusiness'
import { updateBusiness } from './updateBusiness'

/** Business field resolvers */
import { users } from './fields'

const businessResolvers = {
    Query: {
        business,
        businesses,
    },
    Mutation: {
        createBusiness,
        updateBusiness,
    },
    Business: {
        users,
    },
}

export { businessResolvers }

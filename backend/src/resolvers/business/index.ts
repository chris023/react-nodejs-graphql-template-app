/** Query resolvers */
import { business } from './business'
import { businesses } from './businesses'
/** Mutation resolvers */
import { createBusiness } from './createBusiness'
/** Business field resolvers */
import { users } from './fields'
import { updateBusiness } from './updateBusiness'

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

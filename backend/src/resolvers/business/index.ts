import { business, businesses } from './Query'
import { createBusiness } from './Mutation'
import { users } from './fields'

const businessResolvers = {
    Query: {
        business,
        businesses,
    },
    Mutation: {
        createBusiness,
    },
    Business: {
        users,
    },
}

export { businessResolvers }

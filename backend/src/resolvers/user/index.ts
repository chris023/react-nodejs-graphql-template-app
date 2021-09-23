import { Query } from './Query'
import { Mutation } from './Mutation'
import { business } from './fields'

const userResolvers = {
    Query,
    Mutation,
    User: {
        business,
    },
}

export { userResolvers }

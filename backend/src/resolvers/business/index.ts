import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated } from 'resolvers/authorization'

import * as Query from './Query'
import { createBusiness } from './Mutation'
import { users } from './fields'

const businessResolvers = {
    Query: {
        business: combineResolvers(isAuthenticated, business),
        businesses: combineResolvers(isAuthenticated, businesses),
    },
    Mutation: {
        createBusiness: combineResolvers(isAuthenticated, createBusiness),
    },
    Business: {
        users,
    },
}

export { businessResolvers }

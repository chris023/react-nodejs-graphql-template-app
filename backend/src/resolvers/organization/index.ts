import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated } from 'resolvers/authorization'

import { organization, organizations } from './Query'
import { Mutation } from './Mutation'
import * as Organization from './Organization'

const organizationResolvers = {
    Query: {
        organization: combineResolvers(isAuthenticated, organization),
        organizations: combineResolvers(isAuthenticated, organizations),
    },
    Mutation,
    Organization,
}

export { organizationResolvers }

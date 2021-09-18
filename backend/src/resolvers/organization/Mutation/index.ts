import { combineResolvers } from 'graphql-resolvers'

import { createOrganization } from './createOrganization'

import { isAuthenticated } from '../../authorization'

const Mutation = {
  createOrganization: combineResolvers(isAuthenticated, createOrganization),
}

export { Mutation }

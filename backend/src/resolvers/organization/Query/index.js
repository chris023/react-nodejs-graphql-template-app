import { combineResolvers } from 'graphql-resolvers'

import { organization } from './organization'
import { organizations } from './organizations'

import { isAuthenticated } from '../../authorization'

const Query = {
  organization: combineResolvers(isAuthenticated, organization),
  organizations: combineResolvers(isAuthenticated, organizations),
}

export { Query }

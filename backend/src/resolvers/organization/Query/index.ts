import { combineResolvers } from "graphql-resolvers"

import { organization } from "./organization"
import { organizations } from "./organizations/index.ts"

import { isAuthenticated } from "../../authorization"

const Query = {
  organization: combineResolvers(isAuthenticated, organization),
  organizations: combineResolvers(isAuthenticated, organizations),
}

export { Query }

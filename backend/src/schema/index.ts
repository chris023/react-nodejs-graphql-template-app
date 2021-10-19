import { makeExecutableSchema } from '@graphql-tools/schema'
import { directiveTypeDefs, injectDirectives } from 'directives'
import { typeDefs as graphqlScalarsTypeDefs } from 'graphql-scalars'
import { resolvers } from 'resolvers'

import authenticationDefs from './authentication'
import { baseDefs } from './baseDefs'
import businessDefs from './business'
import selfDefs from './self'
import userDefs from './user'

/** This allows the schema typedefs to be stitched together */
const typeDefs = [
  ...graphqlScalarsTypeDefs,
  ...directiveTypeDefs,
  baseDefs,
  authenticationDefs,
  businessDefs,
  selfDefs,
  userDefs,
]

/** Creates the schema from typeDefs and resolvers and injects custom directives */
const schema = injectDirectives(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
)

export { schema }

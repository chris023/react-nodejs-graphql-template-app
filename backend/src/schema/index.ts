import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs as graphqlScalarsTypeDefs } from 'graphql-scalars'

import authenticationDefs from './authentication'
import businessDefs from './business'
import userDefs from './user'

import * as resolvers from '../resolvers'

/** Generates the basic types to extend our schema from */
const baseDefs = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`
/** This allows the schema to be stitched together */
const typeDefs = [
    ...graphqlScalarsTypeDefs,
    baseDefs,
    authenticationDefs,
    businessDefs,
    userDefs,
]

export const schema = makeExecutableSchema({
    typeDefs,
    /** TODO: fix type  */
    resolvers: Object.values(resolvers) as any,
})

export { typeDefs }

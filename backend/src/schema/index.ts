import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs as graphqlScalarsTypeDefs } from 'graphql-scalars'

import authenticationDefs from './authentication'
import businessDefs from './business'
import userDefs from './user'

import { authDirectiveTypeDefs, authDirectiveTransformer } from './directives'

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
    authDirectiveTypeDefs,
    baseDefs,
    authenticationDefs,
    businessDefs,
    userDefs,
]

const transformers = [authDirectiveTransformer]

export const schema = transformers.reduce(
    (schema, transformerFn) => {
        return transformerFn(schema)
    },
    makeExecutableSchema({
        typeDefs,
        resolvers: Object.values(resolvers),
    })
)

export { typeDefs }

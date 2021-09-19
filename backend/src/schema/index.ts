import { gql } from 'apollo-server-express'

import business from './business'
import user from './user'

/** Generates the basic types to extend our schema from */
const baseSchema = gql`
    scalar DateTime

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
/** Stitches schemas together */
const schema = [baseSchema, business, user]

export default schema

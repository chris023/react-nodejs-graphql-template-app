import { gql } from "apollo-server-express"

import organizationSchema from "./organization"
import userSchema from "./user"

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

const schema = [baseSchema, organizationSchema, userSchema]

export default schema

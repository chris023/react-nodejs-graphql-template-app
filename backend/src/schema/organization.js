import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    organizations: [Organization]!
    organization(id: ID!): Organization!
  }

  extend type Mutation {
    createOrganization(name: String!): Organization!
  }

  type Organization {
    id: ID!
    name: String!
    users: [User]!
  }
`

import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        businesses: [Business]! @isAuthenticated
        business(id: ID!): Business!
    }

    extend type Mutation {
        createBusiness(name: String!): Business!
    }

    type Business {
        id: ID!
        name: String!
        users: [User]!
    }
`

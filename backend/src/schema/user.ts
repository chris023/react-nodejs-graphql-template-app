import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        user(id: ID!): User @auth(requires: admin)
        users: [User!] @auth(requires: admin)
        getSelf: User! @auth(requires: user)
    }

    extend type Mutation {
        deleteUser(id: ID!): Boolean!
        updateUser(email: String, timezone: String): User!
    }

    enum UserRole {
        admin
        user
    }

    type User {
        id: ID!
        username: String!
        email: String!
        roles: [UserRole]!
        business: Business!
        timezone: String
    }
`

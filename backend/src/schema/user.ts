import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        user(id: ID!): User
        users: [User!]
        getMe: User!
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

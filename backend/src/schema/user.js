import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]
    me: User
  }

  extend type Mutation {
    signUp(username: String!, password: String!, token: String!): Tokens!
    signIn(login: String!, password: String!): Tokens!
    generateSignUpToken(email: String!, roles: [String]!): SignUpToken!
    deleteUser(id: ID!): Boolean!
    attemptTokenRefresh(refreshToken: String!): AccessToken!
    updateMe(username: String, email: String, timezone: String): User!
    updateMyPassword(oldPassword: String!, newPassword: String!): User!
  }

  type AccessToken {
    token: String!
  }

  type SignUpToken {
    token: String!
  }

  type Tokens {
    accessToken: String!
    refreshToken: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    roles: [String]!
    organization: Organization!
    timezone: String
  }
`

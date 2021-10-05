import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
        changePassword(newPassword: String!, oldPassword: String!): User!
        createRegistrationToken(email: Email!, roles: [String!]!): AuthTokens!
        login(email: String!, password: String!): LoginResponse!
        refreshTokens(refreshToken: String!): LoginResponse!
        register: LoginResponse!
    }

    type LoginResponse {
        user: User!
        tokens: AuthTokens!
    }

    type AuthTokens {
        accessToken: String!
        refreshToken: String!
    }
`

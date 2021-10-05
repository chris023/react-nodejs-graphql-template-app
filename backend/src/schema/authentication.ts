import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
        changePassword(newPassword: String!, oldPassword: String!): User!
        createRegistrationToken(
            email: EmailAddress!
            roles: [UserRole!]!
        ): AuthTokens!
        login(email: EmailAddress!, password: String!): LoginResponse!
        refreshTokens(refreshToken: String!): AuthTokens!
        register(
            email: EmailAddress!
            password: String!
            timezone: String!
            registrationToken: JWT!
        ): LoginResponse!
    }

    type LoginResponse {
        user: User!
        tokens: AuthTokens!
    }

    type AuthTokens {
        accessToken: JWT!
        refreshToken: JWT!
    }
`

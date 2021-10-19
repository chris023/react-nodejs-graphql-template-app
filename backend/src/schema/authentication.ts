import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
        login(email: EmailAddress!, password: String!): LoginResponse!
        register(email: EmailAddress!, password: String!): LoginResponse!

        refreshTokens(refreshToken: String!): AuthTokens!
    }

    type AuthTokens {
        accessToken: JWT!
        refreshToken: JWT!
    }

    type LoginResponse {
        user: User!
        tokens: AuthTokens!
    }
`

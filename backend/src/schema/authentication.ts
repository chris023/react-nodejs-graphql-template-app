import { gql } from 'apollo-server-express'

export default gql`
    extend type Mutation {
        login(email: EmailAddress!, password: String!): LoginResponse!
        register(email: EmailAddress!, password: String!): LoginResponse!

        refreshTokens(refreshToken: String!): AuthTokens!

        type LoginResponse {
            user: User!
            tokens: AuthTokens!
        }

        type AuthTokens {
        accessToken: JWT!
        refreshToken: JWT!
    }
    }
`

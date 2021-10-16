import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        getSelf: User! @auth(requires: user)
    }

    extend type Mutation {
        updateSelf(firstName: String, lastName: String): User!
            @auth(requires: user)
        changePassword(newPassword: String!, oldPassword: String!): User!
            @auth(requires: user)
    }
`

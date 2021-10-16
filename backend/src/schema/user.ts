import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        user(id: UUID!): User @auth(requires: siteAdmin)
        users: [User!] @auth(requires: siteAdmin)
    }

    extend type Mutation {
        deleteUser(id: UUID!): Boolean! @auth(requires: siteAdmin)
        updateUser(id: UUID!, email: String, timezone: String): User! @auth(requires(:siteAdmin))
    }
`

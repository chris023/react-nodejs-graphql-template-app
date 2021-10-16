import gql from 'graphql-tag'

/** Generates the basic types to extend our schema from */
const baseDefs = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }

    enum Role {
        user
        admin
        siteAdmin
    }

    type User @auth(requires: user) {
        id: UUID!
        firstName: String!
        lastName: String!
        email: EmailAddress!
        role: Role!
        business: Business!
    }

    type Business @auth(requires: user) {
        id: UUID!
        name: String!
        users: [User]!
    }
`

export { baseDefs }

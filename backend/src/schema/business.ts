import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        businesses: [Business]! @auth(requires: siteAdmin)
        business(id: UUID!): Business! @auth(requires: siteAdmin)
    }

    extend type Mutation {
        createBusiness(name: String!): Business! @auth(requires: siteAdmin)
        updateBusiness(name: String!): Business! @auth(requires: siteAdmin)
    }
`

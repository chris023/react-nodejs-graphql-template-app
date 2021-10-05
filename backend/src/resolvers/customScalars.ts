import { resolvers as graphqlScalarsResolvers } from 'graphql-scalars'

const customScalars = {
    ...graphqlScalarsResolvers,
}

export { customScalars }

import { GraphQLSchema } from 'graphql'

import { authDirectiveTransformer } from './auth'

/** Should contain all custom directive schema transform functions */
const transformers = [authDirectiveTransformer]

/** Injects custom directives into a given schema */
const injectDirectives = (baseSchema: GraphQLSchema) =>
    transformers.reduce((schema, transformerFn) => {
        return transformerFn(schema)
    }, baseSchema)

export { injectDirectives }

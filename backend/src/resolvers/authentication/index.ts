/** Mutation resolvers */
import { login } from './login'
import { register } from './register'
import { refreshTokens } from './refreshTokens'

/** Aggregates all authentication resolvers */
const authenticationResolvers = {
    Mutation: {
        login,
        refreshTokens,
        register,
    },
}

export { authenticationResolvers }

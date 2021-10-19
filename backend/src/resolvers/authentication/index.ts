/** Mutation resolvers */
import { login } from './login'
import { refreshTokens } from './refreshTokens'
import { register } from './register'

/** Aggregates all authentication resolvers */
const authenticationResolvers = {
  Mutation: {
    login,
    refreshTokens,
    register,
  },
}

export { authenticationResolvers }

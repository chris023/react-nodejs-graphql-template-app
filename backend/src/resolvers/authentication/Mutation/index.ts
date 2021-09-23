import { changePassword } from './changePassword'
import { createRegistrationToken } from './createRegistrationToken'
import { login } from './login'
import { refreshTokens } from './refreshTokens'
import { register } from './register'

const Mutation = {
    changePassword,
    createRegistrationToken,
    login,
    refreshTokens,
    register,
}

export { Mutation }

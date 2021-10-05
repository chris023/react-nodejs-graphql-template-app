import {
    changePassword,
    createRegistrationToken,
    login,
    refreshTokens,
    register,
} from './Mutation'

const authenticationResolvers = {
    Mutation: {
        changePassword,
        createRegistrationToken,
        login,
        refreshTokens,
        register,
    },
}

export { authenticationResolvers }

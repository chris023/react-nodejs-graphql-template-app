import { refreshTokens as refresh, JsonWebToken } from 'utils/tokens'
import { MutationResolvers } from 'types'

interface IArgs {
    refreshToken: JsonWebToken
}

/**
 * Generates a new pair of tokens for authentication given an existing
 * refresh token.
 */
const refreshTokens: MutationResolvers['refreshTokens'] = async (
    _parent,
    { refreshToken },
    _context
) => {
    return refresh(refreshToken)
}

export { refreshTokens }

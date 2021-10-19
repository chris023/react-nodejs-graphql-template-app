import { MutationResolvers } from 'types'
import { refreshTokens as refresh } from 'utils/tokens'

/**
 * Generates a new pair of tokens for authentication given an existing
 * refresh token.
 */
const refreshTokens: MutationResolvers['refreshTokens'] = async (
  _parent,
  { refreshToken },
  _context,
) => refresh(refreshToken)

export { refreshTokens }

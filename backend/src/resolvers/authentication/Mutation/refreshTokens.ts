import { refreshTokens as refresh, JsonWebToken } from 'utils/tokens'
import { IFieldResolver } from 'graphql-resolvers'
import { Context } from 'context'

interface IArgs {
    refreshToken: JsonWebToken
}

const refreshTokens: IFieldResolver<undefined, Context, IArgs> = async (
    _parent,
    { refreshToken },
    _context
) => {
    return { tokens: refresh(refreshToken) }
}

export { refreshTokens }

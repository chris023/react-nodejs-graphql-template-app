import tokens from '../../../../utils/tokens'

const attemptTokenRefresh = async (_parent, { refreshToken }, _context) => {
  return { token: tokens.refresh(refreshToken) }
}

export { attemptTokenRefresh }

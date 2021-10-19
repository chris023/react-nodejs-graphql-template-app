import jwt from 'jsonwebtoken'
import { models, UserAttributes } from 'models'
import { AccessTokenPayload } from 'utils'

const getUser = async (req: any): Promise<UserAttributes | null> => {
  const token = req.headers['x-token']

  if (!token) {
    return null
  }

  try {
    const { id } = (await jwt.verify(
      token,
            process.env.ACCESS_TOKEN_SECRET!,
    )) as AccessTokenPayload

    const user = await models.User.findByPk(id)

    if (user) {
      return user
    }
  } catch (e) {
    return null
  }

  return null
}

export { getUser }

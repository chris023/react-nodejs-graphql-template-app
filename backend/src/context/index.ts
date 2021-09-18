import jwt from "jsonwebtoken"
import { ContextFunction } from "apollo-server-core"

import { models } from "models"
import { createLoaders } from "loaders"

const getRequestor = async (req: any) => {
  const token = req.headers["x-token"]

  if (token) {
    try {
      return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
    } catch (e) {
      return null
    }
  }
}

const context: ContextFunction = async ({ req }) => {
  const requestor = await getRequestor(req)
  const loaders = createLoaders()

  return {
    requestor,
    models,
    loaders,
  }
}

export { context }

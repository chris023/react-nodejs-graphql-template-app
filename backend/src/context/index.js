import jwt from "jsonwebtoken"

import models from "../models"
import { createLoaders } from "../loaders"

const getRequestor = async (req) => {
  const token = req.headers["x-token"]

  if (token) {
    try {
      return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (e) {
      return null
    }
  }
}

const context = async ({ req }) => {
  const requestor = await getRequestor(req)
  const loaders = createLoaders()

  return {
    requestor,
    models,
    loaders,
  }
}

export { context }

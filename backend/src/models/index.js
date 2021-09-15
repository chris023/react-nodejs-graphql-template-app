import Sequelize from "sequelize"

import User from "./User"
import Organization from "./Organization"

let sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  }
)

const models = {
  User,
  Organization,
}

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export default models

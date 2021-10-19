import { Sequelize } from 'sequelize-typescript'

import { Business, User } from '.'

export interface Models {
    Business: typeof Business
    User: typeof User
}

let sequelize: Sequelize

if (
  process.env.DATABASE_NAME
    && process.env.DATABASE_USER
    && process.env.DATABASE_PASSWORD
    && process.env.DATABASE_URL
) {
  /** Create a sequelize isntance */
  sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    models: [`${__dirname}/**/*.model.ts`],
    modelMatch: (filename, member) => filename.split('.')[0].toLowerCase() === member.toLowerCase(),
  })
} else {
  throw new Error('Missing database environment variables')
}

/** Fix typing on models */
const models = sequelize.models as unknown as Models

export { models, sequelize }

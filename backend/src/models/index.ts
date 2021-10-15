import { Sequelize } from 'sequelize'

import { User } from './User'
import { Business } from './Business'

export interface Models {
    User: typeof User
    Business: typeof Business
}

let sequelize: Sequelize

/** Aggregate models */
const models: Models = {
    User,
    Business,
}

if (
    process.env.DATABASE_NAME &&
    process.env.DATABASE_USER &&
    process.env.DATABASE_PASSWORD &&
    process.env.DATABASE_URL
) {
    /** Create a sequelize isntance */
    sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {
            host: process.env.DATABASE_URL,
            dialect: 'postgres',
        }
    )

    Object.keys(models).forEach((key) => {
        if ('setup' in models[key as keyof Models]) {
            // @ts-ignore todo: fix
            models[key as keyof Models].setup(sequelize)
        }
    })
} else {
    throw new Error('Missing database environment variables')
}

export { models, sequelize }

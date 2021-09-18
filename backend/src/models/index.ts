import { Sequelize } from 'sequelize'

import { User } from './User'
import { Business } from './Business'

/** Create a sequelize isntance */
const sequelize = new Sequelize(
    process.env.DATABASE_NAME!,
    process.env.DATABASE_USER!,
    process.env.DATABASE_PASSWORD!,
    {
        host: process.env.DATABASE_URL!,
        dialect: 'postgres',
    }
)

/** Aggregate models */
const models = {
    User,
    Business,
}

/** Link model associations */
Object.keys(models).forEach((key) => {
    if ('associate' in (models as any)[key]) {
        ;(models as any)[key].associate(models)
    }
})

export { models, sequelize }

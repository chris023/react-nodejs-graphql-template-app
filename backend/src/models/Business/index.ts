import { InitOptions, Model, Optional } from 'sequelize'

import { models, sequelize } from 'models'

import { columns } from './columns'

const config: InitOptions<Business> = {
    tableName: 'businesses',
    sequelize,
}

export interface BusinessAttributes {
    id: number
    name: string
}

/** Model Definition */
export class Business
    extends Model<BusinessAttributes, Optional<BusinessAttributes, 'id'>>
    implements BusinessAttributes
{
    /** Columns */
    id!: number
    name!: string

    /** Association helper */
    associate!: () => void
}

/** Associations */
;(Business as any).associate = () => {
    Business.hasMany(models.User)
}

/** Initialize */
Business.init(columns, config)

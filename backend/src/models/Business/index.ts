import { Model, Optional, Sequelize } from 'sequelize'

import { models } from 'models'

import { columns } from './columns'

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
;(Business as any).setup = (sequelize: Sequelize) =>
    Business.init(columns, {
        tableName: 'businesses',
        sequelize,
    })

import { Optional } from 'sequelize/types'
import {
  Column, HasMany, Model, PrimaryKey, Table,
} from 'sequelize-typescript'

import { User } from './User.model'

export interface BusinessAttributes {
    id: string
    name: string
}

export interface BusinessCreationAttributes
    extends Optional<BusinessAttributes, 'id'> {}

@Table
export class Business extends Model<
    BusinessAttributes,
    BusinessCreationAttributes
> {
    @PrimaryKey
    @Column
    id!: string

    @Column
    name!: string

    @HasMany(() => User)
    users!: User[]
}

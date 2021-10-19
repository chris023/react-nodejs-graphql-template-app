import { Optional } from 'sequelize/types'
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { ResolversTypes, Role } from 'types'

import { Business } from './Business.model'

export interface UserAttributes {
    id: ResolversTypes['UUID']
    firstName: string
    lastName: string
    email: ResolversTypes['EmailAddress']
    role: Role
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @Column
    id!: string

    @Column
    firstName!: string

    @Column
    lastName!: string

    @Column
    email!: string

    @Column
    role!: Role

    @Column
    @ForeignKey(() => Business)
    businessId!: string

    @BelongsTo(() => Business)
    business!: Business[]
}

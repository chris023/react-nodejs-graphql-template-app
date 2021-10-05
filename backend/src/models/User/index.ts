import bcrypt from 'bcryptjs'
import { Model, Optional, Sequelize } from 'sequelize'

import { models } from 'models'

import { columns } from './columns'
import { UUIDV4 } from 'utils'

export type UserRole = 'user' | 'admin'

export interface UserBaseAttributes {
    id: UUIDV4
    email: string
    password: string | null
    roles: UserRole[]
    timezone: string
}

export interface UserForeignAttributes {
    /** Foreign relationships */
    businessId: UUIDV4
}

export interface UserAttributes
    extends UserBaseAttributes,
        UserForeignAttributes {}

export interface UserCustomMethods {
    setup: (sequelize: Sequelize) => void
}

/** Model Definition */
export class User
    extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
    implements UserAttributes, UserCustomMethods
{
    roles!: UserRole[]
    id!: UUIDV4
    email!: string
    password!: string | null
    timezone!: string

    /** Foreign relationships */
    businessId!: UUIDV4

    /** PostgreSQL default columns */
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    /** Instance methods */
    generatePasswordHash!: () => Promise<string>
    generateNewPasswordHash!: (newPassword: string) => Promise<string>
    validatePassword!: (password: string) => Promise<boolean>

    /** Association helper */
    setup = (sequelize: Sequelize) => {
        User.init(columns as any, {
            tableName: 'users',
            sequelize,
        })
    }
}

/** Associations */
User.belongsTo(models.Business)

/** Side Effects */
/** TODO: Fix this */
// User.beforeCreate(async (user) => {
//     user.password = await user.generatePasswordHash()
// })

/** Instance Methods */
User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10
    return await bcrypt.hash(this.password!, saltRounds)
}

User.prototype.generateNewPasswordHash = async (newPassword) => {
    const saltRounds = 10
    return await bcrypt.hash(newPassword, saltRounds)
}

User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password!)
}

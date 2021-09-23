import bcrypt from 'bcryptjs'
import { InitOptions, Model, Optional } from 'sequelize'

import { models, sequelize } from 'models'

import { columns } from './columns'
import { UUIDV4 } from 'utils'

const config: InitOptions<User> = {
    tableName: 'users',
    sequelize,
}

export type UserRole = 'user' | 'admin'

export interface UserAttributes {
    id: UUIDV4
    email: string
    password: string | null
    roles: UserRole[]
    timezone: string

    /** Foreign relationships */
    businessId: UUIDV4
}

/** Model Definition */
export class User
    extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
    implements UserAttributes
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
    associate!: () => void
}

/** Associations */
;(User as any).associate = () => {
    User.belongsTo(models.Business)
}

/** Side Effects */
User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash()
})

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

/** Initialize */
User.init(columns, config)

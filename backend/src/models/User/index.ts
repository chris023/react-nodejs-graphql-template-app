import bcrypt from 'bcryptjs'
import { InitOptions, Model, Optional } from 'sequelize'

import { models, sequelize } from 'models'

import { columns } from './columns'

const config: InitOptions<User> = {
    tableName: 'users',
    sequelize,
}

export interface UserAttributes {
    id: number
    username: string
    email: string
    password: string | null
    timezone: string
}

/** Model Definition */
export class User
    extends Model<UserAttributes, Optional<UserAttributes, 'id'>>
    implements UserAttributes
{
    id!: number
    username!: string
    email!: string
    password!: string | null
    timezone!: string

    /** Foreign relationships */
    businessId!: number

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

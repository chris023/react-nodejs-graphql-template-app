import { DataTypes, ModelAttributes } from 'sequelize'

import { User, UserAttributes, UserRole } from './'

const roles: UserRole[] = ['user', 'admin']

const columns: ModelAttributes<User, UserAttributes> = {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [59, 61],
        },
    },
    timezone: { type: DataTypes.STRING },
    roles: {
        type: DataTypes.ARRAY(DataTypes.ENUM(roles as any)),
    },
}

export { columns }

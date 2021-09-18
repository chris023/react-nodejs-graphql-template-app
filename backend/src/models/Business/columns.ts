import { DataTypes, ModelAttributes } from "sequelize"

import { Business, BusinessAttributes } from "./"

const columns: ModelAttributes<Business, BusinessAttributes> = {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
}

export { columns }

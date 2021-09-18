const organization = (sequelize, DataTypes) => {
  const Organization = sequelize.define("organization", {
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
  })

  Organization.associate = (models) => {
    Organization.hasMany(models.User)
  }

  return Organization
}

export default organization

import bcrypt from "bcryptjs"

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
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
  })

  User.associate = (models) => {
    User.belongsTo(models.Organization)
  }

  /** Try to find user by email */
  User.findByLogin = async (email) => {
    return await User.findOne({
      where: { email },
    })
  }

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash()
  })

  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10
    return await bcrypt.hash(this.password, saltRounds)
  }

  User.prototype.generateNewPasswordHash = async (newPassword) => {
    const saltRounds = 10
    return await bcrypt.hash(newPassword, saltRounds)
  }

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  return User
}
export default user

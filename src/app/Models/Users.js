const {DataTypes, Model } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
    name:  DataTypes.STRING,
    email: DataTypes.STRING,
    password:  DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    return this;
  }
  static associate(models) {
    this.hasOne(models.Addresses, {
      foreignKey: 'user_id',
      as: 'address',
    });
  }
}
module.exports = Users;




const {DataTypes, Model } = require('sequelize');

class Addresses extends Model {
  static init(sequelize) {
    super.init(
      {
        zipcode: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        district: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        complement: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'addresses',
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
module.exports = Addresses;




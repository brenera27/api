const {DataTypes, Model } = require('sequelize');

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    inventory: DataTypes.INTEGER,
    min_inventory: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
      },
      {
        sequelize,
        tableName: 'products',
      }
    );

    return this;
  }
}
module.exports = Products;






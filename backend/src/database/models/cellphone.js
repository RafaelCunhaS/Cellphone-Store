module.exports = (sequelize, DataTypes) => {
  const Cellphone = sequelize.define(
    'Cellphone',
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      color: DataTypes.STRING,
    },
    { underscored: true, tableName: 'Cellphones' }
  );

  return Cellphone;
};

module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define(
    'Phone',
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      color: DataTypes.STRING,
    },
    { underscored: true }
  );

  return Phone;
};

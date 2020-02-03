module.exports = function (sequelize, DataTypes) {
  var Treasure = sequelize.define("Treasure", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Treasure.associate = function (models) {
    Treasure.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Treasure;
};

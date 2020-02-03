module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exitN: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    exitE: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    exitW: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    exitS: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Location.associate = function (models) {
    Location.hasMany(models.Monster);
    Location.hasMany(models.Treasure);
  };

  return Location;
};

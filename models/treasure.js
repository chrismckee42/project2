// class treasureObj {
//   constructor(name, value, LocationId) {
//     this.name = name;
//     this.value = value;
//     this.LocationId = LocationId;
//   }
// }

module.exports = function(sequelize, DataTypes) {
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

  Treasure.associate = function(models) {
    Treasure.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // function populate() {
  //   Treasure.create(new treasureObj(i, j, locationList[k]));
  // }

  // populate();
  return Treasure;
};

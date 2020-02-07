// class monsterObj {
//   constructor(name, hp, attack, LocationId) {
//     this.name = name;
//     this.hp = hp;
//     this.attack = attack;
//     this.LocationId = LocationId;
//   }
// }

module.exports = function(sequelize, DataTypes) {
  var Monster = sequelize.define("Monster", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Monster.associate = function(models) {
    Monster.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // function populate() {
  //   Monster.create(new monsterObj("Troll", 10, 3));
  // }

  // populate();

  return Monster;
};

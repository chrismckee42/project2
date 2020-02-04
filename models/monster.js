class monsterObj {
  constructor(name, hp, attack) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
  }
}

module.exports = function (sequelize, DataTypes) {
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

  Monster.associate = function (models) {
    Monster.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Monster;
};

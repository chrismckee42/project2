module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    charClass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hpMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dodge: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gold: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    monster1HP: {
      type: DataTypes.INTEGER,
      defaultValue: 30
    },
    monster2HP: {
      type: DataTypes.INTEGER,
      defaultValue: 50
    },
    monster3HP: {
      type: DataTypes.INTEGER,
      defaultValue: 60
    },
    monster4HP: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    treasure1Found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    treasure2Found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    treasure3Found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    treasure4Found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    treasure5Found: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Game;
};

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
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dodge: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false
    },
    gold: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    monster1HP: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    monster1Alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: True
    },
    monster2HP: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    monster2Alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: True
    },
    monster3HP: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    monster3Alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: True
    },
    monster4HP: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    monster4Alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: True
    }
  });

  return Game;
};

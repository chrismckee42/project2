module.exports = function (sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    decription: {
      type: DataTypes.STRING
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
    gold: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });

  Player.associate = function (models) {
    Player.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Player;
};

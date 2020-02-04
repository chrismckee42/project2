const xMax = 3;
const yMax = 3;
const locationList = [
  "Swamp",
  "Field",
  "Abandoned Fort",
  "Forest",
  "Town",
  "Farm",
  "Dark Cave",
  "Rolling Hills",
  "Mountains"
];

class locationObj {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.exitN = y !== yMax;
    this.exitE = x !== 1;
    this.exitW = x !== xMax;
    this.exitS = y !== 1;
  }
}

module.exports = function(sequelize, DataTypes) {
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

  Location.associate = function(models) {
    Location.hasMany(models.Monster);
    Location.hasMany(models.Treasure);
  };

  function populate() {
    let k = 0;
    for (let i = 1; i <= xMax; i++) {
      for (let j = 1; j <= yMax; j++) {
        Location.create(new locationObj(i, j, locationList[k]));
        k++;
      }
    }
  }

  // only populate the table
  Location.findAll({}).then(function(dbLocations) {
    //res.json(dbLocations);
    console.log(">>>Length: ", dbLocations.length);
    if (dbLocations.length === 0) {
      populate();
    }
  });

  return Location;
};

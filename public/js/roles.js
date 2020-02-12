const Role = require("./Role.js");

const roles = {
  //0 : hp, 1: atk, 2: dodge chance (x = x/10 times a strike will mss)
  barb: new Role(100, 15, 1),
  druid: new Role(80, 12, 4),
  rogue: new Role(50, 8, 6)
};

module.exports = roles;
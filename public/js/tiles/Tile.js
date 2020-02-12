const gridSize = require("./gridSize.js");

class Tile {
  constructor(id) {
    this.id = id;
    this.y = Math.floor((id - 1) / gridSize);
    this.x = Math.floor((id - 1) % gridSize);
  }
}

module.exports = Tile;

DROP DATABASE IF EXISTS game_db;
CREATE DATABASE game_db;
USE game_db;

CREATE TABLE locations
(
  id INT NOT NULL,
  x INT NOT NULL,
  y INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  exit_n BOOLEAN NOT NULL DEFAULT TRUE,
  exit_e BOOLEAN NOT NULL DEFAULT TRUE,
  exit_w BOOLEAN NOT NULL DEFAULT TRUE,
  exit_s BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (id)
);

CREATE TABLE monsters
(
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  hp INT NOT NULL,
  attack INT NOT NULL,
  location_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE treasure
(
  id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  location_id INT,
  monster_id INT,
  PRIMARY KEY (id)
);

INSERT INTO locations
  (x, y, name)
VALUES
  (1, 1, "Swamp"),
  (2, 1, "Field"),
  (3, 1, "Abandoned Fort"),
  (1, 2, "Forest"),
  (2, 2, "Town"),
  (3, 2, "Farm"),
  (1, 3, "Dark Cave"),
  (2, 3, "Rolling Hills"),
  (3, 3, "Mountains");

UPDATE locations SET exit_n = FALSE WHERE y = 3;
UPDATE locations SET exit_e = FALSE WHERE x = 3;
UPDATE locations SET exit_w = FALSE WHERE x = 1;
UPDATE locations SET exit_s = FALSE WHERE y = 1;

INSERT INTO monsters
  (name, hp, attack, location_id)
VALUES
  ("Troll", 10, 3, 1),
  ("Goblin", 3, 1, 8),
  ("Owlbear", 6, 2, 4),
  ("Bandit", 5, 2, 3);

INSERT INTO treasure
  (name, amount, location_id)
VALUES
  ("Emerald Knife", 20, 7),
  ("Jeweled Crown", 50, 9);

INSERT INTO treasure
  (name, amount, monster_id)
VALUES
  ("Bag of Copper Coins", 5, 2),
  ("Silver Chalice", 40, 1),
  ("Chest of loot", 100, 4);

SELECT *
FROM locations;
SELECT *
FROM monsters;
SELECT *
FROM treasure;
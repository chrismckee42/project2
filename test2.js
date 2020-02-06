let coord = [1, 2];
let id = [
    [NaN, NaN],
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2]
  ].reduce((acc, cur, i) => cur[0] === coord[0] && cur[1] === coord[1] ? i : acc,null)
  console.log(id)
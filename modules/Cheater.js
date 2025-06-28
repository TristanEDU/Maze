// solver.js
function moveRatNearFood() {
  const key = ([x, y]) => `${x},${y}`;

  function getRatPosition() {
    for (let i = 0; i < mazearray.length; i++) {
      for (let j = 0; j < mazearray[i].length; j++) {
        if (mazearray[i][j] === 2) return [i, j];
      }
    }
    return null;
  }

  function getFoodPosition() {
    for (let i = mazearray.length - 1; i >= 0; i--) {
      for (let j = mazearray[i].length - 1; j >= 0; j--) {
        if (mazearray[i][j] === 1) return [i, j];
      }
    }
    return null;
  }

  function bfs(start, end) {
    let queue = [[start, []]];
    let visited = new Set();
    visited.add(key(start));
    let dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (queue.length) {
      let [[x, y], path] = queue.shift();
      if (x === end[0] && y === end[1]) return path.concat([[x, y]]);
      for (let [dx, dy] of dirs) {
        let nx = x + dx,
          ny = y + dy;
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < mazearray.length &&
          ny < mazearray[0].length &&
          (mazearray[nx][ny] === 1 || (nx === end[0] && ny === end[1])) &&
          !visited.has(key([nx, ny]))
        ) {
          visited.add(key([nx, ny]));
          queue.push([[nx, ny], path.concat([[x, y]])]);
        }
      }
    }
    return null;
  }

  function moveRatTo([x, y]) {
    let [curX, curY] = getRatPosition();
    mazearray[curX][curY] = 1;
    mazearray[x][y] = 2;

    const rat = document.getElementById("rat");
    rat.style.top = `${x * 10}px`;
    rat.style.left = `${y * 10}px`;

    document
      .querySelectorAll(".cell.crossed")
      .forEach((cell) => cell.classList.remove("crossed"));
    const cell = document.querySelector(`[data-position="${x}-${y}"]`);
    if (cell) cell.classList.add("crossed");
  }

  const ratPos = getRatPosition();
  const foodPos = getFoodPosition();
  const path = bfs(ratPos, foodPos);

  if (path && path.length > 2) {
    const target = path[path.length - 3];
    moveRatTo(target);
    console.log("✅ Rat moved two steps from food:", target);
  } else {
    console.log("⚠️ Rat already near food or no path found.");
  }
}

// Expose to global so button can call it
window.moveRatNearFood = moveRatNearFood;

document.addEventListener("DOMContentLoaded", () => {
  const solveBtn = document.getElementById("solve-btn");
  if (solveBtn) {
    solveBtn.addEventListener("click", moveRatNearFood);
  }
});

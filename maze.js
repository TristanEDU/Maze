import { level1 } from "./modules/mazeMatrix.js";
// console.log(level1);

let mazearray = level1;
window.mazearray = mazearray;

let maze = document.getElementById("maze-container");
let rat = document.getElementById("rat");
let food = document.getElementById("food");
// let i = 0; i < mazearray.length; i++;
// let j = 0; j < mazearray.length; j++;
function setratposition(x, y) {
  rat.style.top = x + "px";
  rat.style.left = y + "px";
}
function setfoodposition(x, y) {
  food.style.bottom = x + "px";
  food.style.right = y + "px";
}

function createMaze() {
  for (let i = 0; i < mazearray.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < mazearray[i].length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      cell.setAttribute("data-position", `${i}-${j}`);

      if (mazearray[i][j] == 0) {
        cell.classList.add("wall");
      }

      if (i == 0 && j == 0) {
        mazearray[i][j] = 2;
        // cell.classList.add("start");
        // console.log("Top-left cell changed to:", mazearray[i][j]);
      }

      row.appendChild(cell);
    }

    maze.appendChild(row);
  }

  // setratposition(0, 0);
}

createMaze();
// highlightRatCell();
// console.log("Updated matrix:", mazearray[0][0]);

function getratposition() {
  let position = [-1, -1];
  for (let i = 0; i < mazearray.length; i++) {
    // let row = document.createElement("div");
    // row.classList.add("row");

    for (let j = 0; j < mazearray[i].length; j++) {
      // let cell = document.createElement("div");
      // cell.classList.add("cell");

      if (mazearray[i][j] == 2) {
        position[0] = i;
        position[1] = j;
        //   cell.classList.add("wall");
      }

      // if (i == 0 && j == 0) {
      //   mazearray[i][j] = 2;
      // cell.classList.add("start");
      // console.log("Top-left cell changed to:", mazearray[i][j]);
      // }

      // row.appendChild(cell);
    }

    // maze.appendChild(row);
  }

  console.log(position);
  return position;
}

getratposition();

document.addEventListener("keydown", function (e) {
  let rat = document.getElementById("rat");
  let food = document.getElementById("food");
  let ratleft = rat.offsetLeft;
  let rattop = rat.offsetTop;
  let foodleft = food.offsetLeft;
  let foodtop = food.offsetTop;
  let ratposition = getratposition();

  console.log(mazearray[ratposition[0]][ratposition[1] + 1] == 1);
  console.log(mazearray);

  // for (let i = 0; i < mazearray.length; i++) {
  //   for (let j = 0; j < mazearray[i].length; j++) {
  //     if (i == 2 && j == 2) {
  //       const targetCell = getratposition[i][j] == 2;
  //       if (targetCell) targetCell.classList.add("crossed");
  //     }
  //   }
  // }

  if (
    e.key == "ArrowRight" &&
    ratleft < (mazearray.length - 1) * 10 &&
    mazearray[ratposition[0]][ratposition[1] + 1] == 1
  ) {
    ratleft += 10;
    rat.style.left = ratleft + "px";
    mazearray[ratposition[0]][ratposition[1]] = 1;
    mazearray[ratposition[0]][ratposition[1] + 1] = 2;
    console.log(ratleft, rattop);
  }

  getratposition();

  if (
    e.key == "ArrowLeft" &&
    ratleft < (mazearray.length - 1) * 10 &&
    mazearray[ratposition[0]][ratposition[1] - 1] == 1
  ) {
    ratleft -= 10;
    rat.style.left = ratleft + "px";
    {
      mazearray[ratposition[0]][ratposition[1]] = 1;
      mazearray[ratposition[0]][ratposition[1] - 1] = 2;
      // console.log(mazearray);
    }
  }
  if (
    e.key == "ArrowUp" &&
    ratleft < (mazearray.length - 1) * 10 &&
    mazearray[ratposition[0] - 1][ratposition[1]] == 1
  ) {
    rattop -= 10;
    rat.style.top = rattop + "px";
    {
      mazearray[ratposition[0]][ratposition[1]] = 1;
      mazearray[ratposition[0] - 1][ratposition[1]] = 2;
      // console.log(mazearray);
    }
  }
  if (
    e.key == "ArrowDown" &&
    ratleft < (mazearray.length + 1) * 10 &&
    mazearray[ratposition[0] + 1][ratposition[1]] == 1
  ) {
    rattop += 10;
    rat.style.top = rattop + "px";
    {
      mazearray[ratposition[0]][ratposition[1]] = 1;
      mazearray[ratposition[0] + 1][ratposition[1]] = 2;
      // console.log(mazearray);
    }
  }

  if (ratleft == foodleft) {
    alert("Great job! 2 will bring you this much closer to escape!");
  }
  // if (i == 2 && j == 2) {
  //         cell.classList.add("crossed");
  //       }
  highlightRatCell();
});

function highlightRatCell() {
  // Remove 'crossed' from all cells
  // document.querySelectorAll('.cell.crossed').forEach(cell => {
  //   cell.classList.remove('crossed');
  // });

  // Get rat's position
  const [i, j] = getratposition();
  // Select the cell with the matching data-position
  const cell = document.querySelector(`[data-position="${i}-${j}"]`);
  if (cell) {
    console.log(cell);
    cell.classList.add("crossed");
  }
}

window.addEventListener(
  "keydown",
  function (e) {
    // Check if the pressed key is an arrow key (keyCode values for arrow keys)
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      // Prevent the default scrolling behavior
      e.preventDefault();
    }
  },
  false
);

// Add event listeners for mobile controls to simulate arrow key presses
function triggerArrowKey(key) {
  document.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

const upBtn = document.getElementById("arrow-up");
const downBtn = document.getElementById("arrow-down");
const leftBtn = document.getElementById("arrow-left");
const rightBtn = document.getElementById("arrow-right");

if (upBtn && downBtn && leftBtn && rightBtn) {
  upBtn.addEventListener("click", () => triggerArrowKey("ArrowUp"));
  downBtn.addEventListener("click", () => triggerArrowKey("ArrowDown"));
  leftBtn.addEventListener("click", () => triggerArrowKey("ArrowLeft"));
  rightBtn.addEventListener("click", () => triggerArrowKey("ArrowRight"));
}

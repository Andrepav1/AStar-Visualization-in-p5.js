// ===============================
// @author: Andrea Pavan
// @project: A* Visualiser and Priority Queue
// ===============================

const grid = new Grid(ROWS, COLS);
const searchAlgorithm = new Astar(grid);

var heuristicSelect, searchAlgorithmSelect;

function setup() {
  createCanvas(TABLE_SIZE + MENU_WIDTH, TABLE_SIZE);

  stepInterval = 0; // In milliseconds

  strokeWeight(0.2);
  stroke(180);

  // Set table
  background("#ffc226");
  
  grid.init();
  grid.draw();

  grid.setRandomObstacles(OBSTACLES_PERC);

  setTimeout(() => {
    grid.setRandomStart();
    grid.setRandomTarget();
  }, 20); // timeout necessary as sometimes these cells are not set.

  // UI Creation 
  heuristicSelect = createSelect();
  heuristicSelect.size((MENU_WIDTH / 10) * 8);
  heuristicSelect.position(TABLE_SIZE + (MENU_WIDTH / 10), (MENU_WIDTH / 4) * 5);
  heuristicSelect.option('Manhattan');
  heuristicSelect.option('Euclidean');
  
  searchAlgorithmSelect = createSelect();
  searchAlgorithmSelect.size((MENU_WIDTH / 10) * 8);
  searchAlgorithmSelect.position(TABLE_SIZE + (MENU_WIDTH / 10), (MENU_WIDTH / 4) * 6);
  searchAlgorithmSelect.option('A*');
  searchAlgorithmSelect.option('BFS');

  // Buttons 
  var startButton = createButton('Start');
  startButton.size(MENU_WIDTH / 2);
  startButton.position(TABLE_SIZE + (MENU_WIDTH / 4), (MENU_WIDTH / 4) * 1);
  startButton.mousePressed(() => startAlgorithm());

  var resetButton = createButton('Reset');
  resetButton.size(MENU_WIDTH / 2);
  resetButton.position(TABLE_SIZE + (MENU_WIDTH / 4), (MENU_WIDTH / 4) * 2);
  resetButton.mousePressed(() => resetGrid());

}

function resetGrid() {
  grid.reset();
  searchAlgorithm.reset();
}

// ======================================================
// Animation control functions
// ======================================================
function startAlgorithm() {
  if (grid.isValid()) {

    searchAlgorithm.start();

  } else {
    print("Before you can Start the animation, you need to set starting and target cells");
    print("Double click to set the starting cell and the target cell.");
  }
}




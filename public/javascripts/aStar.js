class Astar {

  constructor(_grid) {
    this.grid = _grid;
    this.init();
  }

  reset() {

    if(this.targetFound) {
      this.init();
    }
    else {
      this.scheduledReset = true;
    }
    
  }

  init() {
    this.running = false;
    this.targetFound = false;
    this.scheduledReset = false;
    this.availableCells = new PriorityQueue();
    this.currPosition = new Position();
    this.path = [];
  }

  start() {

    if(this.running || this.targetFound) return;

    this.running = true;

    this.currPosition = this.grid.startPos;

    // important: set starting cell F value to 0
    this.grid.getCell(this.currPosition).f = 0;

    // Adding start position to path
    this.path.push(this.grid.startPos);

    this.step();
  }

  step() {

    if(this.scheduledReset) {
      return this.init()
    }

    // Set adjacent cells values and add them to priority queue
    this.setHeuristicOnAvailableCells();

    // Get the head of the priority Queue
    let currCell = this.getBestSuccessorCell();

    // All cells in the grid have been finished
    if (currCell == null) {
      this.grid.updateUnseenCellsColor();
      
      print("No path could be found.");
      this.targetFound = true;
      this.running = false;
      return;
    }
    
    this.currPosition = currCell.pos;

    // Cell has been found
    if (this.currPosition.equals(this.grid.targetPos)) {
  
      this.reconstructPath(this.grid.targetPos);
      this.drawPath(FINAL_PATH_COLOR, 4);
      
      print("Target Found.");
      this.targetFound = true;
      this.running = false;
      return;
    }
    
    // Set current cell to visited
    if (!this.currPosition.equals(this.grid.startPos) && !this.currPosition.equals(this.grid.targetPos)) {
      currCell.setType(cellTypes.VISITED);
    }
        
    // trace path from start position to current position
    this.reconstructPath(this.currPosition);
    this.drawPath();
    
    if(this.running) setTimeout(() => this.step(), STEP_VELOCITY)

  }

  getBestSuccessorCell() {
    return this.availableCells.pop();
  }

  setHeuristicOnAvailableCells() {

    let currCell = this.grid.getCell(this.currPosition);

    // Get the available cells
    let adjacentCells = this.getAvailableCells(this.currPosition);
  
    for (let i = 0; i < adjacentCells.length; i++) {

      let adjacentCell = adjacentCells[i];
      
      if (adjacentCell.type === cellTypes.VISITED || adjacentCell.type === cellTypes.START) {
        continue;
      }

      // Updating F on the current cell
      let newF = currCell.f + this.getDistance(currCell.pos, adjacentCell.pos);

      if (newF < adjacentCell.f) {
        adjacentCell.f = newF;
      } 

      // setting heuristic on cell
      switch(heuristicSelect.value()) {
        case "Manhattan":
          adjacentCell.heuristic = this.getManhattanHeuristic(adjacentCell.pos, this.grid.targetPos);
          break;
        case "Euclidean":
          adjacentCell.heuristic = this.getManhattanHeuristic(adjacentCell.pos, this.grid.targetPos);
          break;
        default: // Manhattan by default
          adjacentCell.heuristic = this.getManhattanHeuristic(adjacentCell.pos, this.grid.targetPos);
          break;
      }

      // calculating cell value
      if(searchAlgorithmSelect.value() === "A*") {
        adjacentCell.v = adjacentCell.heuristic + adjacentCell.f;
      }
      else { // BFS: Easily implemented by removing heuristic from final value
        adjacentCell.v = adjacentCell.f;
      }
      // console.log("h", adjacentCell.heuristic, "f", adjacentCell.f, "v", adjacentCell.v);

      //Add cell to priority queue
      this.availableCells.insert(adjacentCell);

      if (!adjacentCell.pos.equals(this.grid.startPos) && !adjacentCell.pos.equals(this.grid.targetPos))
        adjacentCell.setType(cellTypes.SEEN);

    }
  }

  /* This function returns an array of cells that can be reached from the given cell
  *  Here, diagonal movement is only permitted where the 2 cells are reachable in 2 moves
  *  only using the white cells 
  */
  getAvailableCells(currPos) {
    let availableCells = [];
  
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
  
        // Making sure that cell is within the grid scope 
        if (currPos.x + i >= 0 && currPos.x + i < this.grid.cols && currPos.y + j >= 0 && currPos.y + j < this.grid.rows) {

          // getting adjacent position
          let adjacentCell = this.grid.getCell(currPos.x + i, currPos.y + j);

          if (adjacentCell.type === cellTypes.OBSTACLE) {
            continue;
          }

          // Manhattan distance has to be 2
          if (this.getManhattanHeuristic(currPos, adjacentCell.pos) == 2) {

            var cx = this.grid.getCell(currPos.x, currPos.y + j);
            var cy = this.grid.getCell(currPos.x + i, currPos.y);

            if (cx.type === cellTypes.OBSTACLE && cy.type === cellTypes.OBSTACLE) {
              continue;
            }

          } 
          // cell available to be visited next
          availableCells.push(adjacentCell);
        }

      }

    }

    return availableCells;
  }

  reconstructPath(currPos) {
    var count = 0;

    this.path = [];
    let currCell = this.grid.getCell(currPos);

    while (!currCell.pos.equals(this.grid.startPos)) {

      this.path.push(currCell.graphicalPos);      
      currCell = this.FindAdjacentLowestF(currCell);

      if (count++ > this.grid.rows * this.grid.cols) break;
    }

    this.path.push(currCell.graphicalPos);
  }

  // Finds the lowest adjacent f (closest available cell to the start) 
  FindAdjacentLowestF(curr) {
    var minC = curr;
    var adjacentCellsArr = this.getAvailableCells(curr.pos);

    for (var i = 0; i < adjacentCellsArr.length; i++) {
      var adjacentCell = adjacentCellsArr[i];

      if (adjacentCell.type === cellTypes.VISITED || adjacentCell.type === cellTypes.START) {

        if (adjacentCell.f < minC.f) {
          minC = adjacentCell;
        }

      }
    }
    return minC;
  }

  drawPath(color = PATH_COLOR, strokeW = 0.5) {

    // console.log(this.path);

    for (var i = 0; i < this.path.length-1; i++) {
      let from = this.path[i];
      let to = this.path[i+1];
      let offset = TABLE_SIZE / ROWS * 0.5;
      strokeWeight(strokeW);
      stroke(color);

      line(from.x + offset, from.y + offset, to.x + offset, to.y + offset);
      
    }
  }
  
  getManhattanHeuristic(from, to) {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
  }
  
  getEuclideanHeuristic(from, to) {
    return this.getDistance(from, to);
  }
  
  getDistance(from, to) {
    var a = from.x - to.x;
    var b = from.y - to.y;
    return Math.sqrt(a * a + b * b);
  }

}
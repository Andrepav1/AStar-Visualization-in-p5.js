// ============================================================
// Cell and Grid classes
// ============================================================

class Cell {
  constructor(_x, _y) {

    // Functional elements
    this.pos = new Position(_x,_y);
    this.type = cellTypes.UNSEEN;

    // Graphical elements
    this.graphicalPos = new Position(TABLE_SIZE / COLS * _x, TABLE_SIZE / ROWS * _y);
    this.h = TABLE_SIZE / ROWS;
    this.w = TABLE_SIZE / COLS;

    // search algorithm elements
    this.heuristic = Infinity;
    this.f = Infinity;
    this.v = Infinity;
  }

  setType(type) {

    if(this.type === type) {
      return false;
    }
    else {
      this.type = type;

      // re-draw cell when type changes 
      this.draw()

      return true;
    }
    
  }

  equals(c) {
    return (this.pos.x == c.pos.x && this.pos.y == c.pos.y)
  }

  draw() {

    switch(this.type) {
      case cellTypes.UNSEEN: 
        fill(UNSEEN_COLOR);
        break;
      case cellTypes.SEEN:
        fill(SEEN_COLOR);
        break;
      case cellTypes.UNVISITED:
        fill(UNVISITED_COLOR);
        break;
      case cellTypes.VISITED:
        fill(VISITED_COLOR);
        break;
      case cellTypes.OBSTACLE:
        fill(OBSTACLE_COLOR);
        break;
      case cellTypes.PATH:
        fill(PATH_COLOR);
        break;
      case cellTypes.TARGET:
        fill(TARGET_COLOR);
        break;
      case cellTypes.START:
        fill(START_COLOR);
        break;
      default:
        fill(UNSEEN_COLOR);
        break;
    }

    strokeWeight(0.2);
    stroke(180);
    rect(this.graphicalPos.x, this.graphicalPos.y, this.w, this.h);
  }

  toString() {
    return "x: " + this.x + " y: " + this.y;
  }
}

class Grid {

  constructor(_rows, _cols) {
    
    this.cells = [];
    this.rows = _rows;
    this.cols = _cols;
    this.startPos = new Position();
    this.targetPos = new Position();

  }

  // Function works by using a Position object or x and y separately
  getCell(row, col) {
    if((typeof row) === "object") {
      let pos = row;
      return this.cells[pos.x][pos.y];
    }
    else {
      return this.cells[row][col];
    }
  }

  // Makes sure that start and target cell are not overwritten
  setCellType(row, col, type) {

    if(type === cellTypes.START) {
      this.startPos = new Position(row,col);
    }
    
    if(type === cellTypes.TARGET) {
      this.targetPos = new Position(row,col);
    }

    let c = this.getCell(row, col);
    return c.setType(type);
  }

  isValid() {
    return (this.startPos.exists() && this.targetPos.exists());
  }

  setRandomStart() {
    let row = floor(random(0, this.rows));
    let col = floor(random(0, this.cols));
    this.setCellType(row,col,cellTypes.START);
  }
  
  setRandomTarget() {
    let row = floor(random(0, this.rows));
    let col = floor(random(0, this.cols));
    this.setCellType(row,col,cellTypes.TARGET);
  }

  setRandomObstacles(perc) {
    let obstaclesAmount = this.cols*this.rows*perc;

    for (var i = 0; i < obstaclesAmount; i++) {
  
      let row = floor(random(0, this.rows));
      let col = floor(random(0, this.cols));
  
      var changed = grid.setCellType(row, col, cellTypes.OBSTACLE);
      
      if (!changed) i--;
    }

  }

  init() {
    for (var i = 0; i < this.rows; i++) {
      this.cells[i] = [];
      for (var j = 0; j < this.cols; j++) {
        let c = new Cell(i, j);
        this.cells[i][j] = c;
      }
    }
  }
  
  draw() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.cells[i][j].draw();
      }
    }
  }
  
  updateUnseenCellsColor() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var cell = this.getCell(i,j);
        if(cell.type === cellTypes.UNSEEN) {
          cell.setType(cellTypes.UNVISITED);
        }
      }
    }
  }
  
  reset() {
    this.init();
    this.draw();
    this.setRandomObstacles(OBSTACLES_PERC);
    this.setRandomStart();
    this.setRandomTarget();
  }

}
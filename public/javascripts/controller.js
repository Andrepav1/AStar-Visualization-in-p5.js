var insertMode;

function mousePressed() {

  if(mouseX > TABLE_SIZE || mouseX < 0 || mouseY > TABLE_SIZE || mouseY < 0) return;
  
  var pos = getCellFromMousePosition();
  
  insertMode = grid.getCell(pos.x,pos.y).type !== cellTypes.OBSTACLE;

  if(!grid.startPos.equals(pos) && !grid.targetPos.equals(pos)) {
    grid.setCellType(pos.x,pos.y, insertMode ? cellTypes.OBSTACLE : cellTypes.UNSEEN);
  }

}

function mouseDragged() {

  if(mouseX > TABLE_SIZE || mouseX < 0 || mouseY > TABLE_SIZE || mouseY < 0) return;

  var pos = getCellFromMousePosition();
  
  if(!grid.startPos.equals(pos) && !grid.targetPos.equals(pos)) {
    grid.setCellType(pos.x,pos.y, insertMode ? cellTypes.OBSTACLE : cellTypes.UNSEEN);
  }

}

function getCellFromMousePosition() {
  mouseI = floor(mouseX * COLS / TABLE_SIZE);
  mouseJ = floor(mouseY * ROWS / TABLE_SIZE);

  if (mouseI < 0) mouseI = 0;
  if (mouseJ < 0) mouseJ = 0;
  if (mouseI > COLS - 1) mouseI = COLS - 1;
  if (mouseJ > ROWS - 1) mouseJ = ROWS - 1;
  
  return new Position(mouseI, mouseJ);
}

function doubleClicked() {

  var pos = getCellFromMousePosition();

  if(grid.startPos.equals(pos)) {
    grid.startPos = new Position();
    grid.setCellType(pos.x, pos.y, cellTypes.UNSEEN);
    return;
  }
  
  if(grid.targetPos.equals(pos)) {
    grid.targetPos = new Position();
    grid.setCellType(pos.x, pos.y, cellTypes.UNSEEN);
    return;
  }

  if(!grid.startPos.exists()) {
    grid.setCellType(pos.x, pos.y, cellTypes.START);
  }
  else if(!grid.targetPos.exists()) {
    grid.setCellType(pos.x, pos.y, cellTypes.TARGET);
  }

}


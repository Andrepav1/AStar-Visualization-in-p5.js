const COLS = 60;
const ROWS = 60;
const TABLE_SIZE = 800;
const MENU_WIDTH = 120;
const OBSTACLES_PERC = .3;
const STEP_VELOCITY = 10;

const UNSEEN_COLOR = "#FFFFFF";
const SEEN_COLOR = "#ceebed";
const UNVISITED_COLOR = "#ff9238";
const VISITED_COLOR = "#728bb3";
const OBSTACLE_COLOR = "#000000";
const PATH_COLOR = "#fffa6e";
const FINAL_PATH_COLOR = "#fc1c03";
const TARGET_COLOR = "#ff0000";
const START_COLOR = "#00ff00";

const cellTypes = {
  UNSEEN: 0,
  SEEN: 1,
  UNVISITED: 2,
  VISITED: 3,
  OBSTACLE: 4,
  PATH: 5,
  TARGET: 6,
  START: 7,
}
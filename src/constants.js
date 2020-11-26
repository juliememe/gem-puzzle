export const MOVE_DIRECTIONS = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

export const DIRECTION_SHIFT = {
  [MOVE_DIRECTIONS.UP]: [1, 0],
  [MOVE_DIRECTIONS.RIGHT]: [0, -1],
  [MOVE_DIRECTIONS.DOWN]: [-1, 0],
  [MOVE_DIRECTIONS.LEFT]: [0, 1],
};

export const EMPTY_CELL_VALUE = null;

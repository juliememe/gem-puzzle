import { EMPTY_CELL_VALUE } from "./constants";
import { TYPE } from "./events/CellMoveAttemptEvent";
import { CellMovedEvent } from "./events/CellMovedEvent";
import { PuzzleSolvedEvent } from "./events/PuzzleSolvedEvent";
import { TYPE as GameStartEventType } from "./events/GameStartEvent";
import { PuzzleGeneratedEvent } from "./events/PuzzleGeneratedEvent";

export class BoardState {
  constructor(eventSource) {
    this.board = null;
    this.emptyCellPosition = null;
    this.boardLenght = null;
    this.eventSource = eventSource;
    this.onCellMoveAttempt = this.onCellMoveAttempt.bind(this);
    this.generateBoard = this.generateBoard.bind(this);
  }

  initialize() {
    this.eventSource.addEventListener(TYPE, this.onCellMoveAttempt);
    this.eventSource.addEventListener(GameStartEventType, this.generateBoard);
  }

  dispose() {
    this.eventSource.removeEventListener(TYPE, this.onCellMoveAttempt);
    this.eventSource.removeEventListener(GameStartEventType, this.generateBoard)
  }

  generateBoard({ detail: { puzzleSize }}) {
    this.boardLenght = puzzleSize;
    const length = this.boardLenght;
    const numbers = Array.from(
      { length: length * length },
      (_, index) => index
    );
    this.board = Array.from({ length }, () => Array.from({ length }));
    this.board.forEach((row, rowIndex) =>
      row.forEach((_, columnIndex) => {
        const numberIndex = Math.floor(
          Math.random() * Math.floor(numbers.length - 1)
        );
        const number = numbers.splice(numberIndex, 1)[0];

        const cellValue = number || EMPTY_CELL_VALUE;

        row[columnIndex] = cellValue;
        if (cellValue === EMPTY_CELL_VALUE) {
          this.emptyCellPosition = [rowIndex, columnIndex];
        }
      })
    );

    this.eventSource.emit(new PuzzleGeneratedEvent(this.board));
  }

  onCellMoveAttempt({ detail: { position: cellPosition } }) {
    const [row, column] = cellPosition;
    const [emptyCellRow, emptyCellColumn] = this.emptyCellPosition;
    const rowShift = emptyCellRow - row;
    const columnShift = emptyCellColumn - column;
    const cellDistance = Math.abs(rowShift) + Math.abs(columnShift);
    if (cellDistance !== 1) {
      return;
    }
    this.board[emptyCellRow][emptyCellColumn] = this.board[row][column];
    this.board[row][column] = EMPTY_CELL_VALUE;
    this.emptyCellPosition = [row, column];

    this.eventSource.emit(
      new CellMovedEvent(cellPosition, [rowShift, columnShift])
    );

    if (this.isSolved()) {
      this.eventSource.emit(new PuzzleSolvedEvent());
    }
  }

  isSolved() {
    const cornerOffset = this.boardLenght - 1;
    const isEmptyCellPlacedInBottomRightCorner =
      this.board[cornerOffset][cornerOffset] === EMPTY_CELL_VALUE;
    if (!isEmptyCellPlacedInBottomRightCorner) {
      return false;
    }

    this.board[cornerOffset][cornerOffset] =
      this.boardLenght * this.boardLenght;
    const isSolved = this.board.every((row, rowIndex) =>
      row.every(
        (columnValue, columnIndex) =>
          columnValue === rowIndex * this.boardLenght + columnIndex + 1
      )
    );

    this.board[cornerOffset][cornerOffset] = EMPTY_CELL_VALUE;

    return isSolved;
  }
}

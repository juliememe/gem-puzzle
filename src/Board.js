import { TYPE } from "./events/CellMovedEvent";
import { CellMoveAttemptEvent } from "./events/CellMoveAttemptEvent";
import { TYPE as PuzzleGeneratedEventType } from "./events/PuzzleGeneratedEvent";

import "./game.css";

const numberToPixels = (number) => `${number}px`;

const preventDefault = (e) => e.preventDefault();

const DATA_TRANSFER_FORMAT = "text/plain";

export class Board {
  constructor(rootElement, eventSource) {
    this.rootElement = rootElement;
    this.boardElement = null;
    this.cellSize = 30;
    this.ROW_ATTRIBUTE = "row";
    this.COLUMN_ATTRIBUTE = "column";
    this.eventSource = eventSource;
    this.onBoardClick = this.onBoardClick.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onCellMoved = this.onCellMoved.bind(this);
    this.applyBoardState = this.applyBoardState.bind(this);
  }

  initialize() {
    this.boardElement = document.createElement("div");
    this.boardElement.classList.add("board");
    this.boardElement.addEventListener("click", this.onBoardClick);
    this.boardElement.addEventListener("dragstart", this.onDragStart);
    this.boardElement.addEventListener("drop", this.onDrop);
    this.rootElement.appendChild(this.boardElement);
    this.eventSource.addEventListener(TYPE, this.onCellMoved);
    this.eventSource.addEventListener(PuzzleGeneratedEventType, this.applyBoardState);
  }

  applyBoardState({ detail: { puzzle: boardState }}) {
    this.boardElement.innerHTML = "";
    const boardSize = numberToPixels(this.cellSize * boardState.length);
    this.boardElement.style.width = boardSize;
    this.boardElement.style.height = boardSize;

    boardState.forEach((row, rowIndex) =>
      row.forEach((columnValue, columnIndex) => {
        const cellElement = document.createElement(
          columnValue ? "button" : "div"
        );
        cellElement.setAttribute("draggable", columnValue ? true : false);
        cellElement.classList.add("cell");
        cellElement.innerText = columnValue || "";

        if (!columnValue) {
          cellElement.addEventListener("dragover", preventDefault);
          cellElement.addEventListener("dragenter", preventDefault);
          cellElement.classList.add("emptyCell");
        }

        this.shiftCell(cellElement, [rowIndex, columnIndex]);

        this.boardElement.appendChild(cellElement);
      })
    );
  }

  shiftCell(cellElement, position) {
    const [row, column] = position;

    cellElement.setAttribute(this.createDataAttribute(this.ROW_ATTRIBUTE), row);
    cellElement.setAttribute(
      this.createDataAttribute(this.COLUMN_ATTRIBUTE),
      column
    );
    cellElement.style.left = numberToPixels(column * this.cellSize);
    cellElement.style.top = numberToPixels(row * this.cellSize);
  }

  onCellMoved({ detail: { position, vector } }) {
    this.moveCell(position, vector);
  }

  moveCell(position, vector) {
    const [row, column] = position;
    const cellElement = this.findCellByPosition(position);
    const emptyCellPosition = [row + vector[0], column + vector[1]];
    const emptyCellElement = this.findCellByPosition(emptyCellPosition);
    this.shiftCell(cellElement, emptyCellPosition);
    this.shiftCell(emptyCellElement, position);
  }

  findCellByPosition(position) {
    const [row, column] = position;
    return this.boardElement.querySelector(
      `[${this.createDataAttribute(
        this.ROW_ATTRIBUTE
      )}='${row}'][${this.createDataAttribute(
        this.COLUMN_ATTRIBUTE
      )}='${column}']`
    );
  }

  createDataAttribute(attributeName) {
    return `data-${attributeName}`;
  }

  onBoardClick(clickEvent) {
    const { target } = clickEvent;
    const position = this.getCellPosition(target);
    if (!position) {
      return;
    }

    this.fireMoveAttemptEvent(position);
  }

  fireMoveAttemptEvent(position) {
    this.eventSource.emit(new CellMoveAttemptEvent(position));
  }

  onDragStart(dragStartEvent) {
    const { target } = dragStartEvent;
    const position = this.getCellPosition(target);

    if (!position) {
      dragStartEvent.preventDefault();
      return;
    }

    dragStartEvent.dataTransfer.setData(
      DATA_TRANSFER_FORMAT,
      JSON.stringify(position)
    );
  }

  onDrop(dropEvent) {
    const position = JSON.parse(
      dropEvent.dataTransfer.getData(DATA_TRANSFER_FORMAT)
    );

    if (!Array.isArray(position)) {
      return;
    }

    this.fireMoveAttemptEvent(position);
  }

  getCellPosition(cellElement) {
    const row = Number(cellElement.dataset[this.ROW_ATTRIBUTE]);
    const column = Number(cellElement.dataset[this.COLUMN_ATTRIBUTE]);
    if (!Number.isInteger(row) || !Number.isInteger(column)) {
      return null;
    }

    return [row, column];
  }
}

import { TYPE } from "./events/CellMovedEvent";
import { TYPE as PuzzleSolvedEventType } from "./events/PuzzleSolvedEvent";
import { TYPE as PuzzleGeneratedEventType } from "./events/PuzzleGeneratedEvent";
import { PuzzleResultEvent } from "./events/PuzzleResultEvent";

export class Statistics {
  constructor(rootElement, eventSource) {
    this.rootElement = rootElement;
    this.statisticsElement = null;
    this.turns = null;
    this.startTime = null;
    this.eventSource = eventSource;
    this.turnsCounterElement = null;
    this.timerElement = null;
    this.onCellMove = this.onCellMove.bind(this);
    this.updateTimerView = this.updateTimerView.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.resetCurrentScore = this.resetCurrentScore.bind(this);
    this.intervalDescriptor = null;
    this.timerUpdateFrequency = 1000;
  }

  initialize() {
    this.statisticsElement = document.createElement("div");
    this.turnsCounterElement = document.createElement("div");
    this.statisticsElement.appendChild(this.turnsCounterElement);

    this.timerElement = document.createElement("div");
    this.statisticsElement.appendChild(this.timerElement);

    this.rootElement.appendChild(this.statisticsElement);

    this.eventSource.addEventListener(TYPE, this.onCellMove);
    this.eventSource.addEventListener(
      PuzzleSolvedEventType,
      this.showNotification
    );
    this.eventSource.addEventListener(
      PuzzleGeneratedEventType,
      this.resetCurrentScore
    );
  }

  resetCurrentScore() {
    this.turns = 0;
    this.startTime = new Date();
    this.clearTimerInterval();
    this.intervalDescriptor = setInterval(
      this.updateTimerView,
      this.timerUpdateFrequency
    );
    this.updateTurnsView();
    this.updateTimerView();
  }

  dispose() {
    this.clearTimerInterval();
    this.eventSource.removeEventListener(TYPE, this.onCellMove);
    this.eventSource.removeEventListener(
      PuzzleSolvedEventType,
      this.showNotification
    );
  }

  clearTimerInterval() {
    clearInterval(this.intervalDescriptor);
  }

  onCellMove() {
    this.turns += 1;
    this.updateTurnsView();
  }

  updateTurnsView() {
    this.turnsCounterElement.textContent = this.turns;
  }

  updateTimerView() {
    this.timerElement.textContent = this.getElapsedTime()
      .toISOString()
      .substring(11, 19);
  }

  getElapsedTime() {
    return new Date(new Date().getTime() - this.startTime.getTime());
  }

  showNotification() {
    this.clearTimerInterval();
    this.eventSource.emit(
      new PuzzleResultEvent(this.turns, this.getElapsedTime())
    );
    alert(
      `Puzzle solved in ${this.timerElement.textContent} and ${this.turns} turns`
    );
  }
}

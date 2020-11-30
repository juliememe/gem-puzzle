import { Field } from "./Field";

export class PlayField extends Field {
  constructor(items, rootElement, game) {
    super(items, rootElement, game);
    this.itemsToGuess = [...items];
    this.itemsToGuess.reverse();
    this.statistics = new Map();
  }

  init() {
    super.init();
    this.alertWordToGuess();
  }

  createCell(name) {
    const cell = super.createCell(name);
    cell.style.backgroundColor = "blue";
    cell.style.color = "white";

    return cell;
  }

  alertWordToGuess() {
    alert(this.getCurrentWordToGuess());
  }

  getCurrentWordToGuess() {
    return this.itemsToGuess[0].word;
  }

  updateStatisticsForWord(updater) {

  }

  onCellSelect(cellId) {
    const wordStatistics = this.statistics.get(cellId) || { hits: 0, misses: 0 };

    if (cellId !== this.getCurrentWordToGuess()) {
      alert("nope");
      this.statistics.set(cellId, {
        ...wordStatistics,
        misses: wordStatistics.misses + 1,
      });
      return;
    }

    this.statistics.set(cellId, {
      ...wordStatistics,
      hits: wordStatistics.hits + 1,
    });

    const cellElement = this.cellsContainer.querySelector(
      `[data-${this.cellIdDataAttributeName}='${cellId}']`
    );
    cellElement.style.backgroundColor = "yellow";
    this.itemsToGuess.shift();

    if (this.itemsToGuess.length) {
      this.alertWordToGuess();
    } else {
      this.game.endGame(this.statistics);
    }
  }
}

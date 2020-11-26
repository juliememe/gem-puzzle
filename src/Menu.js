import { GameStartEvent } from "./events/GameStartEvent";

export class Menu {
  constructor(rootElement, eventSource, sizes, scoreStorage) {
    this.eventSource = eventSource;
    this.rootElement = rootElement;
    this.form = null;
    this.scoreTable = null;
    this.sizes = sizes;
    this.menuElement = null;
    this.scoreStorage = scoreStorage;

    this.onStartClick = this.onStartClick.bind(this);
    this.onShowScoresClick = this.onShowScoresClick.bind(this);

    this.selectInputName = "size";
  }

  initialize() {
    this.form = document.createElement("form");

    const sizeSelectionInput = document.createElement("select");
    sizeSelectionInput.setAttribute("name", this.selectInputName);
    this.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.setAttribute("value", size);
      option.innerText = size;
      sizeSelectionInput.appendChild(option);
    });
    this.form.appendChild(sizeSelectionInput);

    const startButton = document.createElement("button");
    startButton.innerText = "Start";
    startButton.setAttribute("type", "submit");
    this.form.appendChild(startButton);
    this.form.addEventListener("submit", this.onStartClick);

    const showScoresButton = document.createElement("button");
    showScoresButton.innerText = "scores";
    showScoresButton.addEventListener("click", this.onShowScoresClick);

    this.menuElement = document.createElement("div");
    this.menuElement.appendChild(this.form);
    this.menuElement.appendChild(showScoresButton);
    this.rootElement.appendChild(this.menuElement);
  }

  onStartClick(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const size = formData.get(this.selectInputName);

    this.eventSource.emit(new GameStartEvent(Number(size)));
  }

  onShowScoresClick() {
      if (!this.scoreTable) {
          this.createScoreTable();
          return;
      }

      this.menuElement.removeChild(this.scoreTable);
      this.scoreTable = null;
  }

  createScoreTable() {
    const table = document.createElement("table");
    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);
    const headerRow = document.createElement("tr");
    tableHead.appendChild(headerRow);
    const turnsHeader = document.createElement("th");
    turnsHeader.innerText = "turns";
    const timeHeader = document.createElement("th");
    timeHeader.innerText = "time"
    headerRow.appendChild(turnsHeader);
    headerRow.appendChild(timeHeader);

    const tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    const scores = this.scoreStorage.getScores();
    scores.forEach(({ turns, time }) => {
        const row = document.createElement("tr");
        const turnsCell = document.createElement("td");
        turnsCell.innerText = turns;
        row.appendChild(turnsCell);

        const timeCell = document.createElement("td");
        timeCell.innerText = time;
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    });

    this.scoreTable = table;
    this.menuElement.appendChild(this.scoreTable);
  }
}

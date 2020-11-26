import { BoardState } from "./BoardState";
import { Board } from "./Board";
import { Statistics } from "./Statistics";
import { Menu } from "./Menu";

import { ScoreProcessor } from "./ScoreProcessor";

import { EventSource } from "./EventSource";
import { ScoreStorage } from "./ScoreStorage";

const DIFFICULTIES = Array.from({ length: 6 }, (_, index) => index + 3);

function initGame(rootElement) {
  const eventSource = new EventSource();

  const menuElement = document.createElement("div");
  const statisticsElement = document.createElement("div");
  const boardElement = document.createElement("div");

  rootElement.appendChild(menuElement);
  rootElement.appendChild(statisticsElement);
  rootElement.appendChild(boardElement);

  const scoreStorage = new ScoreStorage("scores");

  new Menu(menuElement, eventSource, DIFFICULTIES, scoreStorage).initialize();

  new Board(boardElement, eventSource).initialize();
  new BoardState(eventSource).initialize();

  new Statistics(statisticsElement, eventSource).initialize();

  new ScoreProcessor(eventSource, scoreStorage, 10);
}

Array.from({ length: 20 }).forEach((_, index) => {
  const firstGameElement = document.createElement("div");
  firstGameElement.style.position = "absolute";
  firstGameElement.style.top = `${300 * index}px`;
  firstGameElement.style.left = `${300 * index}px`;
  document.body.appendChild(firstGameElement);

  initGame(firstGameElement);
});

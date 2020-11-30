import { BoardState } from "./BoardState";
import { Board } from "./Board";
import { Statistics } from "./Statistics";
import { Menu } from "./Menu";

import { ScoreProcessor } from "./ScoreProcessor";

import { EventSource } from "../EventSource";
import { ScoreStorage } from "./ScoreStorage"

export function initGame(rootElement, difficulties) {
  const eventSource = new EventSource();

  const menuElement = document.createElement("div");
  const statisticsElement = document.createElement("div");
  const boardElement = document.createElement("div");

  rootElement.appendChild(menuElement);
  rootElement.appendChild(statisticsElement);
  rootElement.appendChild(boardElement);

  const scoreStorage = new ScoreStorage("scores");

  new Menu(menuElement, eventSource, difficulties, scoreStorage).initialize();

  new Board(boardElement, eventSource).initialize();
  new BoardState(eventSource).initialize();

  new Statistics(statisticsElement, eventSource).initialize();

  new ScoreProcessor(eventSource, scoreStorage, 10);
}
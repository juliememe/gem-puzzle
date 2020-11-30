import { TrainingField } from "./TrainingField";
import { PlayField } from "./PlayField";
import { MainMenuField } from "./MainMenuField";

const GAME_MODES = {
  PLAY: "PLAY",
  TRAIN: "TRAIN",
};

const MAIN_CATEGORY = "MAIN_CATEGORY";

export class Game {
  constructor(categories, rootElement) {
    this.categories = {
      ...categories,
      [MAIN_CATEGORY]: Object.keys(categories).map((key) => ({ word: key })),
    };
    this.rootElement = rootElement;
    this.headerElement = null;
    this.contentElement = null;
    this.gameMode = GAME_MODES.TRAIN;
    this.currentCategory = MAIN_CATEGORY;
    this.gameModeSwitch = null;
    this.onGameModeChange = this.onGameModeChange.bind(this);
  }

  init() {
    this.headerElement = document.createElement("header");
    this.renderHeader();
    this.contentElement = document.createElement("main");
    this.renderContent();
    this.rootElement.appendChild(this.headerElement);
    this.rootElement.appendChild(this.contentElement);
  }

  renderHeader() {
    this.gameModeSwitch = document.createElement("input");
    this.gameModeSwitch.setAttribute("type", "checkbox");
    this.gameModeSwitch.addEventListener("change", this.onGameModeChange);
    this.headerElement.appendChild(this.gameModeSwitch);
  }

  renderContent() {
    this.contentElement.innerHTML = "";

    const FieldClass =
      this.currentCategory === MAIN_CATEGORY
        ? MainMenuField
        : this.gameMode === GAME_MODES.TRAIN
        ? TrainingField
        : PlayField;
    const items = this.categories[this.currentCategory];

    const field = new FieldClass(items, this.contentElement, this);
    field.init();
  }

  onGameModeChange({ target }) {
    this.gameMode = target.checked ? GAME_MODES.PLAY : GAME_MODES.TRAIN;
    this.renderContent();
  }

  changeCurrentCategory(categoryId) {
    this.currentCategory = categoryId;
    this.renderContent();
  }

  endGame(result) {
      alert("game ended");
      this.currentCategory = MAIN_CATEGORY;
      this.renderContent();
  }
}

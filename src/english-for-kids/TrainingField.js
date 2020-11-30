import { Field } from "./Field";

import "./training-field.css";

export class TrainingField extends Field {
  constructor(items, rootElement, game) {
    super(items, rootElement, game);
  }

  createCell(name) {
    const cell = super.createCell(name);
    cell.style.backgroundColor = "red";

    const cardTurnButton = document.createElement("button");
    cardTurnButton.innerText = "turn";
    cardTurnButton.addEventListener("click", () => {
        cell.classList.add("rotate");
    });
    cell.addEventListener("mouseleave", () => cell.classList.remove("rotate"));

    cell.appendChild(cardTurnButton);

    return cell;
  }

  onCellSelect(cellId) {
    console.log(cellId);

    const item = this.items.find(({ word }) => word === cellId);

    if (item) {
      const { audioSrc } = item;
      var audio = new Audio(audioSrc);
      audio.play();
    }
  }
}

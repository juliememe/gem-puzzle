import { Field } from "./Field";

export class MainMenuField extends Field {
  createCell(name) {
      const cell = super.createCell(name);
      cell.style.backgroundColor = "green";

      return cell;
  }

  onCellSelect(cellId) {
      this.game.changeCurrentCategory(cellId);
  }
}

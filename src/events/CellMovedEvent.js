export const TYPE = "CellMovedEvent";

export class CellMovedEvent extends CustomEvent {
  constructor(position, vector) {
    super(TYPE, { detail: { position, vector } });
  }
}

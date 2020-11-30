export const TYPE = "CellMoveAttemptEvent";

export class CellMoveAttemptEvent extends CustomEvent {
  constructor(position) {
    super(TYPE, { detail: { position } });
  }
}

export const TYPE = "PuzzleResultEvent";

export class PuzzleResultEvent extends CustomEvent {
  constructor(turns, time) {
    super(TYPE, { detail: { turns, time } });
  }
}

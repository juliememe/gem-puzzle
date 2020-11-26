export const TYPE = "GameStartEvent";

export class GameStartEvent extends CustomEvent {
  constructor(puzzleSize) {
    super(TYPE, { detail: { puzzleSize } });
  }
}

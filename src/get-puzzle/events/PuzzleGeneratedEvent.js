export const TYPE = "PuzzleGeneratedEvent";

export class PuzzleGeneratedEvent extends CustomEvent {
  constructor(puzzle) {
    super(TYPE, { detail: { puzzle } });
  }
}

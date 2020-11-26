export const TYPE = "PuzzleSolvedEvent";

export class PuzzleSolvedEvent extends CustomEvent {
    constructor() {
        super(TYPE)
    }
}
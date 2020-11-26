import { TYPE } from "./events/PuzzleResultEvent";

export class ScoreProcessor {
  constructor(eventSource, scoreStorage, maxResults) {
    this.eventSource = eventSource;
    this.scoreStorage = scoreStorage;
    this.maxResults = maxResults;
    this.processScore = this.processScore.bind(this);
  }

  initialize() {
      this.eventSource.addEventListener(TYPE, this.processScore);
  }

  processScore({ detail }) {
      const scores = this.scoreStorage.getScores();

      scores.push(detail);
      scores.sort((left, right) => left.turns - right.turns);

      this.scoreStorage.setScores(scores.slice(0, this.maxResults));
  }
}

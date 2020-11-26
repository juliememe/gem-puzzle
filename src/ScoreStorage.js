export class ScoreStorage {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  getScores() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  setScores(scores) {
    localStorage.setItem(this.storageKey, JSON.stringify(scores));
  }
}

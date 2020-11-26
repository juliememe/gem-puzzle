export class EventSource {
  constructor() {
    this.eventListeners = new Map();
  }

  addEventListener(eventType, listener) {
    const listeners = this.eventListeners.get(eventType);

    if (!listeners) {
      this.eventListeners.set(eventType, [listener]);
      return;
    }

    listeners.push(listener);
  }

  removeEventListener(eventType, listener) {
    const listeners = this.eventListeners.get(eventType);

    if (!listeners) {
      return;
    }

    const listenerIndex = listeners.findIndex(func => func === listener);

    listeners.splice(listenerIndex, 1);
  }

  emit(event) {
    const listeners = this.eventListeners.get(event.type);

    if (!listeners) {
      return;
    }

    listeners.forEach((listener) => listener(event));
  }
}

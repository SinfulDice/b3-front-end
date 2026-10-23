export class EventBus<Events extends object> {
    #listeners: {
        [K in keyof Events]?: Set<(payload: Events[K]) => void>;
    } = {};
    on<K extends keyof Events>(name: K, listener: (payload: Events[K]) => void): () => void {
        const listeners = this.#listeners[name] ?? new Set<(payload: Events[K]) => void>();
        listeners.add(listener);
        this.#listeners[name] = listeners;
        return () => { listeners.delete(listener); };
    }
    emit<K extends keyof Events>(name: K, payload: Events[K]): void {
        for (const listener of [...(this.#listeners[name] ?? [])])
            listener(payload);
    }
}

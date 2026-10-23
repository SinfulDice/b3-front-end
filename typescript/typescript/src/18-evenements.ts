export class EventBus<Events extends object> {
    #listeners: {
        [K in keyof Events]?: Set<(payload: Events[K]) => void>;
    } = {};
    on<K extends keyof Events>(name: K, listener: (payload: Events[K]) => void): () => void {
        // TODO : implémenter selon l’énoncé.
        throw new Error("À implémenter");
    }
    emit<K extends keyof Events>(name: K, payload: Events[K]): void {
        // TODO : implémenter selon l’énoncé.
        throw new Error("À implémenter");
    }
}

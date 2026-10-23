// Events décrit les événements possibles : { borrowed: { id: string }; count: number }.
// Le nom (une clé) décide du type du payload : emit('count', '1') ne compile pas.
export class EventBus<Events extends object> {
    // Mapped type : pour chaque nom d'événement K, un Set de fonctions qui reçoivent Events[K].
    #listeners: {
        [K in keyof Events]?: Set<(payload: Events[K]) => void>;
    } = {};
    on<K extends keyof Events>(name: K, listener: (payload: Events[K]) => void): () => void {
        const listeners = this.#listeners[name] ?? new Set<(payload: Events[K]) => void>();
        this.#listeners[name] = listeners;
        // Un Set ignore une fonction déjà présente : elle ne sera appelée qu'une fois par emit.
        listeners.add(listener);
        // Une fermeture (closure) : la fonction renvoyée se souvient de listeners et de listener.
        // delete ne fait rien la 2e fois : la désinscription est idempotente.
        return () => {
            listeners.delete(listener);
        };
    }
    emit<K extends keyof Events>(name: K, payload: Events[K]): void {
        const listeners = this.#listeners[name];
        if (!listeners)
            return;
        // [...listeners] = une COPIE : un écouteur qui en désinscrit un autre pendant l'emit
        // ne change pas la liste des appels déjà prévus. Un Set garde l'ordre d'inscription.
        for (const listener of [...listeners])
            listener(payload);
    }
}

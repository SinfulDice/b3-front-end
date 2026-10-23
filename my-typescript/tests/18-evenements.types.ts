import type { Equal, Expect, IsAny } from './type-helpers.js';
import { EventBus } from '../src/18-evenements.js';
const bus = new EventBus<{
    borrowed: {
        id: string;
    };
    count: number;
}>();
bus.on('borrowed', payload => { type Payload = Expect<Equal<typeof payload, {
    id: string;
}>>; });
// @ts-expect-error — nom inconnu
bus.emit('lost', 1);
// @ts-expect-error — payload lié à la clé
bus.emit('count', '1');
// @ts-expect-error — callback de mauvais type
bus.on('count', (value: string) => { });

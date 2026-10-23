import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EventBus } from '../src/18-evenements.js';
test('18 — noms, ordre, doublons et désinscription', () => {
    const bus = new EventBus<{
        borrowed: {
            id: string;
        };
        count: number;
    }>();
    const calls: string[] = [];
    const listener = ({ id }: {
        id: string;
    }) => { calls.push(id); };
    const off = bus.on('borrowed', listener);
    bus.on('borrowed', listener);
    bus.on('count', value => calls.push(String(value)));
    bus.emit('borrowed', { id: 'b1' });
    bus.emit('count', 2);
    off();
    off();
    bus.emit('borrowed', { id: 'b2' });
    assert.deepEqual(calls, ['b1', '2']);
});
test('18 — émission sur une copie des écouteurs', () => {
    const bus = new EventBus<{
        count: number;
    }>();
    const calls: string[] = [];
    let offSecond = () => { };
    bus.on('count', () => { calls.push('first'); offSecond(); });
    offSecond = bus.on('count', () => { calls.push('second'); });
    bus.emit('count', 1);
    bus.emit('count', 2);
    assert.deepEqual(calls, ['first', 'second', 'first']);
});

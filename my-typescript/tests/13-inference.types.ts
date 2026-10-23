import type { Equal, Expect, IsAny } from './type-helpers.js';
import { statuses, labels, choose } from '../src/13-inference.js';
import type { Status } from '../src/13-inference.js';
type Statuses = Expect<Equal<typeof statuses, readonly [
    'available',
    'borrowed'
]>>;
type StatusUnion = Expect<Equal<Status, 'available' | 'borrowed'>>;
type Label = Expect<Equal<typeof labels.available, 'Disponible'>>;
const choice = choose(['available', 'borrowed'], 'available');
type Choice = Expect<Equal<typeof choice, 'available' | 'borrowed'>>;
// @ts-expect-error — defaultValue ne doit pas élargir l’union
choose(['available', 'borrowed'], 'archived');
// @ts-expect-error — propriété inexistante
labels.archived;

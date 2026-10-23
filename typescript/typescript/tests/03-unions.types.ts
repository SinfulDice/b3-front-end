import type { Equal, Expect, IsAny } from './type-helpers.js';
import { statusLabel, normalizeTitle } from '../src/03-unions.js';
import type { Status } from '../src/03-unions.js';
type Statuses = Expect<Equal<Status, 'available' | 'borrowed' | 'reserved'>>;
const one = normalizeTitle(' A ');
const many = normalizeTitle([' A ']);
type One = Expect<Equal<typeof one, string>>;
type Many = Expect<Equal<typeof many, string[]>>;
// @ts-expect-error — statut inconnu
statusLabel('lost');
// @ts-expect-error — nombre interdit
normalizeTitle(12);

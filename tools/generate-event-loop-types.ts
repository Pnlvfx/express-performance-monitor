import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

const types = readFileSync('./node_modules/event-loop-stats/src/eventLoopStats.d.ts', { encoding: 'utf8' });
const lastIndex = types.lastIndexOf('}');

mkdirSync(dirname(process.argv[2]), { recursive: true });
writeFileSync(process.argv[2], `${types.slice(0, lastIndex + 1)}\n`);

import m from './api.js';
import sum from './sum.js';

const data = m.api();
const a = m.handle(data, 'a');
const b = m.handle(data, 'b');
const c = sum(a, b);
console.log('ESM_c: ', c);
console.log('ESM_x: ', m.x);
m.x = 10;
console.log('ESM_x: ', m.x, m.getX());
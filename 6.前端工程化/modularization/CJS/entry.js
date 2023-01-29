// const { api, handle, x } = require('./api');
const m = require('./api');
const sum = require('./sum');

const data = m.api();
const a = m.handle(data, 'a');
const b = m.handle(data, 'b');
const c = sum(a, b);
console.log('CJS_c: ', c);
console.log('CJS_x: ', m.x);
m.x = 10;
console.log('CJS_x: ', m.x, m.getX());
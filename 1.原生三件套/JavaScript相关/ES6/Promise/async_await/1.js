const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

// 回调形式
// fs.readFile('./resource/1.txt', (err, data1) => {
//   if (err) {
//     throw err;
//   }
//   fs.readFile('./resource/2.txt', (err, data2) => {
//     if (err) {
//       throw err;
//     }
//     fs.readFile('./resource/3.txt', (err, data3) => {
//       if (err) {
//         throw err;
//       }
//       console.log(data1 + data2 + data3);
//     })
//   })
// })

// async/await形式
async function main () {
  try {
    let data1 = await mineReadFile('./resource/1.txt');
    let data2 = await mineReadFile('./resource/2.txt');
    let data3 = await mineReadFile('./resource/3.txt');
    console.log(data1 + data2 + data3);
  } catch (e) {
    console.log(e)
  }
}

main();

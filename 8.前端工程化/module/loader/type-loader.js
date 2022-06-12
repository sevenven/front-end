const REG = /<script>([\s\S]+)<\/script>/;

module.exports = function(source) {
  const __source = source.match(REG);
  return __source && __source[1] ? __source[1] : source;
}

// if (require.main === module) {
//   const source = `<script>
//   export default {
//     a: 1,
//     b: 2
//   }
// </script>`
// const match = source.match(REG)
// console.log(match[1])
// }
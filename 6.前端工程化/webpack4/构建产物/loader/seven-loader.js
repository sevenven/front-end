module.exports = function (source) {
  const __source = source.match(/<script>([\s\S]+?)<\/script>/)
  // console.log('== seven-loader running ==', __source);
  return __source && __source[1] ? __source[1] : source;
}

// 判断当前模块是否为主模块，如果为主模块，则运行一下代码
// 可以用来做loader的单元测试
if (require.main === module) {
  const source = `<script>
    export default {
      a: 1,
      b: 2
    }
  </script>`
  const __source = source.match(/<script>([\s\S]+?)<\/script>/)
  console.log(__source)
}
module.exports = function(source){
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace('webpack', '~webpack~')
    callback(null, result)
  }, 1000)
}
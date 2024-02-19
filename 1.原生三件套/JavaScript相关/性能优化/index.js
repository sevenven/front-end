
window.onload = function () {
  // console.log(window.performance)
  const perfEntries = window.performance.getEntries();
  console.log('perfEntries', JSON.stringify(perfEntries))
}

// const oberver = new PerformanceObserver((list, ob) => {
//   list.getEntries().forEach((item, index) => {
//     console.log(`item-${index + 1}: `, item)
//   })
// })
// oberver.observe({
//   entryTypes: ['navigation', 'resource', 'mark', 'measure', 'paint']
// })


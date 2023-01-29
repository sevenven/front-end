module.exports = function parseArgs() {
  let isAll = false; // -a
  let isList = false; // -l

  const args = process.argv.slice(2);

  if (args.indexOf('-a') >= 0) isAll = true;
  if (args.indexOf('-l') >= 0) isList = true;

  return {
    isAll,
    isList
  }
}
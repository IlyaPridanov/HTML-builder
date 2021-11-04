const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'mynotes.txt'));

stdout.write('Пришло время написать слово\n');
stdin.on('data', data => {
  const dataStringified = data.toString();
  if (dataStringified.slice(0, dataStringified.length-2) === 'exit') {
    process.exit();
  }
  output.write(dataStringified);
});
process.on('exit', () => stdout.write('До связи...'));
process.on('SIGINT', () => process.exit());

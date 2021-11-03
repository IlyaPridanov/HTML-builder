const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'mynotes.txt'));

// fs.writeFile(
//     path.join(__dirname, 'mynotes.txt'),
//     'Введите текст пожалуйста',
//     (err) => {
//         if (err) throw err;
//         console.log('Введите текст пожалуйста');
//     }
// );

// process.exit();
stdout.write('Пришло время написать слово\n');
stdin.on('data', data => {
  const dataStringified = data.toString();
  
  if (dataStringified == 'exit') {
    process.exit();
  }
  output.write(dataStringified);
});
process.on('exit', () => stdout.write('До связи...'));

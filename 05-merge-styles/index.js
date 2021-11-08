const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');
let str = '';

function writeFile (content) {
  fs.writeFile(
    path.join(__dirname, 'project-dist/bundle.css'),
    content,
    'utf8',
    (err) => {
      if (err) throw err;
    }
  );
}

function readFile (folder) {
  const stream = fs.createReadStream(path.join(__dirname, 'styles' , folder), 'utf-8');

  let data = '';

  stream.on('data', chunk => data += chunk);
  stream.on('end', () => {
    str = str + data;
    writeFile(str);
  });
  stream.on('error', error => console.log('Error', error.message));
}

const eachStyle = async function (folder) {
  try {
    const files = await readdir.readdir(folder,{withFileTypes: true});
    for (const file of files) {
      if (path.extname(file.name).slice(1) === 'css') {
        fs.stat(path.join(__dirname, 'styles', file.name), (err, stats) => {
          readFile(file.name);
        });
      }
    }
  } catch (error) {
    console.error('there was an error:', error.message);
  }
};
eachStyle(path.join(__dirname, 'styles'));

// readFile('style-1.css');
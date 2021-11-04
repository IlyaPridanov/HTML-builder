const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');

const xxx = async function (folder) {
  try {
    const files = await readdir.readdir(folder,{withFileTypes: true});
    for (const file of files) {
      if (!file.isDirectory()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          console.log(`${file.name} - ${path.extname(file.name).slice(1)} - ${Math.round(stats.size/1000)}kb`);
        });
      }
    }
  } catch (error) {
    console.error('there was an error:', error.message);
  }
};
xxx(path.join(__dirname, 'secret-folder'));

const fs = require('fs');
const path = require('path');
const copyFile = require('fs/promises');
const removeFile = require('fs/promises');
const readdir = require('fs/promises');

xxx(path.join(__dirname));

fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true} , err => {
  if (err) throw err;
});

async function superCopy (folder) {
  try {
    await copyFile.copyFile(
      path.join(__dirname, 'files', folder), 
      path.join(__dirname, 'files-copy', folder), 
    );
  } catch(error) {
    console.log(error);
  }
}

async function remove () {
  try {
    await removeFile.rmdir(
      path.join(__dirname, 'files-copy'),
      { recursive: true },
    );
    fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true} , err => {
      if (err) throw err;
    });
    xxx(path.join(__dirname, 'files'));
  } catch(error) {
    console.log(error);
  }
}


async function xxx (folder) {
  try {
    const files = await readdir.readdir(folder,{withFileTypes: true});
    for (const file of files) {
      if (folder === path.join(__dirname)) {
        if (file.name === 'files-copy') {
          remove();
        }
      } else if (folder === path.join(__dirname, 'files')) {
        if (!file.isDirectory()) {
          superCopy(file.name);
        }
      }
    }

  } catch (error) {
    console.error('there was an error:', error.message);
  }
}


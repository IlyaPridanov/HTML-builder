const fs = require('fs');
const path = require('path');
const copyFile = require('fs/promises');
const readdir = require('fs/promises');
const rimraf = require('rimraf');

rimraf(path.join(__dirname, 'files-copy'), function () { 
  fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true} , err => {
    if (err) throw err;
  });
  
  const superCopy = async function (folder) {
    try {
      await copyFile.copyFile(
        path.join(__dirname, 'files', folder), 
        path.join(__dirname, 'files-copy', folder), 
      );
    } catch(error) {
      console.log(error);
    }
  };
  
  const xxx = async function (folder) {
    try {
      const files = await readdir.readdir(folder,{withFileTypes: true});
      for (const file of files) {
        if (!file.isDirectory()) {
          superCopy(file.name);
        }
      }
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  };
  xxx(path.join(__dirname, 'files'));
});




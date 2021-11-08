const fs = require('fs');
const path = require('path');
const copyFile = require('fs/promises');
// const removeFile = require('fs/promises');
const readdir = require('fs/promises');

function writeFile (fileName,content) {
  fs.writeFile(
    path.join(__dirname, 'project-dist', fileName),
    content,
    'utf8',
    (err) => {
      if (err) throw err;
    }
  );
}

function bundleCss () {
  let str = '';

  function readFile (folder) {
    const stream = fs.createReadStream(path.join(__dirname, 'styles' , folder), 'utf-8');
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
      str = str + data;
      writeFile('style.css',str);
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
}

function copyDir (start,end) {
  xxx(path.join(__dirname, start));
  
  async function superCopy (folder) {
    try {
      await copyFile.copyFile(
        path.join(__dirname, start, folder), 
        path.join(__dirname, end, folder), 
      );
    } catch(error) {
      console.log(error);
    }
  }

  async function xxx (folder) {
    try {
      const files = await readdir.readdir(folder,{withFileTypes: true});
      for (const file of files) {
        superCopy(file.name);
      }
  
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  }
}

function allCopyDir () {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),{recursive: true} , err => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'),{recursive: true} , err => {
      if (err) throw err;
      copyDir('assets/fonts','project-dist/assets/fonts');
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'),{recursive: true} , err => {
      if (err) throw err;
      copyDir('assets/img','project-dist/assets/img');
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'),{recursive: true} , err => {
      if (err) throw err;
      copyDir('assets/svg','project-dist/assets/svg');
    });
  });
}

function superHtml () {
  let arrComp = [];
  function readComponent (folderComponents) {
    let str='';
    const stream = fs.createReadStream(path.join(__dirname, 'components' , folderComponents), 'utf-8');
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
      str = str + data;
      arrComp.push(str);
      readHtmlFile(arrComp[0],arrComp[1],arrComp[2],arrComp[3]);
    });
    stream.on('error', error => console.log('Error', error.message));
  }
  function readHtmlFile (headerStr,articlesStr,footerStr,about) {
    let str='';
    const stream = fs.createReadStream(path.join(__dirname, 'template.html' ), 'utf-8');
    let data = '';
    stream.on('data', chunk => {
      data += chunk;
      data = data
        .replace('{{header}}', headerStr)
        .replace('{{articles}}', articlesStr)
        .replace('{{footer}}', footerStr);
      if (about) {
        data = data.replace('{{about}}', about);
      }
    });
    stream.on('end', () => {
      str = str + data;
      writeFile('index.html',str);
    });
    stream.on('error', error => console.log('Error', error.message));
  }
  readComponent('header.html');
  readComponent('articles.html');
  readComponent('footer.html');
  fs.stat(path.join(__dirname, 'components' , 'about.html'), function(err, stats) {
    if (stats) {
      readComponent('about.html');
    }
  });
}

function featFolder () {
  fs.mkdir(path.join(__dirname, 'project-dist'),{recursive: true} , err => {
    if (err) throw err;
    bundleCss();
    allCopyDir();
    superHtml();
  });
}

featFolder();
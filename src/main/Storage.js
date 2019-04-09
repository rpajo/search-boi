
const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Storage {
  constructor (opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, 'search-boi-settings.json');

    this.data = parseDataFile(this.path, opts.defaults);
    console.log(opts, this.data);
  }

  get (key) {
    return this.data[key];
  }

  set (key, val) {
    console.log(this.data);

    this.data[key] = val;
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

function parseDataFile (filePath, defaults) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

// expose the class
export const storage = new Storage({
  defaults: {
    pages: [
      {
        url: 'https://www.google.com/search?q=%s',
        prefix: '',
        sufix: '',
        delimiter: '+'
      },
      {
        url: 'https://www.bing.com/search?q=%s',
        prefix: '',
        sufix: '',
        delimiter: '+'
      },
      {
        url: 'https://www.youtube.com/results?search_query=%s',
        prefix: '',
        sufix: '',
        delimiter: '+'
      }
    ]
  }
});

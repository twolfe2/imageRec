var Scraper = require('images-scraper'),
  google = new Scraper.Google();

const async = require('async');
const request = require('request');
const fs = require('fs');
var archiver = require('archiver');








var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    request(uri)
      .on('error', function(err) {
        console.log(err)
      })
      .pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


google.list({
    keyword: 'fighting stance',
    num: 2,
    detail: false
  })
  .then(function(res) {
    // console.log('first 10 results from google', res);
    return res;
  }).then(function(data) {
    // console.log(data);
    let cleanData = data.filter(image => {
      // console.log('image type:',image.type === 'img/jpg');
      return image.type !== 'image/gif';
    });
    // console.log(cleanData);
    let counter = 1;

    async.each(cleanData, function(image, cb) {
      let ext = image.type.split('/')[1];
      console.log('image.url:', image.url);
      download(image.url, `./assaultImages/image${counter++}.${ext}`, (err) => {
        console.log('err:', err);
        cb();
      })

    }, function(err) {
      if (err) {
        console.log('err:', err);
          } else {



        var output = fs.createWriteStream('./assaultImages.zip');
        var archive = archiver('zip');

        output.on('close', () => {
          console.log('file zipped');
        });
        archive.on('error', (err) => {
          throw err;
        });

        archive.pipe(output);

        archive.bulk([
          { expand: true, cwd: 'assaultImages', src: ['./*'] }
        ]).finalize()


  }

      
    })

  })
  .catch(function(err) {
    console.log('err', err);
  });

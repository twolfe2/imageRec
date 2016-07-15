var watson = require('watson-developer-cloud');
var fs = require('fs');

var alchemy_vision = watson.alchemy_vision({
  api_key: '58b8bfb40e14dfa3c329507e43ef2b60d323752d'
});

var params = {
  image: fs.createReadStream('scaryPhoto.jpg')
};

alchemy_vision.getImageKeywords(params, function (err, keywords) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(keywords, null, 2));
});
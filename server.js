var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use('/', express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.redirect('image-search.html');
});

app.all('/search-images', function(req, res) {
  if (!req.body) req.body = {};
  request.get({
    url: "https://api.gettyimages.com/v3/search/images",
    qs: {
      'phrase': req.body.query,
      'orientations': 'Horizontal',
    },
    headers: {
      'Api-Key': "jffpb83bhunc75qk2mjpsgrj",
    },
    json: true,
  }, function(err, response, body) {
    res.json(body)
  })
});

app.listen(process.env.PORT || 3333);

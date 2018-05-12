const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const request = require('request');

app.use(express.static(publicPath));

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log('Server is running!');
});

app.get('/api/podcast', (req, res) => {
  res.send('hello from api');
});

app.get('/api/feed', (req, res) => {
  // make request to get rss feed xml
  request(req.query.feedUrl, (err, response, data) => {
      if (err) {
      console.error('Network error', err);
      return;
      }
  
      res.send(data);
  });
})
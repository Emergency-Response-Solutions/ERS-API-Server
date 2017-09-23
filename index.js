var express = require('express');
var app = express();

app.set('port', process.env.PORT || 5000);

app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});

/*
 * index.js
 */

var express = require('express');
var app = express();
var request = require('request');
var firebase = require('firebase');
var cors = require('cors');

app.use(cors());
require('firebase/database');

const admin = require('firebase-admin');
const serviceAccount = require('./key/ers-dispatch-firebase-adminsdk-08k8q-3c9e3d13f9');
const firebaseCred = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ers-dispatch.firebaseio.com',
};
admin.initializeApp(firebaseCred);
const db = admin.database();

app.set('port', process.env.PORT || 5000);

app.get('/api/', (req, res) => {
  if (req.query.code) {
    var code = req.query.code;
    db.ref(`/ersDispatches/${code}`).once('value')
      .then(function(snapshot) {
        if (snapshot) {
          console.log(snapshot.val());
          res.send(JSON.stringify(snapshot.val()));
        }
      })
      .catch(function(err) {
        res.send(err);
      });
  } else {
    res.send('Please include key');
  }
});

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});

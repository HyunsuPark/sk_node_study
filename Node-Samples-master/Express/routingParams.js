var express = require('express');
var app = express();

app.listen(3000);

// 파라미터 1개
app.get('/user/:id', function (req, res) {
   var userId = req.params.id;
   res.send('User ID ' + userId);
});

// 파라미터 2개
app.get('/movies/:movieId/:actor', function (req, res) {
   var movieId = req.params.movieId;
   var actor = req.params.actor;

   res.send('Actor : ' + actor + ' -  Movie ID : ' + movieId);
});

// /user/:id 와 겹친다.
app.get('/user/sample', function(req, res) {
   res.send('GET /user/sample');
});


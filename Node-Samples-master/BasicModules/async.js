var async = require('async');

async.series([
      function(callback) {
         console.log('First Task Started');
         setTimeout(function() {
            console.log('First Task Done');
            callback(null, 'Done');
         }, 3000);         
      },
      function(callback) {
         console.log('Second Task Started');
         setTimeout(function() {
            console.log('Second Task Done');
            callback(null, 'Done');
         }, 1000);         
      }
   ],
   function(err, results) {
      console.log('All Task Done, series');
   }
);


function task1(callback) {
   console.log('First Task Started');
   setTimeout(function() {
      console.log('First Task Done');      
   }, 3000);         
}

function task2() {
   console.log('Second Task Started');
   setTimeout(function() {
      console.log('Second Task Done');
   }, 1000);         
}

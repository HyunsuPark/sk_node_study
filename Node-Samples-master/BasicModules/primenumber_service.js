/**
 * pm2를 이용해서 클러스터로 소수 출력 서비스
 * 
 * pm2로 실행시키기
 * $ pm2 start primenumber_pm2.js -i 0
 * 
 * 콘솔 로그 보기 
 * $ pm2 logs
 */
var http = require('http');
var cluster = require('cluster');

var num = 10000;
   
http.createServer(function (req, res) {
   res.writeHead(200);
   var id = 'Master';
   if ( cluster.isWorker ) {
      id = cluster.worker.id;
      console.log('Handling Request by Worker(' + id + ')');
   }

   console.time('PRIME NUMBER');
   var primeNumbers = [];      
   for(var i = 1 ; i < num ; i ++ ) {
      var isPrimeNumber = true;
      // TODO : i의 제곱근 이상 비교할 필요는 없다.
      for(var j = 2 ; j < i ; j++) {
         if ( i % j == 0 ) {
            isPrimeNumber = false;
            break;
         }
      }
      if ( isPrimeNumber ) {
         primeNumbers.push(i);
      }
   }
   console.log('PrimeNumber 1~' + num, ' fount : ', primeNumbers.length);
   console.timeEnd('PRIME NUMBER');
   res.end('Prime Number Service - Worker(' + id + ') : ' + primeNumbers);
}).listen(3000);
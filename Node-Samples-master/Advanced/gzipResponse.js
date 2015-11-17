var express = require('express');
var compression = require('compression');

var app = express();
app.use(compression({filter:shouldCompress}));

function shouldCompress(req, res) {
   var ret = compression.filter(req, res);
   console.log('shouldCompress : ' , ret);
   return ret;
}

var data = {
   code : 200,
   msg : 'Success',
   data : [
      {
         movieId : 0,
         title : "아바타",
         director : "제임스 카메론",
         year : 2009,
         synopsis : "인류의 마지막 희망, 행성 판도라! 이 곳을 정복하기 위한 ‘아바타 프로젝트’가 시작된다! 가까운 미래, 지구는 에너지 고갈 문제를 해결하기 위해 머나먼 행성 판도라에서 대체 자원을 채굴하기 시작한다. 하지만 판도라의 독성을 지닌 대기로 인해 자원 획득에 어려움을 겪게 된 인류는 판도라의 토착민 ‘나비(Na’vi)’의 외형에 인간의 의식을 주입, 원격 조종이 가능한 새로운 생명체 ‘아바타’를 탄생시키는 프로그램을 개발한다."
      },
      {
         movieId : 1,
         title : "스타워즈",
         director : "조지 루카스",
         year : 1977,
         synopsis : "평화롭던 은하계에서 타킨총독(피터 커슁)이 왕정에 저항하여 제국을 일으킨다. 타킨은 우주정거장인 죽음의 별을 완성하고 은하계의 작은 나라들을 점령하고자 한다. 그 정보를 입수한 반란군은 레아 공주(캐리 피셔)를 보내 죽음의 별 설계도를 입수하려고 하지만 공주는 타킨에게 잡힌다. 대신 공주는 도움을 요청하기 위해 제다이 기사 케노비(알렉 기네스)에게 로봇을 보낸다."
      },
      {
         movieId : 2,
         title : "인터스텔라",
         director : "크리스토퍼 놀란",
         year : 2014,
         synopsis : "세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다. 이때 시공간에 불가사의한 틈이 열리고, 남은 자들에게는 이 곳을 탐험해 인류를 구해야 하는 임무가 지워진다. 사랑하는 가족들을 뒤로 한 채 인류라는 더 큰 가족을 위해, 그들은 이제 희망을 찾아 우주로 간다. 그리고 우린 찾을 것이다. 늘 그랬듯이…"
      }
   ]
}

app.get('/', function(req, res) {
   res.status(200).send(data);
});

app.listen(3000);

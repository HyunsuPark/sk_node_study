var querystring = require('querystring');

var str = 'group=EXID&name=하니&since=';

console.log('== Querystring 으로 분석 ==');

var parsed = querystring.parse(str);
console.log(parsed);

console.log('group', parsed.group);
console.log('name', parsed.name);
console.log('since', parsed.since);
console.log('last', parsed.last);

console.log('== Querystring 없이 분석 ==');

var parts = str.split('&');
console.log(parts);
parts.forEach(function(element) {
	var name = element.split('=')[0];
	var value = element.split('=')[1];
	console.log('name : ' + name + ' - value : ' + value);	
});

// 배열
var str2 = 'group=걸스데이&member=혜리&member=유라&member=민아';
var parsed2 = querystring.parse(str2);
console.log('member');
var members = parsed2['member']; // 배열
for ( var i = 0 ; i < members.length ; i++ ) {
   console.log(members[i]);
} 

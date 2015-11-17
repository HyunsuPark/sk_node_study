/**
 * http://usejsdoc.org/
 */
var jstoxml = require('jstoxml');

var entry = {
		profile : {
			name : "태연",
			job : "singer"
		}
}

var xml = jstoxml.toXML(entry,{header:true});
console.log(xml);

var xml2json = require('node-xml2json');
var json = xml2json.parser(xml);
console.log(json);

console.log(JSON.stringify(json));

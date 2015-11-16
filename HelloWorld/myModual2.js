/**
 * http://usejsdoc.org/
 */
exports.createGreeting = function() {
	var obj = {
		hello : function(who) {
			console.log('hello' + who);
		}
	}
	
	obj.howAreYou = function() {
		obj.hello('park');
	}
	
	return obj;
}
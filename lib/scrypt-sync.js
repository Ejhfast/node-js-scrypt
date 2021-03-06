var scrypt_module_factory = require('./scrypt-module-factory');
var argScrubber = require('./argument-scrubber');

module.exports = function(password, salt, options) {
	var args = argScrubber.apply(null,arguments);
	var sm = scrypt_module_factory(args.options.maxmem);
	var pass = Array.prototype.slice.apply(args.password);
	var salt = Array.prototype.slice.apply(args.salt);
	var hash = sm.crypto_scrypt(pass, salt, args.options.cost, args.options.blockSize, args.options.parallel, args.options.size);

	var ret = new Buffer(hash.length);
	for (var i=0; i<hash.length; i++) ret[i] = hash[i];
	return ret;
}

var scrypt_module_factory = require('./scrypt-module-factory');

//console.log("Worker Started");

process.on('message', function(args){
	//console.log("Got Message:", args);
	try {
		//console.log('got message in worker', args);

		var sm = scrypt_module_factory(args.options.maxmem);
		var pass = Array.prototype.slice.apply(new Buffer(args.password,'base64'));
		var salt = Array.prototype.slice.apply(new Buffer(args.salt, 'base64'));
		var hash = sm.crypto_scrypt(pass, salt, args.options.cost, args.options.blockSize, args.options.parallel, args.options.size);

		var ret = new Buffer(hash.length);
		for (var i=0; i<hash.length; i++) ret[i] = hash[i];
		process.send({ data:ret.toString('base64') });
		return ret;
	} catch(err) {
		process.send({
			error: {
				message: err.message
				,stack: err.stack
			}
		})
	}
});

//setTimeout(process.exit.bind(process),4000);
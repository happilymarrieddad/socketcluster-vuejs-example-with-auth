var Password = {}
var bcrypt = require('bcrypt')

Password.crypt = function(password,respond) {
	bcrypt.genSalt(10,function(err,salt) {
		if (err) { respond(err,{}) }
		else { bcrypt.hash(password,salt,respond) }
	})
}

Password.compare = function(password,stored_password,respond) {
	bcrypt.compare(password,stored_password,function(err,match) {
		if (err) { respond(err,{}) }
		else { respond( (match ? null : 'Passwords do not match.'), {} ) }
	})
}

module.exports = Password
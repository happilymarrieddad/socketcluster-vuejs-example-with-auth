var UsersController = {},
	async = require('async'),
	Password = require('../models/Password'),
	User = require('../models/User')

UsersController.create = function(socket,pool,data,respond) {
	async.series([
		// Hash the password
		function(cb) {
			Password.crypt(data.password,function(err,hash) {
				if (err) {
					console.log(err)
					respond(err,{})
				} else {
					data.password = hash
					cb()
				}
			})
		},
		// Insert the user into the database
		function(cb) {
			User.store(pool,data,function(err,user) {
				if (err) { 
					console.log(err)
					respond(err,{})
				} else {
					socket.setAuthToken({
						id:user.id,
						email:data.email,
						first:user.first,
						last:user.last
					})
					respond(null,user)
				}
			})
		}
	])
}

module.exports = UsersController

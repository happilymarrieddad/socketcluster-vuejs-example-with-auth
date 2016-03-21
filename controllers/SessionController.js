var SessionController = {},
	async = require('async'),
	User = require('../models/User')

SessionController.create = function(socket,pool,data,respond) {

	User.login(pool,data,function(err,user) {
		if (err) {
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

module.exports = SessionController

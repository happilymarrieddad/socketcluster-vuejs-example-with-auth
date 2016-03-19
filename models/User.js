var User = {},
	Password = require('./Password'),
	async = require('async')

User.login = function(pool,data,respond) {

	pool.query(
		'SELECT id,first,last,password FROM users WHERE email = ?',
		[data.email],
		function(err,rows) {
			if (err) { 
				respond(err,{})
			} else {
				if (rows.length) {
					Password.compare(data.password,rows[0].password,function(err,match) {
						if (err) { respond(err,{}) }
						else { respond(null,rows[0]) }
					})
				} else {
					respond('There is no user with that email',{})
				}
			}
		}
	)

}

User.store = function(pool,data,respond) {

	pool.query(
		'INSERT INTO users SET ?',
		{
			first:data.first,
			last:data.last,
			email:data.email,
			password:data.password
		},
		function(err,rows) {
			if (err) { 
				console.log(err)
				respond(err,{}) 
			} else {
				respond(null,{ id:rows.insertId,first:data.first,last:data.last })
			}
		}
	)

}

module.exports = User
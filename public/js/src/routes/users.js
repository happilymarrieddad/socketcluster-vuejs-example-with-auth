var UsersCreateRouter = {
	component:Vue.extend({
		template:templatizer.home.users.create({}),
		data() {
			return {
				first:'',
				last:'',
				email:'',
				password:'',
				confirm_password:'',
				error:''
			}
		},
		methods: {
			createAccount() {
				if (this.password != this.confirm_password) {
					notify('Passwords do not match!')
				} else if (!this.first || !this.last || !this.email || !this.password) {
					notify('You must fill out all fields in the form.')
				} else {
					this.error = ''
					socket.emit('messages',{
						controller:'users',
						operation:'create',
						first:this.first,
						last:this.last,
						email:this.email,
						password:this.password
					},function(err,data) {
						if (err) { notify(err) }
						else {
							this.error = ''
							vue.$set('user_id',data.id)
							vue.$set('username', (user.first + ' ' + user.last) )
						}
					})
				}
			}
		}
	})
}

var UsersRouter = {
	component:Vue.extend({
		template:'<router-view></router-view>'
	}),
	subRoutes:{
		'/create':UsersCreateRouter
	},
	auth:false
}
var SessionCreateRouter = {
	component:Vue.extend({
		template:templatizer.home.session.create({}),
		data() {
			return {
				email:'',
				password:''
			};
		},
		methods: {
			login() {
				socket.emit('messages',{
					controller:'session',
					operation:'create',
					email:this.email,
					password:this.password
				},function(err,user) {
					if (err) { notify(err) }
					else {
						this.error = '' 
						vue.$set('user_id',user.id)
						vue.$set('username', (user.first + ' ' + user.last) )
					}
				})
			}
		}
	}),
	auth:false
}

var SessionRouter = {
	component:Vue.extend({
		template:'<router-view></router-view>'
	}),
	subRoutes:{
		'/create':SessionCreateRouter
	},
	auth:false
}
var vue = new Vue({
	el:'body',
	data: {
		loading:true,
		authenticated:false,
		username:''
	},
	watch: {
		'authenticated':function(val,oldVal) {
			if (val) {
				location.href = '#!/dashboard'
			} else {
				location.href = '#!/session/create'
			}
		}
	},
	methods: {
		logout() {
			socket.deauthenticate()
		}
	}
})
var socket = socketCluster.connect()

socket.on('connect',function(status) {
	if (status.isAuthenticated) {
		vue.$set('authenticated',true)
	} else {
		vue.$set('authenticated',false)
	}
})

socket.on('authenticate',function() { vue.$set('authenticated',true) })
socket.on('deauthenticate',function() { vue.$set('authenticated',false) })
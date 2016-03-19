var router = new VueRouter()

router.redirect({
	'*':(socket.authState == 'authenticated' ? '/dashboard' : '/session/create')
})

router.map({
	'/dashboard':DashboardRouter,
	'/profile':ProfileRouter,
	'/session':SessionRouter,
	'/users':UsersRouter
})

router.beforeEach(function(transition) {
	vue.$set('loading',true)
	if (transition.to.auth && !vue.$data.authenticated) {
		transition.redirect('/session/create')
	} else {
		transition.next()
	}
})

router.afterEach(function(transition) {
	vue.$set('loading',false)
})

router.start(Vue.extend({}),'body')
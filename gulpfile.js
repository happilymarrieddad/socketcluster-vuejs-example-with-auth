var gulp = require('gulp'),
	glob = require('glob'),
	env = require('node-env-file'),
	async = require('async'),
	templatizer = require('templatizer'),
	SocketCluster = require('socketcluster').SocketCluster,
	socketCluster = null,
	fs = require('fs'),
	exec = require('child_process').exec,
	uglify = require('uglify-js')

env(__dirname + '/.env')




gulp.task('default', function() {
	console.log("   Server is loading "+process.env.ENV+" mode.");
	buildTemplates()
	//minifyJsFiles()

	var config = {
		workers						:  require('os').cpus().length	,
		brokers						:  1							,
		port 						:  process.env.PORT || 3000		,
		appName 					:  'fusion' 					,
		loglevel 					:  1 							,
		protocol 					:  'http' 						,
		workerController			: 	__dirname + '/worker.js'	,
		brokerController			: 	__dirname + '/broker.js'	,
		socketEventLimit			: 	500							,
		rebootWorkerOnCrash			: 	true 						,
	    brokerOptions: {
	        host:process.env.REDIS_ADDRESS || 'localhost',
	        port:process.env.REDIS_PORT || 6379
	    }
	}

	if (process.env.ENV == 'production') {
		config.protocol = 'https'
		config.protocolOptions = {
			ca: fs.readFileSync(process.env.ENV_CA_PATH,'utf8'),
			key: fs.readFileSync(process.env.ENV_KEY_PATH,'utf8'),
			cert: fs.readFileSync(process.env.ENV_CRT_PATH,'utf8'),
			passphrase: process.env.SESSION_SECRET
		}
	}

	console.log("   Starting in "+process.env.ENV+" mode.")
	socketCluster = new SocketCluster(config)



	var node_watcher0 = gulp.watch('templates/**/*.jade',['templates'])
	node_watcher0.on('change',function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})

	// var node_watcher1 = gulp.watch('public/js/**/*.js',['templates'])
	// node_watcher1.on('change',function(event) {
	// 	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
	// })

})

gulp.task('reload', function () {
	socketCluster.killWorkers()
	socketCluster.killBrokers()
})

gulp.task('templates',function() {
	buildTemplates()
})

gulp.task('minify',function() {
	minifyJsFiles()
})

function minifyJsFiles() {
	console.log('   Server is minifying javascript files.');
	fs.writeFileSync(
		'public/min/app.min.js',
		require('uglify-js').minify( glob.sync('public/js/home/**/*.js') ).code
	)
	console.log('   Server is finished minifying javascript files.');
}

function buildTemplates() {
	console.log("   Server is building client-side templates.")
	templatizer(__dirname+'/templates',__dirname+'/public/js/lib/templates.js')
	console.log("   Server is finished building client-side templates.")
}
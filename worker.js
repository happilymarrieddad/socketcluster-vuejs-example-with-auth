var fs = require('fs'),
    express = require('express')

module.exports.run = function (worker) {
    console.log('   >> Worker PID:', process.pid);

    var app = require('express')();
    var pool = require('mysql').createPool({
        connectionLimit : 5000,
        host            : process.env.DB_HOST,
        user            : process.env.DB_USERNAME,
        password        : process.env.DB_PASSWORD,
        database        : process.env.DB_DATABASE,
        debug           : false
    });

    var httpServer = worker.httpServer;
    var scServer = worker.scServer;

    app.set('views', __dirname+'/views');
    app.set('view engine', 'jade');

    app.use(express.static(__dirname + '/public'));


    app.get('*',function(req,res) { res.render('home/index', {}) })


    httpServer.on('request', app);

    var Controllers = require('./controllers/Controllers');

    scServer.on('connection', function (socket) {

        socket.on('messages',function(data,respond) {
            try { Controllers[data.controller][data.operation](socket,pool,data,respond) }
            catch(err) {
                if (data.controller) {
                    respond('No controller. Please contact an administrator.',{})       
                }
            }
        })

    });
};

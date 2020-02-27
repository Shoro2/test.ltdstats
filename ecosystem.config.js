module.exports = {
  apps : [{
    name: 'LTDStats Webserver',
    script: 'webserver.js',
	error_file: 'logs/err.log',
	out_file: 'logs/out.log',
	log_file: 'logs/combined.log',
	time: true,
    autorestart: true
  },
  {
	name: 'LTDStats MongoDB Connector',
    script: '../mongodb/mongoserver/server.js',
	error_file: '../mongodb/mongoserver/logs/err.log',
	out_file: '../mongodb/mongoserver/logs/out.log',
	log_file: '../mongodb/mongoserver/logs/combined.log',
	time: true,
    autorestart: true
  },
  {
	name: 'LTDStats Discord Bot',
    script: '../livegames_bot/server.js',
	error_file: '../livegames_bot/logs/err.log',
	out_file: '../livegames_bot/logs/out.log',
	log_file: '../livegames_bot/logs/combined.log',
	time: true,
    autorestart: true
  }]
};

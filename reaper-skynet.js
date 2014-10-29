var skynet = require('skynet');
var exec = require('child_process').exec;
var config = require('./meshblu.json');

var Reaper = require('./reaper');

var r = new Reaper();


var conn = skynet.createConnection({
  uuid: config.uuid,
  token: config.token
});

conn.on('notReady', function(data){
  console.log('UUID FAILED AUTHENTICATION!');
  console.log(data);
});

conn.on('ready', function(data){
  console.log('UUID AUTHENTICATED!');
  console.log(data);
});

r.connect(function(){
  conn.on('message', function(message){
    console.log(message.payload);
    r[message.payload.action](message.payload.data);
  });
});

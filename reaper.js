var _     = require('lodash');
var raspi = require('raspi-io');
var exec  = require('child_process').exec;

var Reaper = function(){
  var self = this;

  self.connect = function(callback){
    self.board = new raspi();
    self.board.on('ready', function(){
      self.board.pinMode(7,  self.board.MODES.OUTPUT);
      self.board.pinMode(29, self.board.MODES.OUTPUT);
      callback();
    });
  };

  self.eyes = function(on){
    var value = on ? self.board.HIGH : self.board.LOW;
    self.board.pins[29].value = value;
  };

  self.jaws = function(on){
    var value = on ? self.board.HIGH : self.board.LOW;
    self.board.pins[7].value = value;
  };

  self.say = function(text){
    exec('./v2.sh "'+text+'"');
  };

  return self;
};

module.exports = Reaper;
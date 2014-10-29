var _     = require('lodash');
var raspi = require('raspi-io');
var exec  = require('child_process').exec;
var eyesPin = 16, jawPin = 22;
var Reaper = function(){
  var self = this;

  self.connect = function(callback){
    self.board = new raspi();
    self.board.on('ready', function(){
      self.board.pinMode(eyesPin,  self.board.MODES.OUTPUT);
      self.board.pinMode(jawPin, self.board.MODES.OUTPUT);
      if(callback) callback();
    });
  };

  self.eyes = function(on){
    var value = on ? self.board.HIGH : self.board.LOW;
    self.board.pins[eyesPin].value = value;
  };

  self.jaws = function(on){
    var value = on ? self.board.HIGH : self.board.LOW;
    self.board.pins[jawPin].value = value;
  };

  self.say = function(text){
    exec('./voice.sh "'+text+'"');
  };

  return self;
};

module.exports = Reaper;
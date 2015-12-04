/**
 * Hall model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Hall = require('../../sqldb').Hall;
var HallEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HallEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Hall.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    HallEvents.emit(event + ':' + doc._id, doc);
    HallEvents.emit(event, doc);
    done(null);
  }
}

module.exports = HallEvents;

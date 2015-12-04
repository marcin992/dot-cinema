/**
 * Seance model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Seance = require('../../sqldb').Seance;
var SeanceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeanceEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Seance.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SeanceEvents.emit(event + ':' + doc._id, doc);
    SeanceEvents.emit(event, doc);
    done(null);
  }
}

module.exports = SeanceEvents;

/**
 * Schedule model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Schedule = require('../../sqldb').Schedule;
var ScheduleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScheduleEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Schedule.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ScheduleEvents.emit(event + ':' + doc._id, doc);
    ScheduleEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ScheduleEvents;

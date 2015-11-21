/**
 * EmployeesData model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var EmployeesData = require('../../sqldb').EmployeesData;
var EmployeesDataEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EmployeesDataEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EmployeesData.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EmployeesDataEvents.emit(event + ':' + doc._id, doc);
    EmployeesDataEvents.emit(event, doc);
    done(null);
  }
}

module.exports = EmployeesDataEvents;

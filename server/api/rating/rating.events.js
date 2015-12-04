/**
 * Rating model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Rating = require('../../sqldb').Rating;
var RatingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RatingEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rating.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RatingEvents.emit(event + ':' + doc._id, doc);
    RatingEvents.emit(event, doc);
    done(null);
  }
}

module.exports = RatingEvents;

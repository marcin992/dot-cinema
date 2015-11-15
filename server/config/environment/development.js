'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dotcinema-dev'
  },
  sequelize: {
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true
};

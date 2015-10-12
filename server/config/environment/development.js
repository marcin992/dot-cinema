'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dotcinema-dev'
  },
  sequelize: {
    uri: 'postgres://dotcinema_admin:dtcnm2k15@localhost:5432/dotcinema',
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  },

  seedDB: true
};

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
    },
    port: 5432
  },

  seedDB: false
};

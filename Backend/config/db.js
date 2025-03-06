const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('palmBoutique2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging; you can set it to `console.log` for debugging
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize instance
module.exports = sequelize;

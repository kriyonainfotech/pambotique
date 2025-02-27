const { Sequelize } = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize("palmBoutique", "root", "MySQL&&100", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging; you can set it to `console.log` for debugging
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "✅ Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

// Sync models with the database (creates tables if they don't exist)
sequelize
  .sync({ alter: true }) // Change to { force: true } if you want to drop and recreate tables
  .then(() => {
    console.log("✅ Database & tables are synced successfully.");
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });

// Export the sequelize instance
module.exports = sequelize;

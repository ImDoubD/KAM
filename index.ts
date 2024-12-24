import app from "./app";
import sequelize from "./db";

// Sync Database and Start Server
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: true }); // Use `force: true` for development to recreate database
    console.log("Database synced successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
})();

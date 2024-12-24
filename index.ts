import app from "./app";
import sequelize from "./db";
import express, { Request, Response } from "express";

// Sync Database and Start Server
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running...");
  });
  

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

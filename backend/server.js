// Server/server.js
const mongoose = require("mongoose");
const config = require("./app/config");
const app = require("./app");

async function startServer() {
  try {
    await mongoose.connect(config.db.uri);
    console.log("Connected to MongoDB");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error run server", error);
  }
};

startServer();

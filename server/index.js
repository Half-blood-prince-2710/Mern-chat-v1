import express from "express";
import {
  app,
  server,

} from "./socket/socket.js"; // Import io if needed
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

// Routes
import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-route.js";
import usersRoutes from "./routes/users-route.js";

import connectDb from "./config/db.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;



// Use CORS middleware


// Middlewares
app.use(express.json());
app.use(cookieParser());

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

// Serve static files
app.use(
  express.static(
    path.join(__dirname, "/client/dist")
  )
);

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "client",
      "dist",
      "index.html"
    )
  );
});

// Connect to the database
connectDb();

// Start the server
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

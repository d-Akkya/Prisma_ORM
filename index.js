import express from "express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3000;

// default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// apis
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/comment", commentRoutes);

app.get("/", (_, res) => {
  return res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

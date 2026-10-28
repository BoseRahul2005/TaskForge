const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { clerkMiddleware } = require("@clerk/express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const clerkWebhookRouter = require("./src/routes/clerkWebhookRoutes.js");
const workspaceDetailsRouter = require("./src/routes/workspaceDetailsRoute.js");
const projectRouter = require("./src/routes/projectRoutes.js");
const app = express();
connectDB();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use("/api/clerk", clerkWebhookRouter);
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: (req, buf) => {
      req.rawBody = buf;
    },
  }),
);
app.use(clerkMiddleware());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/details", workspaceDetailsRouter);
app.use("/api/workspaces",projectRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectToDB = require("./config/db");
const restaurentRouter = require("./routes/restaurent.routes");
const reviewRouter = require("./routes/review.routes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
connectToDB();

app.use("/api/restaurants", restaurentRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorMiddleware);

app.use((req, res) => {
  res.status(404).json({ error: "Invalid Route" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on - http://localhost:${PORT}`);
});

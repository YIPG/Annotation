import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/route";

const app = express();
app.use(cors());
app.use(express.static("public"));

// Check DB Connection

mongoose.connect("mongodb://127.0.0.1:27017/annotation", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connection OK"));

// Routing
app.use("/", route);

app.listen(3333, () => console.log("working at 3333"));

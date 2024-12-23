import express from "express";
import { log } from "node:console";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(() => {
  console.log(`Server is running on http://localhost:${port}`);
});

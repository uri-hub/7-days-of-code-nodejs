import express from "express";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());
const port = process.env.PORT;

const genAI = new GoogleGenerativeAI(String(process.env.API_KEY));
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/api/v1/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Errror" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

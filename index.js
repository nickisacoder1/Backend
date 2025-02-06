import express from "express";
import cors from "cors";
import { sendTextToPhone } from "./twilio.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App is now running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.json("All good man");
});

app.post("/send", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const message = req.body.message;
    console.log({ phoneNumber, message });
    await sendTextToPhone(phoneNumber, message);

    res.json("Message Sent Successfully");
  } catch (error) {
    res.json("Failure, You Are");
  }
});

import express from "express";
import cors from "cors";
import { sendTextToPhone } from "./twilio.js";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import twilio from "twilio";

const app = express();
const PORT = 4000;

let replyMessage;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/sms", (req, res) => {
  const { MessagingResponse } = twilio.twiml;
  const twiml = new MessagingResponse();

  console.log({ returnText: req.body.Body });

  replyMessage = req.body.Body;

  res.type("text/sml").send(twiml.toString());
});

app.get("/replyMessages", (req, res) => {
  res.json(replyMessage);
});

import twilio from "twilio";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function sendTextToPhone(phoneNumber, message) {
  await client.messages.create({
    body: message,
    to: phoneNumber,
    from: "+18774751499",
  });
  return "Mensaje mandado a Twilio";
}

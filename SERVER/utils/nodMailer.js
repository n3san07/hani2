"use strict";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Use a non-secure connection
  auth: {
    user: "hanigat7@gmail.com",
    pass: "MzOwbmgaXCf3ERDZ",
  },
});

/*const data = {
  from: '"Fred Foo 👻" <foo@example.com>',
  to: "hanigat7@gmail.com",
  subject: "Hello ✔",
  text: "Hello world?",
  html: "<b>Hello world?</b>",
};*/

const sendEmail = async (data) => {
  try {
    const info = await transporter.sendMail(data);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;

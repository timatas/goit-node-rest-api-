const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
  host: process.env.MAILTRAP_HOST,
  port: +process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
};

// const { META_PASSWORD } = process.env;
// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, //25, 465, 2525
//   secure: true,
//   auth: {
//     user: "timatas@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

const transport = nodemailer.createTransport(nodemailerConfig);
const { MY_EMAIL } = process.env;
const sendEmail = async (data) => {
  const email = { ...data, from: MY_EMAIL };
  /*const email = { ...data, from: "timatas@meta.ua"};*/
  await transport.sendMail(email);
  return true;
};
module.exports = sendEmail;

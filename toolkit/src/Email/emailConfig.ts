// src/email/emailConfig.ts
import nodemailer from 'nodemailer';
import { config } from '../config/config';


export let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: parseInt(config.get("nodemailer_port"), 10),
  secure: config.get("nodemailer_port") === "465", // true for port 465, false for others
  auth: {
      user: config.get("nodemailer_user"),
      pass: config.get("nodemailer_password"),
  },
});

// Verify connection configuration
transporter.verify(function (error) {
  if (error) {
    console.log('Email configuration error: ', error);
  } else {
    console.log('Email server is ready to take messages');
  }

// });


});


// Verify connection configuration

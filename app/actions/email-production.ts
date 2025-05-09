"use server"

// This is a production-ready version that you can use when deploying to production
// You'll need to install the 'nodemailer' package and configure your email service

/*
import nodemailer from "nodemailer"

type EmailData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
      // For Gmail
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      
      // For other SMTP services
      // host: "smtp.example.com",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      // auth: {
      //   user: process.env.EMAIL_USER,
      //   pass: process.env.EMAIL_PASS,
      // },
    })

    // Send the email
    const mailOptions = {
      from: `"${data.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to your email
      replyTo: data.email,
      subject: `${data.subject} - Contact Form Submission`,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4338ca;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Subject:</strong> ${data.subject}</p>
  <h3 style="margin-top: 20px;">Message:</h3>
  <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">
    ${data.message.replace(/\n/g, "<br>")}
  </div>
</div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}
*/

// Placeholder for the production version
export const productionEmailSenderAvailable = false

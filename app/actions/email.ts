"use server"

type EmailData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // Create the email content
    const emailContent = `
From: ${data.name} <${data.email}>
Subject: ${data.subject}
Reply-To: ${data.email}

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the email for debugging (you'll see this in server logs)
    console.log("Email content:", emailContent)

    return {
      success: true,
      messageId: `mock-${Date.now()}`,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}

"use server"

export async function sendEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Simulate a successful submission without any external API or environment variables
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the form submission (this will only show in server logs)
    console.log("Form submission received:", {
      name,
      email,
      subject,
      message,
    })

    return { success: true }
  } catch (error) {
    console.error("Error processing form:", error)
    return { success: false, error: "Failed to process form. Please try again." }
  }
}

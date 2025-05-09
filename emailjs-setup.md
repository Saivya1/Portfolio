# Setting Up EmailJS for Contact Form

This guide will help you set up EmailJS to handle the contact form submissions in your portfolio website.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows 200 emails per month, which should be sufficient for a portfolio website

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Give your service a name (e.g., "portfolio-contact")
6. Note down the **Service ID** for later use

## Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{user_name}}` - The sender's name
   - `{{user_email}}` - The sender's email
   - `{{subject}}` - The email subject
   - `{{message}}` - The message content
4. Save your template
5. Note down the **Template ID** for later use

## Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account"
2. Find your **Public Key** in the API Keys section
3. Note down this key for later use

## Step 5: Update Your Code

Open the `contact-section.tsx` file and replace the placeholder values with your actual EmailJS credentials:

\`\`\`tsx
// Initialize EmailJS
useEffect(() => {
  // Replace with your actual EmailJS public key
  emailjs.init("YOUR_PUBLIC_KEY");
  setEmailJSInitialized(true);
}, []);

// In the handleSubmit function
const result = await emailjs.sendForm(
  "YOUR_SERVICE_ID", 
  "YOUR_TEMPLATE_ID", 
  formRef.current
);
\`\`\`

Replace:
- `YOUR_PUBLIC_KEY` with your EmailJS Public Key
- `YOUR_SERVICE_ID` with your EmailJS Service ID
- `YOUR_TEMPLATE_ID` with your EmailJS Template ID

## Step 6: Test Your Form

After updating the code with your EmailJS credentials, test your contact form to ensure it's working correctly:

1. Fill out the form with test data
2. Submit the form
3. Check your email to see if you received the test message
4. Check the EmailJS dashboard to see if the email was sent successfully

## Troubleshooting

If you encounter any issues:

1. Check the browser console for errors
2. Verify that your EmailJS credentials are correct
3. Make sure your email service is connected properly
4. Check if you've reached your monthly email limit

For more information, visit the [EmailJS documentation](https://www.emailjs.com/docs/).

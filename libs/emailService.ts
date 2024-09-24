// libs/emailService.ts
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or another email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Ensure the verification link is generated correctly
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Receiver's email
    subject: 'Email Verification', // Subject line
    html: `
      <p>Please click the following link to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `, // HTML body
  };
  

  try {
    // Attempt to send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email); // Log for debugging
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error); // Log any errors
    throw new Error('Failed to send email'); // Rethrow error for handling in the calling function
  }
};


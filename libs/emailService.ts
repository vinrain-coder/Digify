import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Ensure these env variables are properly set
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<p>Please click the following link to verify your email:</p><a href="${verificationLink}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email'); // Propagate the error
  }
};



const nodemailer = require('nodemailer');
const FormData = require('form-data');
const fs = require('fs');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const formData = JSON.parse(event.body);

      // Create a transporter for sending emails (using Gmail as an example)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      });

      // Create email content
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: 'New Clearance Form Submission',
        text: `Student ID: ${formData['student-id']}\nFull Name: ${formData['full-name']}\nReason: ${formData['clearance-reason']}`,
      };

      // If you want to attach the uploaded file, you can include it as an attachment.
      if (formData['upload-document']) {
        const fileBuffer = fs.readFileSync(formData['upload-document']);
        mailOptions.attachments = [
          {
            filename: 'upload-document.pdf', // Adjust file name based on your needs
            content: fileBuffer,
            encoding: 'base64',
          },
        ];
      }

      // Send email
      await transporter.sendMail(mailOptions);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred while processing your form submission.' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};

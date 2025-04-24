const nodemailer = require('nodemailer');
const validator = require('validator');
const Contact = require('../models/contact');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, subject, and message are required',
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
  }

  try {
    // Save to database
    const contactEntry = new Contact({
      name,
      email,
      subject,
      message,
    });
    await contactEntry.save();

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting Us',
      html: `
        <h2>Thank You, ${name}!</h2>
        <p>We have received your message with the subject: <strong>${subject}</strong>.</p>
        <p><strong>Your Message:</strong> ${message}</p>
        <p>Our team will get back to you soon.</p>
        <p>Best regards,<br>Glamour Haven Team</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    res.status(200).json({
      success: true,
      message: 'Contact request sent successfully',
    });
  } catch (error) {
    console.error('Error processing contact request:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing contact request',
      error: error.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};

module.exports = { contact, getAllContacts };
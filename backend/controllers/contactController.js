const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create new contact
    const newContact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will contact you soon.',
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email
      }
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    // Handle other errors
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while processing your request'
    });
  }
};
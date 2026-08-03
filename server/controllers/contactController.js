const Contact = require("../models/Contact");

const sendMessage = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      contact,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

const getAllMessages = async (req, res) => {

  try {

    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      messages,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

const deleteMessage = async (req, res) => {
  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Message Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  sendMessage,
  getAllMessages,
  deleteMessage,
};
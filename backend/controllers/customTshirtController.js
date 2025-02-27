const Customize = require('../models/customTshirtModel');
const { Op } = require('sequelize');

const addRequest = async (req, res) => {
  const { name, size, email, style, designPreference } = req.body;

  // Check if all required fields are present
  if (!name || !size || !email || !style || !designPreference) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create new custom T-shirt request
    const newRequest = await Customize.create({
      name,
      size,
      email,
      style,
      designPreference,
    });

    // Send success response
    return res.status(201).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send request', error });
  }
};

const getRequest = async (req, res) => {
  try {
    const requests = await Customize.findAll();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
};


const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Customize.findByPk(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await request.destroy();
    console.log("Request deleted");
    
    return res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete request", error });
  }
};

const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { name, size, email, style, designPreference } = req.body;

  try {
    const request = await Customize.findByPk(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update request details
    await request.update({
      name,
      size,
      email,
      style,
      designPreference,
    });
    
    return res.status(200).json({ message: "Request updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update request", error });
  }
};


module.exports = { getRequest, addRequest,deleteRequest ,updateRequest};

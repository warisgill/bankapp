import asyncHandler from 'express-async-handler';
import ATM from '../models/atmModel.js';

// @desc    Returns list of all ATMs
// @route   GET /atm
// @access  Public
const getATMs = asyncHandler(async (req, res) => {
  const ATMs = await ATM.find({});
  if (ATMs){
    res.json(ATMs);
  }
  else{
      res.status(404);
      throw new Error('No results found');
  }
});

// @desc    Add new ATM
// @route   POST /atm/add
// @access  Public
const addATM = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, street, city, state, zip, latitude, longitude } = req.body;
  const atm = new ATM({
      name,
      address: {
        street,
        city,
        state,
        zip,
      },
      coordinates: {
        latitude,
        longitude,
      },
  });

  const createdATM = await atm.save();
  if (createdATM){
    res.status(201).json(createdATM);
  }
  else{
    res.status(404);
    throw new Error('Could not create ATM');
  }

});
export {
  getATMs,
  addATM,
};

const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Garage = require('../models/garage.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========
router.use(verifyToken);


// Everything starts with  /:userId/garages

// Garage
//  get /, get /new, post /, get /:garageId, get /:garagId/edit (don't need),
// put /:garageId, delete /:garageId

router.get('/', async (req, res) => {
    try {
      const garage = await Garage.find({})
        .populate('owner')
        .sort({ createdAt: 'desc' });
      res.status(200).json(garage);
    } catch (error) {
      res.status(500).json(error);
    }
  });


router.post('/', async (req, res) => {
    try {
      req.body.owner = req.user._id;
      const garage = await Garage.create(req.body);
      garage._doc.owner = req.user;
      res.status(201).json(garage);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.get('/:garageId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId).populate('owner', 'cars', 'comments');
      res.status(200).json(garage);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.put('/:garageId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
  
      if (!garage.owner.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const updatedGarage = await Garage.findByIdAndUpdate(
        req.params.garageId,
        req.body,
        { new: true }
      );
  
      // Append req.user to the owner property:
      updatedGarage._doc.owner = req.user;
  
      // Issue JSON response:
      res.status(200).json(updatedGarage);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.delete('/:garageId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
  
      if (!garage.owner.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedGarage = await Garage.findByIdAndDelete(req.params.garageId);
      res.status(200).json(deletedGarage);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// Garage Comments 
// Post /:garageId/comments/ Put /:grageId/comments/:commentId
// Delete /:garageId/comments/:commentId

  
  router.post('/:garageId/comments', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const garage = await Garage.findById(req.params.garageId);
      garage.comments.push(req.body);
      await garage.save();
  
      // Find the newly created comment:
      const newComment = garage.comments[garage.comments.length - 1];
  
      newComment._doc.author = req.user;
  
      // Respond with the newComment:
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.put('/:garageId/comments/:commentId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
      const comment = garage.comments.id(req.params.commentId);
      comment.text = req.body.text;
      await garage.save();
      res.status(200).json({ message: 'Ok' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:garageId/comments/:commentId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
      garage.comments.remove({ _id: req.params.commentId });
      await garage.save();
      res.status(200).json({ message: 'Ok' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Garage Cars

  // Index Get /:garageId/ == SHOW for Garages

  // Create /:garageId
  router.post('/:garageId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
      req.body.garage = garage._id;
      garage.cars.push(req.body);
      await garage.save();
      const newCar = garage.cars[garage.cars.length - 1];
      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  // New GET /:garageId/new (shouldn't need for React)

  // Show GET /:garageId/:carId
  router.get('/:garageId/:carId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
      const foundCar = garage.cars.id(req.params.carId);
      res.status(200).json(foundCar);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Update /:garageId/:cardId

  router.put('/:garageId/:carId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
      const car = garage.cars.id(req.params.carId);
        car.make = req.body.make;
        car.model = req.body.model;
        car.color = req.body.color;
        car.year = req.body.year;
        car.imgURL = req.body.imgURL;
      await garage.save();
      res.status(200).json({ message: 'Ok' }); // Can return the car object later if we need to
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:garageId/:carId', async (req, res) => {
    try {
      const garage = await Garage.findById(req.params.garageId);
      garage.cars.remove({ _id: req.params.carId });
      await garage.save();
      res.status(200).json({ message: 'Ok' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Garages Cars Comments
// Create POST /:garageId/:carId/comments/ 


router.post('/:garageId/:carId/comments', async (req, res) => {
  try {
    req.body.author = req.user._id;
    const garage = await Garage.findById(req.params.garageId);
    const car = garage.cars.id(req.params.carId);
    car.comments.push(req.body);
    await garage.save();

    // Find the newly created comment:
    const newComment = car.comments[car.comments.length - 1];

    newComment._doc.author = req.user; //confused about what this accomplishes

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Edit route PUT  /:garageId/:carId/comments/:commentId

router.put('/:garageId/:carId/comments/:commentId', async (req, res) => {
  try {
    const garage = await Garage.findById(req.params.garageId);
    const car = garage.cars.id(req.params.carId);
    const comment = car.comments.id(req.params.commentId)
    comment.text = req.body.text
    await garage.save();

    // Find the newly created comment:
    // const newComment = car.comments.[car.comments.length - 1];

    // newComment._doc.author = req.user; //confused about what this accomplishes

    // Respond with the newComment:
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Delete route DELETE /:garageId/:cardId/comments/:commentId

router.delete('/:garageId/:carId/comments/:commentId', async (req, res) => {
  try {
    const garage = await Garage.findById(req.params.garageId);
    const car = garage.cars.id(req.params.carId);
    const comment = car.comments.remove({ _id: req.params.commentId });
    await garage.save();

    // Find the newly created comment:
    // const newComment = car.comments.[car.comments.length - 1];

    // newComment._doc.author = req.user; //confused about what this accomplishes

    // Respond with the newComment:
    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
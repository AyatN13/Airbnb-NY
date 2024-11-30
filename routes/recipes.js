const express = require('express');
const axios = require('axios');
const Recipe = require('../models/Recipe'); 
const router = express.Router();

// Route that searches for recipes
router.get('/search', async (req, res) => {
  const { ingredients } = req.query; // get ingredients from query
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients,
        apiKey: process.env.de8a412340984f72aa5654452843a253
      },
    });
    res.json(response.data); // send the API data back to the frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;

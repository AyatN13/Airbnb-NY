const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route that searches for recipes from the API
router.get('/search', async (req, res) => {
  const { ingredients } = req.query; // Get ingredients from query
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients,
        apiKey: process.env.SPOONACULAR_API_KEY // API key that was declared in .env
      },
    });
    res.json(response.data); // Send the API data back to the frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Airbnb Search Route
router.get('/search', async (req, res) => {
  const { neighborhood, minPrice, maxPrice, checkin, checkout, adults } = req.query;

  try {
    const response = await axios.get('https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace', {
      params: {
        id: 'ChIJNb0n5k5ZwokRAMDACa2m4K8', // New York City ID
        checkin,
        checkout,
        adults,
        totalRecords: 10,
        currency: 'USD',
        price_min: minPrice,
        price_max: maxPrice,
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com',
      },
    });

    // Filter results by neighborhood if provided
    let results = response.data.data;
    if (neighborhood) {
      results = results.filter((property) =>
        property.address.toLowerCase().includes(neighborhood.toLowerCase())
      );
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching Airbnb data:', error);
    res.status(500).json({ error: 'Failed to fetch Airbnb properties' });
  }
});

module.exports = router;

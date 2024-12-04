const Preference = require('../models/Preference');
const axios = require('axios');

exports.getRecommendations = async (req, res) => {
    const userId = req.params.userId;
    const ingredients = req.body.ingredients;
    const preferences = await Preference.findOne({ userId });

    if (!preferences) {
        return res.status(404).json({ error: 'Preferences not found' });
    }

    if (!ingredients) {
        return res.status(400).json({ error: 'No ingredients provided' });
    }

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
            {
                params: {
                    ingredients: ingredients.join(','),
                    ranking: 2,
                    apiKey: process.env.SPOONACULAR_API_KEY,
                    diet: preferences.dietaryRestrictions.join(','),
                    intolerances: preferences.allergies.join(','),
                }
            }
        );

        return res.status(200).json(response.data.results);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching recommendations' });
    }
};
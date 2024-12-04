const Preference = require('../models/Preference');
const axios = require('axios');

exports.getRecommendations = async (req, res) => {
    const userId = req.params.userId;
    const { ingredients, ignorePantry } = req.body;
    const preferences = await Preference.findOne({ userId });

    if (!ingredients) {
        return res.status(400).json({ error: 'No ingredients provided' });
    }

    if (!preferences) {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
                {
                    params: {
                        ingredients: ingredients.join(','),
                        ranking: 2,
                        ignorePantry: ignorePantry,
                        apiKey: process.env.SPOONACULAR_API_KEY
                    }
                }
            );

            return res.status(200).json(response.data.results);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching recommendations' });
        }
    } else {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
                {
                    params: {
                        ingredients: ingredients.join(','),
                        ranking: 2,
                        apiKey: process.env.SPOONACULAR_API_KEY,
                        ignorePantry: ignorePantry,
                        diet: preferences.dietaryRestrictions.join(',') || 'none',
                        intolerances: preferences.allergies.join(',') || 'none',
                    }
                }
            );

            return res.status(200).json(response.data.results);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching recommendations with preferences' });
        }
    }
};
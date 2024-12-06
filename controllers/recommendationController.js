const Preference = require('../models/Preference');
const axios = require('axios');

exports.getRecommendations = async (req, res) => {
    const { ingredients, ignorePantry, userId } = req.body;
    const preferences = await Preference.findOne({ userId });
    let excludedRecipes = [];

    if (!ingredients) {
        return res.status(400).json({ error: 'No ingredients provided' });
    }

    try {
        const response = await axios.get(`https://dishfindr-microservice-c-ca58d83577d1.herokuapp.com/excluded-recipes/${userId}`);
        excludedRecipes = response.data;
    } catch (error) {
        console.error('Error fetching excluded recipes', error);
    }

    if (!preferences) {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
                {
                    params: {
                        includeIngredients: ingredients.join(','),
                        ranking: 2,
                        ignorePantry: ignorePantry,
                        apiKey: process.env.SPOONACULAR_API_KEY
                    }
                }
            );

            const recipes = response.data.results.filter(recipe => !excludedRecipes.includes(recipe.id.toString()));

            return res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching recommendations' });
        }
    } else {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', 
                {
                    params: {
                        includeIngredients: ingredients.join(','),
                        ranking: 2,
                        apiKey: process.env.SPOONACULAR_API_KEY,
                        ignorePantry: ignorePantry,
                        diet: preferences.dietaryRestrictions.join(',') || 'none',
                        intolerances: preferences.allergies.join(',') || 'none',
                    }
                }
            );

            const recipes = response.data.results.filter(recipe => !excludedRecipes.includes(recipe.id.toString()));

            return res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching recommendations with preferences' });
        }
    }
};
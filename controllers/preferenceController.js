const Preference = require('../models/Preference');

exports.savePreferences = async (req, res) => {
    const { userId, dietaryRestrictions, allergies } = req.body;
    try {
        const existingPreference = await Preference.findOne({ userId });
        if (existingPreference) {
            existingPreference.dietaryRestrictions = dietaryRestrictions || [];
            existingPreference.allergies = allergies || [];
            await existingPreference.save();
        } else {
            const newPreference = new Preference({ userId, dietaryRestrictions, allergies });
            await newPreference.save();
        }

        res.status(200).send('Preferences saved successfully');
    } catch (error) {
        console.error('Error saving preferences', error);
        res.status(500).json({ error: 'Error saving preferences' });
    }
};

exports.getPreferences = async (req, res) => {
    const { userId } = req.params;
    try {
        const preference = await Preference.findOne({ userId });
        if (preference) {
            res.status(200).json(preference);
        } else {
            res.status(404).json({ error: 'Preferences not found' });
        }
    } catch (error) {
        console.error('Error getting preferences', error);
        res.status(500).json({ error: 'Error getting preferences' });
    }
};
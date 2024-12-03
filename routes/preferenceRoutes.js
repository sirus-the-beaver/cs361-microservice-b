const { savePreferences, getPreferences } = require('../controllers/preferenceController');
const express = require('express');
const router = express.Router();

router.post('/preferences', savePreferences);
router.get('/preferences/:userId', getPreferences);

module.exports = router;
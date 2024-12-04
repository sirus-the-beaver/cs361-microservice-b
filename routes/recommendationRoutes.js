const { getRecommendations } = require('../controllers/recommendationController');
const express = require('express');
const router = express.Router();

router.post('/recommendations', getRecommendations);

module.exports = router;
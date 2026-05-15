const express = require('express');
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.route('/')
    .get(getMovies)
    .post(protect, upload.single('image'), createMovie);

router.route('/:id')
    .get(getMovie)
    .put(protect, upload.single('image'), updateMovie)
    .delete(protect, deleteMovie);

module.exports = router;

const express = require('express');
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies');

const upload = require('../utils/multer');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getMovies)
  .post(protect, authorize('admin', 'user'), upload.single('poster'), createMovie);

router
  .route('/:id')
  .get(getMovie)
  .put(protect, authorize('admin', 'user'), upload.single('poster'), updateMovie)
  .delete(protect, authorize('admin', 'user'), deleteMovie);

module.exports = router;

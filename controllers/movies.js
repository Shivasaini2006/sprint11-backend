const asyncHandler = require('../middleware/async');
const Movie = require('../models/Movie');
const { streamUpload } = require('../utils/cloudinaryUpload');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find().sort('-createdAt');

  res.status(200).json({
    success: true,
    count: movies.length,
    data: movies
  });
});

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: movie
  });
});

// @desc    Create new movie
// @route   POST /api/movies
// @access  Private
exports.createMovie = asyncHandler(async (req, res, next) => {
  let posterUrl = '';

  // Check if file exists
  if (req.file) {
    try {
      const result = await streamUpload(req.file.buffer);
      posterUrl = result.secure_url;
    } catch (error) {
      return next(new ErrorResponse('Problem with file upload', 500));
    }
  } else if (!req.body.posterUrl) {
    return next(new ErrorResponse('Please upload a poster image or provide a poster URL', 400));
  } else {
    posterUrl = req.body.posterUrl;
  }

  const movieData = {
    ...req.body,
    posterUrl
  };

  const movie = await Movie.create(movieData);

  res.status(201).json({
    success: true,
    data: movie
  });
});

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
exports.updateMovie = asyncHandler(async (req, res, next) => {
  let movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404));
  }

  let movieData = { ...req.body };

  if (req.file) {
    try {
      const result = await streamUpload(req.file.buffer);
      movieData.posterUrl = result.secure_url;
    } catch (error) {
      return next(new ErrorResponse('Problem with file upload', 500));
    }
  }

  movie = await Movie.findByIdAndUpdate(req.params.id, movieData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: movie
  });
});

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404));
  }

  await movie.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description can not be more than 1000 characters']
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating can not be more than 10'],
    default: 5
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please add a release year']
  },
  posterUrl: {
    type: String,
    required: [true, 'Please add a poster URL (Cloudinary secure_url)']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', MovieSchema);

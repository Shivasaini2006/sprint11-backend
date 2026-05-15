const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('user', 'name');
        res.json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('user', 'name');
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const { title, description, director, releaseYear } = req.body;
        
        let imageUrl = '';
        if (req.file && req.file.path) {
            imageUrl = req.file.path;
        }

        const movie = await Movie.create({
            title,
            description,
            director,
            releaseYear,
            imageUrl,
            user: req.user.id
        });

        res.status(201).json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Make sure user owns movie
        if (movie.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to update this movie' });
        }

        let updatedData = { ...req.body };
        if (req.file && req.file.path) {
            updatedData.imageUrl = req.file.path;
        }

        movie = await Movie.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true
        });

        res.json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Make sure user owns movie
        if (movie.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this movie' });
        }

        await movie.deleteOne();

        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

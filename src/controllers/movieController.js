const axios = require('axios');
const movieModel = require('../models/movieModel');
const publicMovieModel = require('../models/publicMovieModel');

// open route handlers :- 
const popularMovies = async function (req, res) {
    try {
        const page = req.params.page;
        const movies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=805ba841c4b106065697b6ef5ca3f7b7&page=' + page);
        res.status(200).send({ staus: true, data: movies.data });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const upcomingMovies = async function (req, res) {
    try {

        const movies = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=805ba841c4b106065697b6ef5ca3f7b7');
        res.status(200).send({ staus: true, data: movies.data });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const topRatedMovies = async function (req, res) {
    try {

        const movies = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=805ba841c4b106065697b6ef5ca3f7b7');
        res.status(200).send({ staus: true, data: movies.data });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const nowPlayingMovies = async function (req, res) {
    try {

        const movies = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=805ba841c4b106065697b6ef5ca3f7b7');
        res.status(200).send({ status: true, data: movies.data });
    } catch (error) {
        res.status(500).send({ staus: false, message: error.message });
    };
};

const movieDetails = async function (req, res) {
    try {
        const movieId = req.params.movieId;
        // console.log(movieId);
        const details = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=805ba841c4b106065697b6ef5ca3f7b7`);
        if (!details) return res.status(404).send({ status: false, message: 'Movie detail not found' });
        const similar = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=805ba841c4b106065697b6ef5ca3f7b7`);
        // console.log(similar.data.results);
        res.status(200).send({ status: true, data: details.data, similar: similar.data });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const publicList = async function (req, res) {
    try {
        const list = await publicMovieModel.find();
        res.status(200).send({ status: false, data: list });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

// protected route handlers :- 
const addToFav = async function (req, res) {
    try {
        const userId = req.userId;
        console.log(userId);
        const data = req.body;
        data.userId = userId;
        const movie = await movieModel.findOne({ id: data.id, userId: userId });
        if (movie) return res.status(409).send({ status: false, message: 'Movie already favorited by you' });
        const favMovie = await movieModel.create(data);
        res.status(201).send({ status: true, message: `Movie ${data.original_title} added to your favorite list` });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const deleteFav = async function (req, res) {
    try {
        const userId = req.userId;
        const movieId = req.params.movieId;
        const movieDeleted = await movieModel.findOneAndDelete({ id: movieId, userId: userId });
        if (!movieDeleted) return res.status(404).send({ status: false, message: 'movie not added to favorite or already removed' });
        res.status(200).send({ status: true, message: "Movie removed from favorite list" });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const favMovies = async function (req, res) {
    try {
        const userId = req.userId;
        const movies = await movieModel.find({ userId: userId });
        res.status(200).send({ status: true, data: movies });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const addToPublicList = async function (req, res) {
    try {
        const userId = req.userId;
        console.log(userId);
        const data = req.body;
        data.userId = userId;
        const movie = await publicMovieModel.findOne({ id: data.id });
        if (movie) return res.status(409).send({ status: false, message: 'Movie alredy in list' });
        const movieAdded = await publicMovieModel.create(data);
        res.status(201).send({ status: true, message: `Movie ${data.original_title} added to public list` });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const removeFromPublicList = async function (req, res) {
    try {
        const userId = req.userId;
        const movieId = req.params.movieId;
        const movie = await publicMovieModel.findOne({ id: movieId });
        if (!movie) return res.status(404).send({ status: false, message: 'Movie not found or already removed' });
        if (movie.userId != userId) return res.status(403).send({ status: false, message: 'You are not authorised to do this operation' });
        const removed = await publicMovieModel.findOneAndDelete({ id: movieId });
        if (!removed) return res.status(404).send({ status: false, message: 'Movie not found or already removed' });
        res.status(200).send({ staus: false, message: 'movie removed from public list' });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

module.exports = { popularMovies, upcomingMovies, topRatedMovies, nowPlayingMovies, movieDetails, addToFav, favMovies, deleteFav, publicList, addToPublicList, removeFromPublicList };
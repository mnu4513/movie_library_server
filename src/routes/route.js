const express = require('express');
const router = express.Router();

const {  authentication } = require('../middlewares/auth');

const { createUser, loginUser } = require('../controllers/userController');
router.post('/register-user',  createUser);
router.post('/login-user',  loginUser);

const {popularMovies, upcomingMovies, topRatedMovies, movieDetails, addToFav, nowPlayingMovies, favMovies, deleteFav, publicList, addToPublicList, removeFromPublicList} = require('../controllers/movieController');

// open movies routes :-
router.get('/popular-moives/:page', popularMovies);
router.get('/upcoming-moives', upcomingMovies);
router.get('/top-rated-movies', topRatedMovies);
router.get('/now-playing-movies', nowPlayingMovies);
router.get('/movie-details/:movieId', movieDetails);
router.post('/public-list', publicList);

// protected movies routes :-
router.post('/add-to-fav/:movieId', authentication, addToFav);
router.post('/fav-movies', authentication, favMovies);
router.delete('/remove-fav/:movieId', authentication, deleteFav);
router.post('/add-to-public/:movieId', authentication, addToPublicList);
router.delete('/remove-public/:movieId', authentication, removeFromPublicList);

module.exports = router;
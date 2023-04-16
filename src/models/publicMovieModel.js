const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const movieSchema = new mongoose.Schema({
    adult: {
        type: Boolean
    }, 
    backdrop_path: {
        type: String
    },
    belongs_to_collection: {
        type: Object
    }, 
    budget: {
        type: Number
    }, 
    genres: {
        type: [Object]
    }, 
    homepage: {
        type: String
    }, 
    id: {
        type: Number,
        required: true,
        unique: true
    }, 
    imdb_id: {
        type: String
    }, 
    original_language: {
        type: String
    }, 
    roginal_title: {
        type: String
    }, 
    overview: {
        type: String
    }, 
    popularity: {
        type: Number
    }, 
    poster_path: {
        type: String
    }, 
    production_companies: {
        type: [Object]
    }, 
    production_countries: {
        type: [Object]
    }, 
    release_date: {
        type: String
    }, 
    revenue: {
        type: Number
    }, 
    runtime: {
        type: Number
    }, 
    spoken_languages: {
        type: [Object]
    }, 
    status: {
        type: String
    }, 
    tagline: {
        type: String
    }, 
    title: {
        type: String
    }, 
    video: {
        type: Boolean
    }, 
    vote_average: {
        type: Number
    }, 
    vote_count: {
        type: Number
    }, 
    userId: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Public-movie', movieSchema);
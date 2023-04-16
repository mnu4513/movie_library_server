const express = require('express');
const app = express();
app.use(express.json());

const cookiePraser = require('cookie-parser');
app.use(cookiePraser());

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://mnu4513:1234qwer@firstcluster.daae6aq.mongodb.net/movie_library', {useNewUrlParser: true})
.then(() => console.log('mongoDB connected'))
.catch(err => console.log(err.message));

const route = require('./routes/route.js');
app.use('/', route);

app.listen(process.env.PORT || 3002, function () {
    console.log('app is running at port ' + (process.env.PORT || 3002))
});
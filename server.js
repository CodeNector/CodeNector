const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

// - Danny
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

//connect to the db - Danny -
mongoose.connect('mongodb://localhost/CodeNector');
const db = mongoose.connection;



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);



io.on('connection', socket => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('room', data => socket.join(data.room));

	socket.on('leave room', data => {
		socket.leave(data.room);
	});

	socket.on('coding event', data => {
		socket.broadcast.to(data.room).emit('receive code', data);
	});

});

// app.post('/login', passport.authenticate('local'), function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

server.listen(PORT, function() {
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});


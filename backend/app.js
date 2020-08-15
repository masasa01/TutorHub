const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require(`path`);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, `../frontend/build`)));
app.use(function(req, res, next) {
	res.header(`Access-Control-Allow-Origin`, `*`);
	res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
	res.header(
		`Access-Control-Allow-Headers`,
		`Origin, X-Requested-With, Content-Type, Accept`
	);

	next();
});

app.options(`*`, cors());

const uri = process.env.ATLAS_URI || `mongodb+srv://cs490:senior@cluster0-rblaj.gcp.mongodb.net/tutors?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tutorRouter = require("./routes/tutors");
const userRouter = require("./routes/users")
app.use('/api', tutorRouter);
app.use('/api', userRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../frontend/build'));

	app.get('/login', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
	});
	app.get('/signup', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
	});

	app.get('/contact', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
	});
	app.get('/posts', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
	});
	app.get('/dashboard', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
	});
  }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
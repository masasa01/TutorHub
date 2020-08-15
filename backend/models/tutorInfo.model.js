const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tutorSchema = new Schema({
    subject: String,
    location: String,
    time: String,
    postingUser: String,
    acceptingUser: String,
    jobAccepted: Boolean
}, {collection: 'tutorInfo'})

const Tutors = mongoose.model('Tutors', tutorSchema);

module.exports = Tutors;
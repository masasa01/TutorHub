const router = require('express').Router();
const Tutors = require('../models/tutorInfo.model');

router.route('/tutorInfo').get((request, response) => {
    Tutors.find()
        .then(tutorInfo => response.json(tutorInfo))
        .catch(error => response.status(400).json('Error: ' + error))
})

router.route('/addjob').post((request, response) => {
    var subject = request.body.subject;
    var location = request.body.location;
    var time = request.body.time;
    var postingUser = request.body.postingUser;
    var acceptingUser = null;
    var jobAccepted = false;

    const newTutorSchema = new Tutors({
        subject,
        location,
        time,
        postingUser,
        acceptingUser,
        jobAccepted
    })

    newTutorSchema.save()
    .then(() => response.json("Post Successful"))
    .catch(error => response.status(400).json("Error: " + error));
})

router.route('/acceptJob').post((request, response) => {
    Tutors.findOne({
        subject: request.body.subject,
        location: request.body.location,
        time: request.body.time,
        postingUser: request.body.postingUser
    })
        .then(tutorPost => {
            tutorPost.acceptingUser = request.body.acceptingUser;
            tutorPost.jobAccepted = true;

            tutorPost.save()
                .then(() => response.json('Job accepted!'))
                .catch(error => response.status(400).json('Error: ' + error));
        })
        .catch(error => response.status(400).json('Error: ' + error));
})

router.route('/dropJob').post((request, response) => {
    Tutors.findOne({
        subject: request.body.subject,
        location: request.body.location,
        time: request.body.time,
        postingUser: request.body.postingUser,
        acceptingUser: request.body.acceptingUser
    })
        .then(tutorPost => {
            tutorPost.acceptingUser = "";
            tutorPost.jobAccepted = false;

            tutorPost.save()
                .then(() => response.json('Job dropped!'))
                .catch(error => response.status(400).json('Error: ' + error));
        })
        .catch(error => response.status(400).json('Error: ' + error));
})

router.route('/dropUser').post((request, response) => {
    Tutors.findOne({
        subject: request.body.subject,
        location: request.body.location,
        time: request.body.time,
        postingUser: request.body.postingUser,
        acceptingUser: request.body.acceptingUser
    })
        .then(tutorPost => {
            tutorPost.acceptingUser = null;
            tutorPost.jobAccepted = false;

            tutorPost.save()
                .then(() => response.json('Job dropped!'))
                .catch(error => response.status(400).json('Error: ' + error));
        })
        .catch(error => response.status(400).json('Error: ' + error));
})

router.route('/accepted').get((request, response) => {
    Tutors.find({jobAccepted: true, acceptingUser: request.query.acceptingUser})
        .then(tutorPost => response.json(tutorPost))
        .catch(response => response.status(400).json('No Accepted Jobs Found'))
})

router.route('/available').get((request, response) => {
    Tutors.find({jobAccepted: false, postingUser: { $ne: request.query.postingUser } })
        .then(tutorPost => response.json(tutorPost))
        .catch(response => response.status(400).json('No Jobs currently Available'))
})

router.route('/created').get((request, response) => {
    Tutors.find({postingUser: request.query.postingUser})
        .then(tutorPost => response.json(tutorPost))
        .catch(response => response.status(400).json('No Created Jobs Found'))
})

router.route('/previous').get((request, response) => {
    Tutors.find({ $or: [{postingUser: request.query.postingUser}, {acceptingUser: request.query.acceptingUser} ]})
        .then(tutorPost => response.json(tutorPost))
        .catch(response => response.status(400).json('You have not accepted any jobs'))
})

module.exports = router;
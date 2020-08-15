const CryptoJS = require("crypto-js");
const router = require("express").Router();
const Users = require("../models/users.model");

router.route('/userData').get((request, response) => {
    Users.find({email: request.query.email})
        .then(userInfo => response.json(userInfo))
        .catch(error => response.status(400).json('Error: ' + error))
})

router.route("/adduser").post((request, response) => {
  var salt = CryptoJS.lib.WordArray.random(128 / 8);
  var username = request.body.username;
  var email = request.body.email;
  var proficiency = request.body.proficiency;
  var plaintext_password = request.body.password;
  var password = CryptoJS.SHA256(plaintext_password, salt);

  const newUserSchema = new Users({
    username,
    email,
    password,
    proficiency,
    salt
  });

  newUserSchema.save()
    .then(() => response.json("Post Successful"))
    .catch(error => response.status(400).json("Error: " + error));
});

//TODO: Verify login.

router.route("/verify").get((request, response) => {
  

  Users.findOne({email: request.query.email}), function(error, userData) {
    if (error) {
      response.json("Error: " + error)
    } else if (!userData) {
      response.json("User does not exist")
    } else {
      var salt = userData.salt;
      var hashed_password = CryptoJS.SHA256(request.query.password, salt)

      if (userData.password == hashed_password) {
        response.json(userData)
      }
    }
  }

});

module.exports = router;

const express = require('express');
const router = express.Router();


// router.get('/profile', isLoggedIn, (req, res) => {
//   db.artifact.findAll({
//     where: {
//       userId: req.user.id,
//     }
//   }).then((artifacts) => {
//     let artifactList = JSON.stringify(artifacts)
//     let artifactInfo = JSON.parse(artifactList)
//     res.render('profile', {savedArtifacts: artifactInfo})
//   }).catch(error => {
//     console.log(error)
//   })
// })


// Export the Routes
module.exports = router
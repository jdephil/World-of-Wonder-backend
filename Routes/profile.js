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

// Show profile page
router.get('/', (req, res) => {
  res.send('Look at all your cool items')
})

// Show info about a specific artifact 
router.get('/:id', (req, res) => {
  res.send("Congrats! You arrived at a page about an artifact!")
})

//Edit a saved artifact
router.put('/:id', (req, res) => {
  res.send("let's edit our artifact's name and info")
})

//Delete a saved artifact
router.delete('/:id', (req, res) => {
  res.send("You just deleted your artifact")
})

router.get('/')


// Export the Routes
module.exports = router
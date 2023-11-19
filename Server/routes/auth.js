const express = require('express');
const router = express.Router();
const {signout, signup,signin, isSignedIn} = require('../controllers/auth')


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/testroute',isSignedIn,(req,res) => {
    res.json(req.auth);
});

module.exports = router;
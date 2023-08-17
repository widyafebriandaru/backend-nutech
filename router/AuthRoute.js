const express = require ("express");
const {login, logOut, me} = require("../controllers/Auth.js");

const router = express.Router();

router.get('/me', me);
router.post('/login', login);
router.delete('/logout', logOut);

module.exports = router;
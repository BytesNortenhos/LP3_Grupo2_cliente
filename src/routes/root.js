const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home.ejs');
});

module.exports = router;
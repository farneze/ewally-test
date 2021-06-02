const router = require("express").Router();

router.get('/:any', (req, res) => {
    res.send('<h1> Invalid route </h1>');
});

router.get('/', (req, res) => {
    res.send('<h1> Invalid route </h1>');
});

module.exports = router;
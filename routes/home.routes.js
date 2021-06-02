const router = require("express").Router();

// Qualquer outra requisição que utilize o método GET cairá aqui
router.get('*', (req, res) => {
    return res.status(404).json({ 
        Error: `Route non-existent`
    });
});

module.exports = router;
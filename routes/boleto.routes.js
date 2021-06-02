const router = require("express").Router();

// Metodo get para a rota boleto
router.get('/boleto/:barcode', (req, res) => {
    try { 

        // Coleta o valor do parametro de rota 'barcode' do request
        const { barcode } = req.params;
        
        // res.send('<h1>Barcode: ' + barcode + '</h1>');
        
        // Retorna status 'OK' com as chaves e valores do cod. de barras
        return res.status(200).json({ 
            // barCode: `${barcode}`
            barCode: `${barcode}`,
            amount: `${barcode}`,
            expirationDate: `${barcode}` 
        });

    } catch (err) {
        return res.status(500).json({ error: `${err}` });
    }
});

module.exports = router;
const router = require("express").Router();

// Metodo get para a rota boleto
router.get('/:barcode', (req, res) => {
    try { 
        
        // Coleta o valor do parametro de rota 'barcode' do request
        const { barcode } = req.params;

        // Filtro em regex. Padrão para encontrar characteres de a-z e A-Z
        // e alguns caracteres especiais #?!@$%^&*-
        const regex = /[a-z]|[#?!@$%^&*-]/gi;

        // Verifica se o barcode passa no filtro.
        const letters = barcode.match(regex);

        // Se não houver match na filtragem anterior, letters será null
        if(letters == null){

            return res.status(200).json({ 
                // barCode: `${barcode}`
                barCode: `${barcode}`,
                amount: `${barcode}`,
                expirationDate: `${barcode}` 
            });
        } else {
            throw new Error('Código de barras não pode conter letras ou caracteres especiais');
        }


    } catch (err) {
        return res.status(500).json({ error: `${err.message}` });
    }
});

module.exports = router;
const router = require("express").Router();

// Metodo get para a rota boleto
router.get('/:codeSent', (req, res) => {
    try { 
        
        // Coleta o valor do parametro de rota 'codeSent' do request
        const { codeSent } = req.params;

        // Filtro em regex. Padrão para encontrar characteres de a-z e A-Z
        // e alguns caracteres especiais #?!@$%^&*-
        const regex = /[a-z]|[#?!@$%^&*-]/gi;

        // Verifica se 'codeSent' passa no filtro
        const letters = codeSent.match(regex);

        // Se não houver match com o filtro anterior, 'letters' será null
        // Isso significa que o código enviado contém apenas números
        if(letters == null){

            let codeSections = [...new Array(4)].map((el, i)=> codeSent.substring(i*12, (i+1)*12));
            
            console.log(codeSections);

            return res.status(200).json({ 
                barCode: `${codeSent}`,
                amount: `${codeSent}`,
                expirationDate: `${codeSent}` 
            });
        } else {
            throw new Error('Código de barras não pode conter letras ou caracteres especiais');
        }

        


    } catch (err) {
        return res.status(500).json({ error: `${err.message}` });
    } // 400 para linha invalida
});

// function dac10(code){
//     code.reverse();
    
// }

// function dac11(code){
    
// }

module.exports = router;
const router = require("express").Router();
const boleto = require("../scripts/boleto.js");

// const receivedCode = '826300000005714500971490320059321911725107210124';
// const receivedCode = '21290001192110001210904475617405975870000002000';

// const day1 = new Date("07/03/2000");
// const today = Date.now();
// const diff = (today - day1) / (1000 * 3600 * 24);
// const fator = diff + 999

// Metodo get para a rota boleto
router.get('/:receivedCode', (req, res) => {
    try { 
        
        // Coleta o valor do parametro de rota 'receivedCode' do request
        const { receivedCode } = req.params;

        // Filtro em regex. Padrão para encontrar characteres de a-z e A-Z
        // e alguns caracteres especiais #?!@$%^&*-
        const regex = /[a-z]|[#?!@$%^&*-]/gi;

        // Verifica se 'receivedCode' passa no filtro
        const letters = receivedCode.match(regex);

        // Se não houver match com o filtro anterior, 'letters' será null
        // Isso significa que o código enviado contém apenas números
        let code44, amount, expDate;

        if(letters == null){
            if ( receivedCode.length == 48 ){

                code44 = boleto.verify48(receivedCode).join('');

                if (code44 != false){
                    amount = Number.parseFloat(code44.substring(4, 15))/100;
                    expDate = code44.substring(19, 28);
                } else {
                    throw new Error('Código inválido. Falha nos dígitos de validação.');
                }
                
            } else if ( receivedCode.length == 47 ){
                
                code44 = boleto.verify47(receivedCode).join('');
            
                if (code44 != false){
                    amount = Number.parseFloat(code44.substring(10, 19))/100;
                    expDate = code44.substring(19, 28);
                } else {
                    throw new Error('Código inválido. Falha nos dígitos de validação.');
                }
            
            } else {
                throw new Error('Código do boleto não reconhecido');
            }

            return res.status(200).json({ 
                barCode: `${code44}`,
                amount: `${amount.toFixed(2)}`,
                expirationDate: `${expDate}`
            });
        } else {
            throw new Error('O código do boleto não pode conter letras ou caracteres especiais');
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: `${err.message}` });
    } // 400 para linha invalida
});

module.exports = router;
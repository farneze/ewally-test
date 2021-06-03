const router = require("express").Router();
const boleto = require("../scripts/boleto.js");

// Metodo get para a rota boleto
router.get('/:receivedCode', (req, res) => {
    try { 
        
        let code44, amount, expDate, factor;

        // Coleta o valor do parametro de rota 'receivedCode' do request
        const { receivedCode } = req.params;

        // Filtro em regex. Padrão para encontrar characteres de a-z e A-Z
        // e caracteres especiais mais comuns
        const regex = /[a-z]|[#?!@$%^&*-]/gi;

        // Verifica se 'receivedCode' passa no filtro
        const letters = receivedCode.match(regex);

        // Se não houver match com o filtro anterior, 'letters' será null
        // Isso significa que o código enviado contém apenas números
        if(letters == null){
            const jsonObject = {};
            if ( receivedCode.length == 48 ){
                // Verifica validade do código do boleto
                code44 = boleto.verify48(receivedCode).join('');

                if (code44 != false){

                    // Separa, do código do boleto, o valor do mesmo
                    amount = Number.parseFloat(code44.substring(4, 15))/100;

                    const date = code44.substring(20, 28);

                    const year = date.substring(0, 4)
                    const month = date.substring(4, 6)
                    const day = date.substring(6, 8)

                    if (!(year < 2000 || year > 2050)&&
                        !(month <= 1 || month >= 12)&&
                        !(day <= 1 || day >= 31)){
                        expDate = [ year, '-', month, '-', day].join('');
                    }
                    
                } else {
                    throw new Error('Código inválido. Falha nos dígitos de validação.');
                }

            } else if ( receivedCode.length == 47 ){
                // Verifica validade do código do boleto
                code44 = boleto.verify47(receivedCode).join('');

                if (code44 != false){

                    // Separa, do código do boleto, o valor do mesmo
                    amount = Number.parseFloat(code44.substring(10, 19))/100;

                    factor = code44.substring(5, 9);
                    
                    // Converte a soma do dia 1 do fator com o fator do boleto em unixtime
                    // e extrai a string da data
                    const day1 = new Date("07/03/2000");
                    const unixDate = day1.getTime() + (factor - 1000) * (1000 * 3600 * 24);
                    const finalDate = new Date(unixDate);
                    
                    expDate = finalDate.toISOString().split('T')[0];
                    
                } else {
                    throw new Error('Código inválido. Falha nos dígitos de validação.');
                }
            
            } else {
                throw new Error('Código do boleto não reconhecido');
            }

            // Concatena os dados em um objeto json
            jsonObject.barCode = code44;
            jsonObject.amount = amount.toFixed(2);
            jsonObject.expDate = expDate;

            return res.status(200).json(jsonObject);
        } else {
            throw new Error('O código do boleto não pode conter letras ou caracteres especiais');
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: `${err.message}` });
    }
});

module.exports = router;
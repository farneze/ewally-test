module.exports = {
    
    verify47: function (receivedCode) {


        let codeSections = [ receivedCode.substring(0,10),
                            receivedCode.substring(10,21),
                            receivedCode.substring(21,32),
                            receivedCode.substring(32,33),
                            receivedCode.substring(33,48) ];

        let conditions = [];
        
        let dac10Codes = [ ...codeSections ];
        dac10Codes.pop();
        dac10Codes.pop();

        let [ sequences, digits ] = this.separateCodeVD(dac10Codes);

        conditions = dac10Codes.map((el, i) => this.dac10(sequences[i], digits[i]));

        let barCode =[ receivedCode.substring(0,4),
                    receivedCode.substring(32,33),
                    receivedCode.substring(33,48),
                    receivedCode.substring(4,9),
                    receivedCode.substring(10,20),
                    receivedCode.substring(21,31) ];

        barCode = barCode.join('')
                        .split('')
                        .map(el => Number(el) )
                        .reverse();

        conditions.push(this.dac11(barCode.filter((el, i) => i != 39), codeSections[3]));

        // barCode = barCode.splice(39,0,).reverse();
        if (conditions.every(el => el == true)){
            return barCode.reverse();
        } else {
            return false;
        }
    },

    verify48: function (receivedCode) {
        let codeSections = [...new Array(4)].map((el, i)=> receivedCode.substring(i*12, (i+1)*12));

        // Inicializa uma variavel para armazenar bools das checagens
        let conditions = [];

        let [ sequences, digits ] = this.separateCodeVD(codeSections);

        // Remove 4º dígito da sequencia ao mesmo tempo em que o adiciona a uma variavel
        let barCode = sequences.flat();
        let barCodeDigit = barCode.splice(3,1);

        // Inicializa DV do codigo inteiro
        let barCodeVerifier;

        // Coleta algarismo para verificar se utilizara dac10 ou dac11
        const dacAlgorism = barCode[2];

        // Aplica dac10 ou dac11 para cada sequencia e verifica validade da mesma
        if(dacAlgorism == 6 || dacAlgorism == 7){
            conditions = codeSections.map((el, i) => this.dac10(sequences[i], digits[i]));
            barCodeVerifier = this.dac10(barCode, barCodeDigit)

        } else if(dacAlgorism == 8 || dacAlgorism == 9) {
            conditions = codeSections.map((el, i) => dac11(sequences[i], digits[i]));
            barCodeVerifier = this.dac11(barCode, barCodeDigit)
        } else {
            return false;
        }

        // Adiciona o bool o array
        conditions.push(barCodeVerifier);

        // Devolve o DV para o barCode
        barCode.splice(3,0,barCodeDigit.flat());

        // Apos a verificacao de cada um dos 4 campos e do DV geral
        // Retorna 'true' se todas passaram na verificacao
        if (conditions.every(el => el == true)){
            return barCode;
        } else {
            return false;
        }
    },


    dac10: function (sequence, digit){
        const multiplierArr = [2, 1];

        const sum = [...sequence].reverse().reduce((acc,val,i) => acc + sumN(val*multiplierArr[i%2]), 0);
        
        const remainder = sum%10;
        let total = remainder == 0 ? 0 : 10-remainder;
        
        return total == digit ? true : false;

        function sumN(value){
            return value.toString(10).split('').reduce((acc,val)=> acc + Number(val), 0);
        }
    },

    dac11: function (sequence, digit){
        const multiplierArr= [2, 3, 4, 5, 6, 7, 8, 9];

        let sum = [...sequence].reduce((acc,val,i)=> acc + val*multiplierArr[i%8], 0);

        const remainder = sum%11;

        let total = remainder < 2 ? 0 : 11-remainder;

        return total == digit ? true : false;
    },

    separateCodeVD: function (codeSections) {
        // Separa digito verificador do resto
        const digits = codeSections.map( el => el.split('')
                                                .splice(el.length-1 ,1))
                                                .map(el => Number(el) );

        // Coleta os numeros sem digito verificador
        const sequences = codeSections.map( el => el.split('')
                                                    .slice(0, el.length-1)
                                                    .map(el => Number(el) ));
                                                    
        return [ sequences, digits ];
    }
};
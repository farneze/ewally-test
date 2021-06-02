const receivedCode = '826300000005714500971490320059321911725107210124';
console.log('--------');
// console.log(dac11([6, 9, 8, 7, 6, 0, 0, 3, 2, 1, 0], 0))

const multiplierArr= [2, 3, 4, 5, 6, 7, 8, 9];
//[...new Array(14)].forEach((el,i) => console.log());

if ( receivedCode.length == 48 ){
    let codeSections = [...new Array(4)].map((el, i)=> receivedCode.substring(i*12, (i+1)*12));

    if (verify48(codeSections)){
        console.log("YEY");
    } else {
        // TODO COLOCAR ERRO
    }
    
} else if ( receivedCode.length == 47 ){

} 


function verify48(codeSections) {
    // Inicializa uma variavel para armazenar bools das checagens
    let conditions = [];

    // separa digito verificador do resto
    const digits = codeSections.map( el => el.split('')
                                          .splice(11,1)); 

    // coleta os numeros sem digito verificador
    const sequences = codeSections.map( el => el.split('')
                                              .slice(0,11)
                                              .map(el => Number(el) ));
    

    // Separa 4º digito do codigo (DV geral) e concatena ultima sequencia para ultima verificacao
    let fullCode = sequences.flat();

    // Remove 4º dígito da sequencia ao mesmo tempo em que adiciona a uma variavel
    let fullCodeDigit = fullCode.splice(3,1); 

    // Inicializa DV do codigo inteiro
    let fullCodeVerifier;

    // Coleta algarismo para verificar se utilizara dac10 ou dac11
    const dacAlgorism = fullCode[2];
    
    // Aplica dac10 ou dac11 para cada sequencia e verifica validade da mesma
    if(dacAlgorism == 6 || dacAlgorism == 7){
        conditions = codeSections.map((el, i) => dac10(sequences[i], digits[i]));
        fullCodeVerifier = dac10(fullCode, fullCodeDigit)

    } else if(dacAlgorism == 8 || dacAlgorism == 9) {
        conditions = codeSections.map((el, i) => dac11(sequences[i].reverse(), digits[i]));
        fullCodeVerifier = dac11(fullCode, fullCodeDigit)
    } else {
        return false; // TODO COLOCAR ERRO
    }

    // Adiciona o bool o array
    conditions.push(fullCodeVerifier);

    // Apos a verificacao de cada um dos 4 campos e do DV geral
    // Retorna 'true' se todas passaram na verificacao
    return conditions.every(el => el == true);
}


function dac10(sequence, digit){
    const sum = sequence.reduce((acc,val,i)=> i%2 == 0? acc + sumN(val*2) : acc+val,0);
    
    const remainder = sum%10;   
    let total = remainder == 0 ? 0 : 10-remainder;
    
    return total == digit ? true : false;
}

function dac11(sequence, digit){
    const multiplierArr= [2, 3, 4, 5, 6, 7, 8, 9];
    let sum = sequence.reduce((acc,val,i)=> acc + val*multiplierArr[i%8], 0);

    const remainder = sum%11;
    let total = remainder <= 2 ? 0 : 11-remainder;

    return total == digit ? true : false;
}

function sumN(value){

    return value.toString(10).split('').reduce((acc,val)=> acc + Number(val), 0);
}



// public String valida(valor) {

//     if (tamanho == 44) { //Provavelmente é código de barras
//       if (primeirodigito == 8) { //Provavelmente código de arrecadação
//         if (é um código de barras válido para arrecadação) {
//           return "Código de Barras Arrecadação";
//         }
//       }
//       //Se não começa com 8, ou se não era válido, tentamos como boleto
//       if (é um código de barras válido para boleto) {
//         return "Código de Barras Boleto";
//       }
//     }


//     //Se o tamanho não é 44, ou se falhou em validar como código de barras, vamos processar como representação numérica
//     //A primeira é a representação de arrecadação, que é sempre fixa e é a maior
//     if (tamanho == 48) {
//       if (valida representação numérica de arrecadação) {
//         return "Representação numérica de arrecadação";
//       }
//     } else if (tamanho >= 33 && tamanho <= 47) {
//       //Se o tamanho está entre os tamanhos que a representação numérica do boleto pode ter, validamos para verificar
//       if (valida representação numérica de boleto) {
//         return "Representação numérica de boleto";
//       }
//     }

//     throw "Valor não reconhecido!";
// }
const receivedCode = '826300000005714500971490320059321911725107210124';
console.log('--------');

if ( receivedCode.length == 48 ){
    let codeSections = [...new Array(4)].map((el, i)=> code.substring(i*12, (i+1)*12));

    if (verify(codeSections)){

    } else {
        // show error
    }
    
} else if ( receivedCode.length == 47 ){

} else if ( receivedCode.length == 44 ){

}


function verify(codeSections) {
    
    let verifier = [];

    // separa digito verificador do resto
    let digits = codeSections.map( el => el.split('')
                                          .splice(11,1)); 

    let sequences = codeSections.map( el => el.split('')
                                              .slice(0,11)
                                              .map(el => Number(el) ));

    if(codeSections[1][3] == 6 || codeSections[1][3] == 7){
        
        verifier = codeSections.map(el => dac10(el));

    } else if(codeSections[1][3] == 8 || codeSections[1][3] == 9) {

        verifier = codeSections.map(el => dac11(el));

    } else {
        return false;
    }
    
    return verifier.every(el => el == true);
}


function dac10(sequence, digit){
    const sum = sequence.reduce((acc,val,i)=> i%2 == 0? acc + sumN(val*2) : acc+val,0);
    const remainder = sum%10;   

    let total = remainder == 0 ? 0 : 10-remainder;
    
    return total == digit ? true : false;
}

function dac11(sequence){
    const multiplierArr= [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4];
    let sum = sequence.split('')
                     .slice(0,11)
                     .map(el => Number(el) )
                    //  .map((el,i)=> i%2 == 0? (el*2)%9 : el);
                     .reduce((acc,val,i)=> acc + val*multiplierArr[i]);
    return
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
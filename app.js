//declaracion de las variables inciales que usa el juego
let numeroSecreto = 0;
let intentos = 0;
//aqui vamos a declarar la lista de numeros que se utilizaran para llevar control de los numeros sorteados en el juego
let listaNumerosSorteados = [];
//aca ponemos el rango de numeros que se tomaran para el juego
let numeroMaximo= 10;
//colocacion de titulo e instrucciones de inicio iniciando el juego
condicionesIniciales();
console.log(numeroSecreto);

//funcion que edita el texto de instrucciones por situacion
function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //el usuario acerto
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el numero secreto en ${intentos} ${(intentos===1) ?'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //el usuario no acerto
        if (numeroDeUsuario>numeroSecreto) {
            asignarTextoElemento('p','El numero secreto es menor');
        }else {
            asignarTextoElemento("p","El numero secreto es mayor");
        }
        //se cuentan los intentos cuando no acierta el usuario y se limpian los valores para segui intentando
        intentos++;
        limpiarCaja();
    }
    return;
}

//dejar la caja limpia en automatico para el usuario
function limpiarCaja(){
  document.querySelector('#valorUsuario').value ='';
}

//generar el numero secreto para el usuario
function generarNumeroSecreto() {
    //aca se guarda los numeros generados
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //si ya sorteamos todos los numeros
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya jugaste todos los numeros posibles :)')
    }else {
        //si el numero generado ya esta incluido en la lista
         if (listaNumerosSorteados.includes(numeroGenerado)){
        //aca se llama asi misma la funcion para generar un nuevo numero, las funciones se pueden a llamar a si mismas, es decir, recursividad
        return generarNumeroSecreto ();
        } else {
        //aca en caso de que el numero no este incluido en la lista
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
         }
    }
    
}
//funcion que establece las condiciones iniciales del juego 
function condicionesIniciales (){
    asignarTextoElemento('h1', 'Juego numero secreto');
    asignarTextoElemento('p',`Bienvenide al juego del Número Secreto. Para comenzar indica dentro del recuadro un número entre 1 y ${numeroMaximo}.`);    
    numeroSecreto=generarNumeroSecreto();
    intentos=1;
}

function reiniciarJuego(){
    //esto limpiara la caja 
    limpiarCaja();
    //creara un nuevo numero secreto reiniciando todo indicando las instrucciones de nuevo
    //y ademas reiniciar el conteo de intentos y desabilitar el boton despues
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');

}



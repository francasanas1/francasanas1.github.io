
const pelota = document.getElementById('pelota');

let puntos = 0;
let tiempo = 60;


function sumarPuntos() {

    if (puntos === 15) {
        alert('Ganaste');
        tiempo=61;
        puntos=0;
        return;
    }
    moverPunto();

    crearPelotaNegra();

    puntos++;   
}

function moverPunto(){

    document.getElementById('puntos').innerHTML = 'Puntos: ' + puntos;
    numeroRandom = Math.round(Math.random() * 500);
    numeroRandom2 = Math.round(Math.random() * 500);
    document.getElementById('pelota').style.marginTop = numeroRandom + "px";
    document.getElementById('pelota').style.marginLeft = numeroRandom2 + "px";
}


let contenedor = document.querySelector('.contenedor');


function perder() {
    puntos = 0;
    alert('Perdiste');
    tiempo = 61;
    return;
}

pelota.addEventListener('mouseover', sumarPuntos);

function restarTiempo() {
    tiempo--;
    document.getElementById('tiempo').innerHTML = 'Tiempo: ' + tiempo;
    if (tiempo === 0) {
        alert('Perdiste');
        tiempo = 61;
    }
}

setInterval(restarTiempo, 1000);

function crearPelotaNegra() {
    const pelotaNegra = document.createElement('div');
    pelotaNegra.setAttribute("class", "pelotanegra");

    numeroRandom3 = Math.round(Math.random() * 500);
    numeroRandom4 = Math.round(Math.random() * 500);

    pelotaNegra.style.marginTop = numeroRandom3 + "px";
    pelotaNegra.style.marginLeft = numeroRandom4 + "px";

    contenedor.append(pelotaNegra);
    pelotaNegra.addEventListener('mouseover', perder);
}

const iniciar = document.getElementById('iniciar');

iniciar.addEventListener("click", inicioJuego)

const juego = document.getElementById('juego');

const registro = document.getElementById('registro');

function inicioJuego (){
    juego.style.display = "block";
    registro.style.display = "none";
    nombre.innerHTML = username;
    // puntuacion1.innerHTML = puntuacion;

}
let nombreUsuario = localStorage.getItem('nombreUsuario');
let puntuacion1 = localStorage.getItem('puntuacion1');

const username = document.querySelector('#username');
const puntos1 = document.querySelector('#puntos');

const nombre = document.querySelector('#nombre');
const puntuacion = document.querySelector('#puntuacion');



registro.addEventListener('submit',(e) =>{
    e.preventDefault();
    nombreUsuario = username.value;
    puntuacion1 = puntos1.value;

    localStorage.setItem('nombreUsuario', username.value);
    localStorage.setItem('puntuacion1', puntos1.value);
    inicioJuego();

})

lst =localStorage.getItem('nombreUsuario');
console.log(typeof(lst));

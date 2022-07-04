
const pelota = document.getElementById('pelota');
let contenedor = document.querySelector('.contenedor');
const iniciar = document.getElementById('iniciar');
const juego = document.getElementById('juego');
const registro = document.getElementById('registro');
const username = document.querySelector('#username');
const puntos1 = document.querySelector('#puntos');
const nombre = document.querySelector('#nombre');
const puntuacion = document.querySelector('#puntuacion');
const jugarDeNuevo = document.getElementById('jugarDeNuevo');


let puntos = 0;
let tiempo = 60;

function moverPunto() {

    document.getElementById('puntos').innerHTML = 'Puntos: ' + puntos;
    numeroRandom = Math.round(Math.random() * 500);
    numeroRandom2 = Math.round(Math.random() * 500);
    document.getElementById('pelota').style.marginTop = numeroRandom + "px";
    document.getElementById('pelota').style.marginLeft = numeroRandom2 + "px";
}

function perder() {
    alert('Perdiste, "Aceptar" para jugar de nuevo');
    puntos = 0;
    tiempo = 60;
    return;
}

function crearPelotaNegra() {

    const pelotaNegra = document.createElement('div');
    
    pelotaNegra.setAttribute("class", "pelotanegra");

    numeroRandom3 = Math.round(Math.random() * 500);
    numeroRandom4 = Math.round(Math.random() * 500);

    pelotaNegra.style.marginTop = numeroRandom3 + "px";
    pelotaNegra.style.marginLeft = numeroRandom4 + "px";

    contenedor.append(pelotaNegra);
    tocarPelota = pelotaNegra.addEventListener('mouseover', perder);

}


function sumarPuntos() {

    if (puntos === 15) {
        alert('Ganaste');
        puntos = 0;
        tiempo = 60;
    }
    moverPunto();

    crearPelotaNegra();

    puntos++;
}


function restarTiempo() {
    tiempo--;
    document.getElementById('tiempo').innerHTML = 'Tiempo: ' + tiempo;
    if (tiempo === 0) {
        alert('Perdiste');
        tiempo = 61;
    }
}

function inicioJuego() {
    juego.style.display = "grid";
    registro.style.display = "none";
    nombre.innerHTML = `${localStorage.getItem('nombreUsuario')}`;
    // puntuacion1.innerHTML = puntuacion;
    // let nombreUsuario = localStorage.getItem('nombreUsuario');
    // let puntuacion1 = localStorage.getItem('puntuacion1');
}


pelota.addEventListener('mouseover', sumarPuntos);
setInterval(restarTiempo, 1000);



registro.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombreUsuario = username.value;
    let puntuacion1 = puntos1.value;

    localStorage.setItem('nombreUsuario', nombreUsuario);
    localStorage.setItem('puntuacion1', puntuacion1);
    inicioJuego();
    // agregarFila();

})

// lst =localStorage.getItem('nombreUsuario');
// console.log(typeof(lst));

// const tablaPuntuacion = document.querySelector('#tablaPuntuacion');

// function agregarFila() {
//     let tr = document.createElement('tr');
//     let td = document.createElement('td');
//     tr.appendChild(td);
//     let td1 = document.createElement('td');
//     tr.appendChild(td1);

//     document.getElementById('tablaPuntuacion').appendChild(tr);
// }


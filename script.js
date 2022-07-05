
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

pelota.addEventListener('mouseover', sumarPuntos);

function moverPunto() {

    document.getElementById('puntos').innerHTML = 'Puntos: ' + puntos;
    numeroRandom = Math.round(Math.random() * 500);
    numeroRandom2 = Math.round(Math.random() * 500);
    document.getElementById('pelota').style.marginTop = numeroRandom + "px";
    document.getElementById('pelota').style.marginLeft = numeroRandom2 + "px";
}

function perder() {
    alert('Perdiste, "Aceptar" para jugar de nuevo');
    guardarPuntacion();

    reiniciarJuego();
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
    pelotaNegra.addEventListener('mouseover', perder);

}


function sumarPuntos() {

    if (puntos === 15) {
        alert('Ganaste');
        guardarPuntacion();
        reiniciarJuego();
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
    // nombre.innerHTML = `${localStorage.getItem('nombreUsuario')}`;
    setInterval(restarTiempo, 1000);
}

function reiniciarJuego() {
    puntos = 0;
    tiempo = 60;

    removeElementsByClass('pelotanegra');

}

function guardarPuntacion(name, puntuation) {
    let nombreUsuario = username.value;

    let obj = {
        usuario: name,
        puntuacion: puntuation,
    };

    const {usuario, puntuation} = obj;
    //  DESESTRUCTURACIÓN

    obj.sort((a, b) => {
        if (a.puntuation < b.puntuation) {
            return 1;
        }
        if (a.edad > b.edad) {
            return -1;
        }
        return 0;
    });
    // No se si funciona
    

    let textoGuardado = localStorage.getItem('nombreUsuario');

    //Si no hay algo almacenado, almaceno por primera vez.
    // if (textoGuardado == undefined) {
    //     localStorage.setItem('usuarios', JSON.stringify([obj]))

    //     return
    // }

    textoGuardado == undefined && localStorage.setItem('usuarios', JSON.stringify([obj]));
    // OPERADOR AND


    array = JSON.stringify(textoGuardado);
    array.push(obj);

    let json = JSON.stringify(array)


    localStorage.setItem('usuarios', json)
}

function llenarTablaConDatosGuardados() {
    let json = localStorage.getItem('usuarios');
    let array = JSON.parse(json);

    array.forEach(obj => agregarFila(obj.usuario, obj.puntuation))
    //  DESESTRUCTURACIÓN
}






registro.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombreUsuario = username.value;
    let puntuacion1 = puntos1.value;

    localStorage.setItem('nombreUsuario', nombreUsuario);
    localStorage.setItem('puntuacion1', puntuacion1);
    inicioJuego();

})


function agregarFila(nombre, puntuacion) {
    let tabla = document.getElementById('tablaPuntuacion');

    let tr = document.createElement('tr');

    let elementoNombre = document.createElement('td');
    let elementoPuntacion = document.createElement('td');

    elementoNombre.innerText = nombre;
    elementoPuntacion.innerText = puntuacion;

    tr.appendChild(elementoNombre);
    tr.appendChild(elementoPuntacion);

    tabla.appendChild(tr);
}


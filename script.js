
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
var pelotaNegra;
var nombreUsuario;
var puntuacion1;
var elementoNombre;
var elementoPuntacion;
let puntosGanar = 50;
var miarray = [];
var obj;

let puntos = 1;
let tiempo = 60;

pelota.addEventListener('mouseover', sumarPuntos);

function moverPunto() {

    document.getElementById('puntos').innerHTML = 'Puntos: ' + puntos;
    numeroRandom = Math.round(Math.random() * 490);
    numeroRandom2 = Math.round(Math.random() * 490);
    document.getElementById('pelota').style.marginTop = numeroRandom + "px";
    document.getElementById('pelota').style.marginLeft = numeroRandom2 + "px";
}

function perder() {
    Swal.fire({
        icon: 'error',
        title: 'Perdiste...',
        text: 'Que lastima!',
        confirmButtonText: 'Jugar de nuevo'
    }).then(() => {
        puntos = puntos - 1;
        guardarPuntacion();
        reiniciarJuego();
        agregarFila();
    })
}

function crearPelotaNegra() {

    const pelotaNegra = document.createElement('div');

    // pelotaNegra.setAttribute("class", "pelotanegra");
    pelotaNegra.classList.add("pelotanegra");

    numeroRandom3 = Math.round(Math.random() * 490);
    numeroRandom4 = Math.round(Math.random() * 490);

    pelotaNegra.style.marginTop = numeroRandom3 + "px";
    pelotaNegra.style.marginLeft = numeroRandom4 + "px";

    contenedor.append(pelotaNegra);
    pelotaNegra.addEventListener('mouseover', perder);

}


function sumarPuntos() {

    if (puntos === puntosGanar) {
        Swal.fire({
            icon: 'success',
            title: 'Ganaste!',
            text: 'Felicidades!',
            confirmButtonText: 'Jugar de nuevo'
        }).then(() => {
            guardarPuntacion();
            agregarFila();
            reiniciarJuego();
        })
    } else {

        moverPunto();
        crearPelotaNegra();
        puntos++;
    }

}


function restarTiempo() {
    tiempo--;
    document.getElementById('tiempo').innerHTML = 'Tiempo: ' + tiempo;
    if (tiempo === 0) {
        perder();
    }
}

function inicioJuego() {
    juego.style.display = "grid";
    registro.style.display = "none";
    footer.style.display = "none";
    setInterval(restarTiempo, 1000);
}

function reiniciarJuego() {
    tiempo = 60;
    puntos = 1;
    const arrayPN = Array.from(document.getElementsByClassName('pelotanegra'));
    arrayPN.forEach(pelota2 => {
        pelota2.remove(arrayPN);
    })
    document.getElementById('puntos').innerHTML = 'Puntos: 0';
}



registro.addEventListener('submit', (e) => {
    e.preventDefault();
    nombreUsuario = username.value;
    localStorage.setItem('nombreUsuario', nombreUsuario);
    inicioJuego();

})

function guardarPuntacion() {
    let puntuacion1 = puntos;
    console.log(puntuacion1);
    let textoGuardadoP = localStorage.setItem('puntuacion1', puntuacion1);
    if (textoGuardadoP == undefined) {
        let puntuacion1 = 0;
        return
    }
}


function agregarFila(nombreUsuario, puntuacion1) {
    let tabla = document.getElementById('tablaPuntuacion');

    let tr = document.createElement('tr');

    let elementoNombre = document.createElement('td');
    let elementoPuntacion = document.createElement('td');

    elementoNombre.innerText = localStorage.getItem('nombreUsuario');
    elementoPuntacion.innerText = localStorage.getItem('puntuacion1');

    // console.log(elementoNombre);
    // console.log(elementoPuntacion);

    tr.appendChild(elementoNombre);
    tr.appendChild(elementoPuntacion);

    tabla.appendChild(tr);
}

function guardarPuntacion1() {

    // var obj = { nombreUsuario, puntuacion1 }
    //  DESESTRUCTURACIÓN

    var nombreUsuario = username.value;
    var puntuacion1 = puntos;

    var obj = {
        usuario: nombreUsuario,
        puntuacion: puntuacion1,
    };

    miarray.push(JSON.stringify(obj));
    console.log(miarray);
    miarray.push(obj);
    console.log(obj);
    let json = JSON.stringify(miarray);
    localStorage.setItem('usuarios', json)


    // miarray.push(obj);

    // console.log(miarray);

    // localStorage.setItem('localArray', JSON.stringify(miarray));

    miarray.sort((a, b) => {
        if (a.puntuacion1 < b.puntuacion1) {
            return 1;
        }
        if (a.puntuacion1 > b.puntuacion1) {
            return -1;
        }
        return 0;
    });


}

    // let textoGuardadoP = localStorage.setItem('puntuacion1');
    // let textoGuardadoN = localStorage.getItem('nombreUsuario');

    // //Si no hay algo almacenado, almaceno por primera vez.
    // // if (textoGuardado == undefined) {
    // //     localStorage.setItem('usuarios', JSON.stringify([obj]))

    // //     return
    // // }

    // if (textoGuardadoN == undefined) {

    //     textoGuardadoN = 0;

    //     return
    // }

    // textoGuardado == undefined && localStorage.setItem('usuarios', JSON.stringify(obj));
    // // OPERADOR AND

    // console.log(typeof textoGuardadoN);


    // array = JSON.stringify(textoGuardadoN);
    // console.log(array, "soy array");
    // array.push(obj);
    // console.log(obj);
    // let json = JSON.stringify(array);
    // localStorage.setItem('usuarios', json)

    // function llenarTablaConDatosGuardados() {
//     let json = localStorage.getItem('usuarios');
//     let array = JSON.parse(json);

//     array.forEach(obj => agregarFila(obj.usuario, obj.puntuation));
//     //  DESESTRUCTURACIÓN
// }

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


let puntos = 0;
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
    })
    reiniciarJuego();
    guardarPuntacion();
    return;
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

    if (puntos === 15) {
        Swal.fire({
            icon: 'success',
            title: 'Ganaste!',
            text: 'Felicidades!',
            confirmButtonText: 'Jugar de nuevo'
        })
        guardarPuntacion();
        reiniciarJuego();
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
    // nombre.innerHTML = `${localStorage.getItem('nombreUsuario')}`;
    setInterval(restarTiempo, 1000);
    llenarTablaConDatosGuardados();
}

function reiniciarJuego() {
    tiempo = 60;
    puntos = 0;
    const arrayPN = Array.from(document.getElementsByClassName('pelotanegra'));
    arrayPN.forEach(pelota2 => {
        pelota2.remove(arrayPN);
    })
}



// function guardarPuntacion(name, puntuation) {
//     let nombreUsuario = username.value;
//     let puntuacion1 = puntuacion.value;


//     let obj = {
//         usuario: name,
//         puntuacion: puntuation,
//     };

//     const { usuario, puntuacion } = obj;
//     //  DESESTRUCTURACIÓN

//     // const miarray = [];
//     // miarray.push(obj);

//     // miarray.sort((a, b) => {
//     //     if (a.puntuacion < b.puntuacion) {
//     //         return 1;
//     //     }
//     //     if (a.puntuacion > b.puntuacion) {
//     //         return -1;
//     //     }
//     //     return 0;
//     // });
//     // No se si funciona

//     let textoGuardadoP = localStorage.setItem('puntuacion1');
//     let textoGuardadoN = localStorage.getItem('nombreUsuario');

//     //Si no hay algo almacenado, almaceno por primera vez.
//     // if (textoGuardado == undefined) {
//     //     localStorage.setItem('usuarios', JSON.stringify([obj]))

//     //     return
//     // }

//     if (textoGuardadoN == undefined) {

//         textoGuardadoN = 0;

//         return
//     }

//     textoGuardado == undefined && localStorage.setItem('usuarios', JSON.stringify(obj));
//     // OPERADOR AND

//     console.log(typeof textoGuardadoN);


//     array = JSON.stringify(textoGuardadoN);
//     console.log(array, "soy array");
//     array.push(obj);
//     console.log(obj);
//     let json = JSON.stringify(array);


//     localStorage.setItem('usuarios', json)
// }

function llenarTablaConDatosGuardados() {
    let json = localStorage.getItem('usuarios');
    let array = JSON.parse(json);

    array.forEach(obj => agregarFila(obj.usuario, obj.puntuation));
    //  DESESTRUCTURACIÓN
}


registro.addEventListener('submit', (e) => {
    e.preventDefault();
    let nombreUsuario = username.value;
    // let puntuacion1 = puntos1.value;

    localStorage.setItem('nombreUsuario', nombreUsuario);
    // localStorage.setItem('puntuacion1', puntuacion1);
    inicioJuego();

})

function guardarPuntacion() {
    let puntos1 = puntos;
    let puntuacion1 = puntos1.value;
    let textoGuardadoP = localStorage.setItem('puntuacion1', puntuacion1);
    if (textoGuardadoP == undefined) {
        let puntuacion1 = 0;
        return
    }
}


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


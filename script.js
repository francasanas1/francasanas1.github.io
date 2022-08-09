
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
var objLS;


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
        // guardarPuntacion();
        guardarLocalStorage({
            usuario: nombreUsuario,
            puntuacion: puntos
        });
        reiniciarJuego();
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
            // guardarPuntacion();
            guardarLocalStorage({
                usuario: nombreUsuario,
                puntuacion: puntos
            });
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
    cargarTabla();

}

function reiniciarJuego() {
    tiempo = 60;
    puntos = 1;
    const arrayPN = Array.from(document.getElementsByClassName('pelotanegra'));
    arrayPN.forEach(pelota2 => {
        pelota2.remove(arrayPN);
    })
    document.getElementById('puntos').innerHTML = 'Puntos: 0';
    cargarTabla();
}



registro.addEventListener('submit', (e) => {
    e.preventDefault();
    nombreUsuario = username.value;
    inicioJuego();
})

// function guardarPuntacion() {
//     let puntuacion1 = puntos;
//     console.log(puntuacion1);
//     localStorage.setItem('puntuacion1', puntuacion1);


// }


function agregarFila(nombreUsuario, puntuacion1) {
    let tabla = document.getElementById('tablaPuntuacion');

    let tr = document.createElement('tr');

    let elementoNombre = document.createElement('td');
    let elementoPuntacion = document.createElement('td');

    elementoNombre.innerText = nombreUsuario;
    elementoPuntacion.innerText = puntuacion1;

    // console.log(elementoNombre);
    // console.log(elementoPuntacion);

    tr.appendChild(elementoNombre);
    tr.appendChild(elementoPuntacion);

    tabla.appendChild(tr);
}

function guardarLocalStorage(objLS) {

    let miarray;
    let datos = localStorage.getItem('UsuariosData');

    miarray = datos === null ? [] : JSON.parse(datos);

    miarray.push(objLS);
    miarray.sort((a, b) => {
        if (a.puntuacion < b.puntuacion) {
            return 1;
        }
        if (a.puntuacion > b.puntuacion) {
            return -1;
        }
        return 0;
    });
    let miarrayJSON = JSON.stringify(miarray);
    localStorage.setItem('UsuariosData', miarrayJSON);


    // console.log(miarray);
    // miarray.push(obj);
    // console.log(obj);
    // let json = JSON.stringify(miarray);
    // localStorage.setItem('usuarios', json)


    // miarray.push(obj);

    // console.log(miarray);

    // localStorage.setItem('localArray', JSON.stringify(miarray));



}

function cargarTabla() {
    vaciarTabla();
    agregarFila('usuario', 'puntuacion');
    array = JSON.parse(localStorage.getItem('UsuariosData'));
    console.log(array);
    array.slice(0, 9).forEach(element => {
        agregarFila(element.usuario, element.puntuacion);
    });
}

function vaciarTabla() {
    let tabla = document.getElementById('tablaPuntuacion');

    while (tabla.lastChild) {
        tabla.lastChild.remove();
    }
}

function cargarFrase() {
    fetch('frases.json')
        .then(respuesta => respuesta.json())
        .then(resultados => {
            console.log(resultados.frases);
            let numeroAleatorio = Math.floor(Math.random() * resultados.frases.length);
            // console.log(resultados.frases.length);
            let frase = resultados.frases.find(frase =>{return frase.id == numeroAleatorio});
            console.log(frase.frase);
            document.getElementById('frases').innerHTML = frase.frase;
        }).catch(error => {
            alert('Error!');
        }).finally()
}

cargarFrase();

const pelota = document.getElementById('pelota');

let puntos = 0;
let tiempo = 60;
let ganar = 15;

function sumarPuntos() {
    puntos++;
    document.getElementById('puntos').innerHTML = 'Puntos: ' + puntos;
    numeroRandom = Math.round(Math.random() * 500);
    numeroRandom2 = Math.round(Math.random() * 500);
    document.getElementById('pelota').style.marginTop = numeroRandom + "px";
    document.getElementById('pelota').style.marginLeft = numeroRandom2 + "px";
    if (puntos === 15){
        alert('Ganaste');
        tiempo = 0;
    }
}

let contenedor = document.querySelector('.contenedor');

for ( puntos=0; puntos<=15; puntos++){

    const pelotaNegra = document.createElement('div');
    pelotaNegra.setAttribute("class","pelotanegra");
    numeroRandom3 = Math.round(Math.random() * 500);
    numeroRandom4 = Math.round(Math.random() * 500);
    document.getElementsByClassName('pelotaNegra').style.marginTop = numeroRandom3 + "px";
    document.getElementsByClassName('pelotaNegra').style.marginLeft = numeroRandom4 + "px";
    contenedor.append(pelotaNegra);
    
}

pelota.addEventListener('mouseover', sumarPuntos);

function restarTiempo(){
    tiempo--;
    document.getElementById('tiempo').innerHTML = 'Tiempo: ' + tiempo;
    if (tiempo === 0){
        alert('Perdiste');
        tiempo = 0;
        puntos = 0;
    }
}
    
setInterval(restarTiempo, 1000);
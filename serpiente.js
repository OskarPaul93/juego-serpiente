let intervaloSerpiente;
let direccionActual= "derecha";
let comidaX= 0;
let comidaY=0;
let puntaje= 0;
let velocidad= 300;

let musicaFondo= new Audio("fondo.mp3");
let sonidoComida= new Audio("comida.mp3");
let sonidoOver= new Audio("over.mp3");

musicaFondo.loop= true;
musicaFondo.volume= 0.4;
    
    
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA=25;

    dibujarTablero= function(){
      ctx.strokeStyle= "white";
      ctx.beginPath(); //Empieza a dibujar en canva
      ctx.moveTo (0,0); //Donde empieza a dibujar
      ctx.lineTo(100,100); //Hasta donde dibujar
      ctx.stroke(); //Pinta contorno
    }

    dibujarTablero2= function (){
      for (let i=0; i<canvas.width; i+= TAMANIO_CELDA){
        ctx.strokeStyle= "white"; 
        ctx.beginPath(); //empieza a dibujar en el canva
        ctx.moveTo(i,0);//Donde empieza a dibujar
        ctx.lineTo(i,canvas.height); //hasta donde dibujar
        ctx.stroke();
      }
      for (let i=0; i<canvas.height; i+= TAMANIO_CELDA){
        ctx.strokeStyle= "white"; 
        ctx.beginPath(); //empieza a dibujar en el canva
        ctx.moveTo(0,i);//Donde empieza a dibujar
        ctx.lineTo(canvas.width,i); //hasta donde dibujar
        ctx.stroke();
      }
    }
    
   
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

 function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero2();
      pintarSerpiente();
      pintarComida();
    }   
    
async function dibujarTablero() {
  ctx.strokeStyle = "#d84ff3";
  ctx.lineWidth = 1;
 
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
 
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}


function pintarParte (lineaX, lineaY, color){
  let valorX= lineaX*TAMANIO_CELDA;
  let valorY= lineaY*TAMANIO_CELDA;

  ctx.fillStyle =color; // para relleno a la celda
  ctx.fillRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA); //relleno
  ctx.strokeStyle = "#9d1414"; //borde
  ctx.strokeRect(valorX, valorY, TAMANIO_CELDA, TAMANIO_CELDA);
}


const serpiente= [
  {x:0, y:5},
  {x:0, y:6},
  {x:0, y:7},
  {x:0, y:8}
];

function pintarSerpiente(){
  for (let i=0 ; i<serpiente.length; i++){
    let parte = serpiente [i];
    if (i==0){pintarParte(parte.x, parte.y, "#d7d766");
    }else{
      pintarParte(parte.x, parte.y, "#189c9c");
    }
  }
}

function generarComida(){
let maximoX = canvas.width / TAMANIO_CELDA;
  let maximoY = canvas.height / TAMANIO_CELDA;
  comidaX = Math.floor(Math.random() * maximoX);
  comidaY = Math.floor(Math.random() * maximoY);
}




function pintarComida(){
  pintarParte(comidaX, comidaY, "#39ff14");
}

function atrapaComida(){
  let cabeza = serpiente[0];
  if(cabeza.x == comidaX && cabeza.y == comidaY){
      return true;
  }
  return false;
}

function crecerSerpiente(){
  let cola = serpiente[serpiente.length -1];
  let nuevaParte;
  if(direccionActual == "derecha"){
    nuevaParte = {x: cola.x -1,y: cola.y};
  }else if(direccionActual == "izquierda"){
    nuevaParte = {x: cola.x +1,y: cola.y};
  }else if(direccionActual == "arriba"){
  nuevaParte = {x: cola.x,y: cola.y +1};
  }
  else if(direccionActual == "abajo"){
    nuevaParte = {x: cola.x,y: cola.y -1};
  }
  serpiente.push(nuevaParte);
}



function moverDerecha(){
  let cabezaActual = serpiente [0];
  let nuevaCabeza = {
    x: cabezaActual.x +1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza); // Agregar una nueva cabeza al inicio
  serpiente.pop(); // Elimina la cola
  
  
}

function moverIzquierda(){
  let cabezaActual = serpiente [0];
  let nuevaCabeza = {
    x: cabezaActual.x -1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza); // Agregar una nueva cabeza al inicio
  serpiente.pop(); // Elimina la cola
  
}

function moverArriba(){
  let cabezaActual = serpiente [0];
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y -1
  };

  serpiente.unshift(nuevaCabeza); // Agregar una nueva cabeza al inicio
  serpiente.pop(); // Elimina la cola
  
}

function moverAbajo(){
  let cabezaActual = serpiente [0];
  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y+1
  };

  serpiente.unshift(nuevaCabeza); // Agregar una nueva cabeza al inicio
  serpiente.pop(); // Elimina la cola
  
}
  generarComida();
  dibujarTodo();
  //setInterval(moverDerecha, 500);

function cambiarDireccion(direccion){
// Para que se muevan presionan
  //if(direccion=="derecha"){
    //moverDerecha();
  //}else if (direccion=="izquierda"){
    //moverIzquierda();
  //} else if (direccion=="arriba"){
    //moverArriba();
  //} else if (direccion=="abajo"){
    //moverAbajo();
  //}

  // Evitar reversa horizontal
  if(direccionActual == "derecha" && direccion == "izquierda"){
    return;
  }

  if(direccionActual == "izquierda" && direccion == "derecha"){
    return;
  }

  // Evitar reversa vertical
  if(direccionActual == "arriba" && direccion == "abajo"){
    return;
  }

  if(direccionActual == "abajo" && direccion == "arriba"){
    return;
  }
  
  direccionActual= direccion; //se mueve automaticamente
}


function ColisionCuerpo(){
  let cabeza = serpiente[0];
  for(let i = 1; i < serpiente.length; i++){
    let parte = serpiente[i];
    if(cabeza.x == parte.x && cabeza.y == parte.y){
      return true;
    }
  }
  return false;
}




function moverSerpiente(){
  //console.log("moviendo");

  if(direccionActual == "derecha"){
    moverDerecha();
  }else if(direccionActual == "izquierda"){
    moverIzquierda();
  }else if(direccionActual == "arriba"){
    moverArriba();
  }else if(direccionActual == "abajo"){
    moverAbajo();
  }
  if(atrapaComida()){puntaje++;document.getElementById("puntaje").textContent = puntaje;
    
    sonidoComida.currentTime=0;
    sonidoComida.play();
    generarComida();
    crecerSerpiente();
    velocidad= velocidad -20; 
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);

  }

  if(Bordes()){
  gameOver = true;
  pausarJuego();
  sonidoOver.play();
  alert("GAME OVER");
  
  return;
}
  if(ColisionCuerpo()){
  gameOver = true;
  pausarJuego();
  sonidoOver.play();
  alert("GAME OVER");
  
  return;
}


  dibujarTodo();
}

function iniciarJuego (){
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  musicaFondo.play();
}

function pausarJuego (){
  clearInterval(intervaloSerpiente);
  musicaFondo.pause();
}

let gameOver= false;


function Bordes(){

  let cabeza = serpiente[0];
  let maximoX = canvas.width / TAMANIO_CELDA;
  let maximoY = canvas.height / TAMANIO_CELDA;

  // IZQUIERDA
  if(cabeza.x < 0){
    return true;
  }

  // DERECHA
  if(cabeza.x >= maximoX){
    return true;
  }

  // ARRIBA
  if(cabeza.y < 0){
    return true;
  }

  // ABAJO
  if(cabeza.y >= maximoY){
    return true;
  }

  return false;
}

function reiniciarJuego(){

  pausarJuego();

  // Reiniciar serpiente
  serpiente.length = 0;

  serpiente.push(
    {x:4, y:5},
    {x:4, y:6},
    {x:4, y:7},
    {x:4, y:8}
  );

  // Reiniciar dirección
  direccionActual = "derecha";

  // Reiniciar game over
  gameOver = false;

  // Reiniciar puntaje
  puntaje = 0;

  document.getElementById("puntaje").textContent = puntaje;

  // Nueva comida
  generarComida();

  // Dibujar nuevamente
  dibujarTodo();
}
let intervaloSerpiente;
let direccionActual= "derecha";
let comidaX= 0;
let comidaY=0;
let puntaje= 0;
    
    
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
    if (i==0){pintarParte(parte.x, parte.y, "yellow");
    }else{
      pintarParte(parte.x, parte.y, "red");
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
  pintarParte(comidaX, comidaY, "green");
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

  direccionActual= direccion; //se mueve automaticamente
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
    
    generarComida();
    crecerSerpiente();
  }

  dibujarTodo();
}

function iniciarJuego (){
  clearInterval(intervaloSerpiente);
  intervaloSerpiente = setInterval(moverSerpiente, 500);
 
}

function pausarJuego (){
  clearInterval(intervaloSerpiente);
}


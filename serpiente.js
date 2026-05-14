
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

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero2();
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
 



function moverDerecha(){
  let cabezaActual = serpierte [0];
  let nuevaCabeza = {
    x: cabezaActual.x +1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);
  //Eliminamos la ultima parte
  serpiente.pop();

}


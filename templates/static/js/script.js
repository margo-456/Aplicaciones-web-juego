//variable para el ancho del lienzo
var canvasWidth = 600;
//variable para la del lienzo
var canvasHeight = 400;
//variable para el jugador
var player;
//variable para la posicion del jugador
var playerYPosition = 200;
//variable para la velocidad de caida
var fallSpeed = 0;
//Intervalo para actualizarr canvas
var interval = setInterval(updateCanvas, 20);
//variable de salto y velocidad de salto
var isJumping = false;
var jumpSpeed = 0;
var block;

// Create a score of 0 to start with
var score = 0;
// Create a variable to hold our scoreLabel
var scoreLabel;

//funcion

function startGame() {  //funcion iniciar juego
    gameCanvas.start();//inicializamos el juego gamecanvas
    player = new createPlayer(30, 30, 10);
    block = new createBlock();
    // Asigne a su variable scoreLabel un valor de scoreLabel()
    scoreLabel = new createScoreLabel(10, 30);
}
   //  variable juegoCanvas 
var gameCanvas = {
    //enviamos los datos del lienzo creado
    canvas: document.createElement("canvas"),
    start: function() {
        //inicializamos los parametros de la funcion tanto el ancho y alto del lienzo
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        //En el body enviamos los datos de nuestro lienzo creado
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
//Funcion que permite crear el jugador, se tiene los parametros de alto ancho y x
function createPlayer(width, height, x) {
    //inicializamos los atributos de la funcion tanto el alto, ancho y posicion
    this.width = width;
    this.height = height;
    this.x = x;
    //para la posicion del jugador
    this.y = playerYPosition;
    
    //funcion para dibijar al jugador
    this.draw = function() {
        ctx = gameCanvas.context;
        //especificamos el color del jugador
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    //funcion para la caida del jugador 
    this.makeFall = function() {
        //sentencia if  para controlar el salto y la velocidad de caida
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            //llamado a la funcion que detiene el jugador
            this.stopPlayer();
        }
    }

    //funcion para detener el jugador cuando tique la parte inferior del lienzo
    this.stopPlayer = function() {
        //Variable para la altura del lienzo y calculamos la distancio
        var ground = canvasHeight - this.height;
         //sentencia para la posicion del jugador
        if (this.y > ground) {
            this.y = ground;
        }
    }
    //funcion para el salto
    this.jump = function() {
        //mediante la sentencia if agregamos la velocidad del salto para el jugador
        if (isJumping) {
            this.y -= jumpSpeed;
            //velocidad de salto de 0.3
            jumpSpeed += 0.3;
        }
    }
}


//Funcion para crear el bloque de ataque
function createBlock() {
    //se envia datos aleatorios, tanto para el alto, ancho, velocidad
    var width = randomNumber(10, 50);
    var height = randomNumber(10, 200);
    var speed = randomNumber(2, 6);
    //ancho del lienzo
    this.x = canvasWidth;
    //posicion y para la altura del lienzo
    this.y = canvasHeight - height;
    // Funcion que permite dibujar nuestro bloque de ataque 
    this.draw = function() {
        ctx = gameCanvas.context;
        //Se asigns un color al bloque de ataque
        ctx.fillStyle = "red";
        //se envia los datos de la posicion, ancho y alto.
        ctx.fillRect(this.x, this.y, width, height);
    }
    //Funcion que permite mover el bloque pra atacar
    this.attackPlayer = function() {
        this.x -= speed;
        //para retornar el ataque 
        this.returnToAttackPosition();
    }
    //se retorna el ataque 
    this.returnToAttackPosition = function() {
        if (this.x < 0) {
 //valores aleatorios tanto para el alto, alcho, posicion
            width = randomNumber(10, 50);
            height = randomNumber(50, 200);
            speed = randomNumber(4, 6);
            this.y = canvasHeight - height;
            this.x = canvasWidth;
            // Increase your score if your block made it to the edge
            score++;
        }
    }
}


function detectCollision() {//Funcion que detecta la colision del jugaro con el bloque de ataque
    var playerLeft = player.x//variables para el jugador
    var playerRight = player.x + player.width;//especifica las posiciones derecha o izquierda
    var blockLeft = block.x;
    var blockRight = block.x + block.width;
    
    var playerBottom = player.y + player.height;//variable del jugador, suma la altura del jugador
    var blockTop = block.y;
    //Sentencia para detectar la colision del jugador y el bloque de ataque
    if (playerRight > blockLeft && 
        playerLeft < blockLeft && 
        playerBottom > blockTop) {
        
        gameCanvas.stop();
    }
}
// Funcion para crear la etiqueta de puntuacion
function createScoreLabel(x, y) {
    //inicializar la variable etiqueta en cero
    this.score = 0;  
    this.x = x;//obtener la posicion de X y Y
    this.y = y;
    //Funcion para dibujar 
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.font = "25px Marker Felt";
        //Se agrega color de la estiqueta, en este caso negro
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x, this.y);
    }
}
//Funcion para actualizar el lienzo
function updateCanvas() {
    //llamado a la funcion detectar colision
    detectCollision();
    // varible lienzodeljuego
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //llamado a la funcion makefall
    player.makeFall();
    //llamado a la funcion dibujar
    player.draw();
    //llamado a la fncion saltar
    player.jump();
    
    block.draw();
    block.attackPlayer();
    
   
// Vuelva a dibujar su puntaje y actualice el valor
    scoreLabel.text = "SCORE: " + score;
    scoreLabel.draw();
}
 //funcion para los numeros aleatorios especificacion de los minimos y maximos
function randomNumber(min, max) {
    //retorno
    return Math.floor(Math.random() * (max - min + 1) + min)
}
 // Funcion ReiniciarSalto() 
function resetJump() {
    //inicializamos los atributos de velocidad de salto en cero.
    jumpSpeed = 0;
    isJumping = false;
}

//enviar los datos generados
document.body.onkeyup = function(e) {
    //stentencia if para el salto del jugador
    if (e.keyCode == 32) {
        //cambia la variable a verdadero
        isJumping = true;
        //establecer tiempo de espera y reiniciar el salto.
        setTimeout(function() { resetJump(); }, 1000);
    }
}


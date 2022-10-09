var GAME = {
    width: 1160,
    height: 680,
    image: new Image(),
    Score: 0,
}


var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawBall();
    drawRacket();
    drawScore();
}



function drawScore() {
    canvasContext.fillStyle = GAME.color;
    canvasContext.font = '60px serif';
    canvasContext.fillText("Score: " + GAME.Score, 70, 70);
}

function drawWinScreen() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.fillStyle = "blue"
    canvasContext.font = '50px serif';
    canvasContext.textAlign = "center";
    canvasContext.fillText("You fed the cat well :)", GAME.width / 2, GAME.height / 2);
}




function drawBackground() {
    canvasContext.drawImage(GAME.image, 0, 0, GAME.width, GAME.height);
}

var RACKET = {
    color: "#1E3D59",
    x: 0,
    y: 530,
    width: 100,
    height: 150,
    xDirection: 30,
    score: 0,
    image: new Image(),
}

function drawRacket() {
    canvasContext.drawImage(RACKET.image, RACKET.x, RACKET.y, RACKET.width, RACKET.height)
}


var BALL = [{
    x: 100,
    y: -300,
    radius: 70,
    xDirection: 3,
    yDirection: 1,
    image: new Image(),
    healthy: true
},
{
    x: 10,
    y: -86,
    radius: 70,
    xDirection: 3,
    yDirection: 2,
    image: new Image(),
    healthy: true
},
{
    x: 30,
    y: -450,
    radius: 70,
    xDirection: 3,
    yDirection: 5,
    image: new Image(),
    healthy: true
},
{
    x: 98,
    y: -7,
    radius: 70,
    xDirection: 3,
    yDirection: 1,
    image: new Image(),
    healthy: true
},
{
    x: 78,
    y: -16,
    radius: 70,
    xDirection: 3,
    yDirection: 2,
    image: new Image(),
    healthy: true
},
{
    x: 120,
    y: -45,
    radius: 70,
    xDirection: 3,
    yDirection: 2,
    image: new Image(),
    healthy: true
},
{
    x: 190,
    y: -56,
    radius: 70,
    xDirection: 3,
    yDirection: 1,
    image: new Image(),
    healthy: true
},
{
    x: 65,
    y: -34,
    radius: 70,
    xDirection: 3,
    yDirection: 2,
    image: new Image(),
    healthy: true
},
{
    x: 115,
    y: -66,
    radius: 70,
    xDirection: 3,
    yDirection: 3,
    image: new Image(),
    healthy: true
},
{
    x: 140,
    y: -10,
    radius: 70,
    xDirection: 3,
    yDirection: 2,
    image: new Image(),
    healthy: true
},
{
    x: 46,
    y: -29,
    radius: 70,
    xDirection: 3,
    yDirection: 1,
    image: new Image(),
    healthy: false
},
{
    x: 230,
    y: -95,
    radius: 70,
    xDirection: 3,
    yDirection: 3,
    image: new Image(),
    healthy: false
},
{
    x: 500,
    y: -300,
    radius: 70,
    xDirection: 3,
    yDirection: 2,
    image: new Image(),
    healthy: false
}

]

function drawBall() {
    for (var i = 0; i < BALL.length; i++) {
    canvasContext.drawImage(BALL[i].image, BALL[i].x, BALL[i].y, BALL[i].radius, BALL[i].radius)}
}


function updateBall() {
    for (var i = 0; i < BALL.length; i++) {
        BALL[i].y += BALL[i].yDirection
        if (BALL[i].y >= GAME.height) {
            BALL[i].y = 0;
            initBallPlace(i);

        }
        
        if ((BALL[i].y + BALL[i].radius >= RACKET.y) && (BALL[i].x + BALL[i].radius >= RACKET.x) && (BALL[i].x <= RACKET.x + RACKET.width)) {
            BALL[i].y = 0;
            initBallPlace(i);
            if (BALL[i].healthy === true) {
            GAME.Score = GAME.Score + 1;}
            if (BALL[i].healthy === false) {
            GAME.Score = GAME.Score - 5;}
            console.log("Score: " + GAME.Score);
        }

    }
    
}


function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown)
}

function initBackgroundImage() {
    GAME.image.src = "cafe.jpg";
    BALL[0].image.src = "roll.png";
    BALL[1].image.src = "roll.png";
    BALL[2].image.src = "onigiri.png";
    BALL[3].image.src = "onigiri.png";
    BALL[4].image.src = "fish.png";
    BALL[5].image.src = "fish.png";
    BALL[6].image.src = "chips.png";
    BALL[7].image.src = "chips.png";
    BALL[8].image.src = "sushi.png";
    BALL[9].image.src = "sushi.png";
    BALL[10].image.src = "burger.png";
    BALL[11].image.src = "burger.png";
    BALL[12].image.src = "pelmeni.png";
    RACKET.image.src = "cat.png";
}


function onCanvasKeyDown(event) {

    if (event.key === "ArrowLeft") {
        RACKET.x = RACKET.x - RACKET.xDirection;
    }
    if (event.key === "ArrowRight") {
        RACKET.x = RACKET.x + RACKET.xDirection;
    }
    clampRacketPosition();
}

function onCanvasMouseMove(event) {
    RACKET.x = event.clientX;
    clampRacketPosition();
}

function clampRacketPosition() {
    if (RACKET.x < 0) {
        RACKET.x = 0;
    }
    if (RACKET.x + RACKET.width > GAME.width) {
        RACKET.x = GAME.width - RACKET.width;
    }
}

function initBallPlace(index) {
    BALL[index].x = Math.random() * GAME.width;
}

function play() {
    if (GAME.Score < 50) {
        drawFrame();
        updateBall();
        requestAnimationFrame(play);
    }
    if (GAME.Score === 50) {
        drawWinScreen()
    }

}

initEventsListeners();
initBackgroundImage();
play();

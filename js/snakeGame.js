let inputDir = {
    x:0,y:0
}
const music = new Audio('music/music.mp3');
const foodSound = new Audio('music/food.mp3');
const gameOver = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let lastPaintTime = 0;
let speed = 4;
let snakeArray = [
    {x:13,y:15}
];
let food = {
    x:5,y:10
};
let min = 2;
let max = 16;
let score = 0;


//Main method
function main(cTime){
    window.requestAnimationFrame(main);
    if((cTime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = cTime;

    gameEngine();
}

function isCollide(snakeArray){
    if(snakeArray[0].x ===18 || snakeArray[0].y===18 || snakeArray[0].x ===0 || snakeArray[0].y===0){
        return true;
    }
    return false;
}

function gameEngine(){
    //Update the snake array and food
    if(isCollide(snakeArray)){
        gameOver.play();
        music.pause();
        inputDir = {
            x:0,y:0
        };
        alert("Game over, Press any key to play again.");
        snakeArray = [
            {x:13,y:15}
        ];
        music.play();
        score = 0;
        speed = 4;

    }
    scoreBox.innerHTML = "Score: " + score;
    //if snake ate the food then update the score and regenerate the food.
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y){
        snakeArray.unshift({x:snakeArray[0].x+inputDir.x,y:snakeArray[0].y+inputDir.y});
        food = {x:Math.round(min+(max-min)*Math.random()),y:Math.round(min+(max-min)*Math.random())}
        score = score +1;
        if(score/10>speed/4){
            speed+=1;   
        }
    }

    //Moving the snake 
    for (let i = snakeArray.length - 2; i>=0; i--) { 
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head'); 
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    //Display the food.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown' ,e=>{
    inputDir = {x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUP key pressed.");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown key pressed.");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft key pressed.");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight key pressed.");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
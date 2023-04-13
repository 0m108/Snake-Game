let inputDirection = {x: 0,y: 0};

let snakeArray = [
    {x: 13, y: 15}
]
let food = {x: 15, y: 13};

let score = 0;

let speed = 15;
let lastPaintTime = 0;

// functions

function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    mainGame();
}
function Collision(snake)
{
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
         return true; 
    }
}


function mainGame()
{   
    // collision
    if(Collision(snakeArray))
    {
        alert("Game Over");
        snakeArray = [
            {x: 13, y: 15}
        ]
        inputDirection = {x: 0, y: 0};
        score = 0;
    }


    // when food is eaten
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y)
    {
        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y});
        food = {x: Math.floor((Math.random() * 16) + 2),y: Math.floor((Math.random() * 16) + 2)};
        score +=1;
    }

    // moving snake
    // for snake body only
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i+1]= {...snakeArray[i]};   
    }
    // for snake head
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;

    
    // display snake 
    board.innerHTML = "";
    snakeArray.forEach((element,index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = element.x;
        snakeElement.style.gridColumnStart = element.y;
        if(index === 0)
            snakeElement.classList.add("snake-head");
        else
            snakeElement.classList.add("snake-body");
        board.appendChild(snakeElement);
    
    });

    // display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart =   food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDirection = {x: 0, y: 1} // Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        default:
            break;
    }

});
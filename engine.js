var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* holds every value needed to draw the snake,
   such as positions, curves, colors, etc. */ 
class Snake{
    constructor(size){ // size is given in integers
        this.size = size;
    }

    // *** PROPERTIES ***

    direction = 'x'; // direction determines what axis snake's head is currently moving;
    way = 1; // way determines wheater the movement is left/down (1) or right/up (-1)

    position = { // initial position and position tracker for player's head
        'x':350,
        'y':250
    }

    tPosition = { // tracker for snake's tail
        'updateX': ()=>{
            /* if there is a point in front of the tail */
            if(ctx.isPointInStroke(this.tPosition.x + 10, this.tPosition.y) && ctx.isPointInStroke(this.tPosition.x - 10, this.tPosition.y) == false){
                this.tPosition.x += 10;
                ctx.clearRect(this.tPosition.x - 10, this.tPosition.y - 1, 10, 2);
            }
            /* if there is a point behind the tail */
            if(ctx.isPointInStroke(this.tPosition.x - 10, this.tPosition.y) && ctx.isPointInStroke(this.tPosition.x + 10, this.tPosition.y) == false){
                this.tPosition.x -= 10;
                ctx.clearRect(this.tPosition.x - 10, this.tPosition.y - 1, 10, 2);
            }
        },
        'updateY': ()=>{
            /* if there is a point below the tail */
            if(ctx.isPointInStroke(this.tPosition.x, this.tPosition.y + 10) && ctx.isPointInStroke(this.tPosition.x, this.tPosition.y - 10) == false){
                this.tPosition.y += 10;
            }
            /* if there is a point upwards the tail */
            if(ctx.isPointInStroke(this.tPosition.x, this.tPosition.y - 10) && ctx.isPointInStroke(this.tPosition.x, this.tPosition.y + 10) == false){
                this.tPosition.y -= 10;
            }
        },

        'x': 230, // this is the position value minus the snake's size
        'y': 250
    }

    /* an array of objects. Every time a valid button
       is pressed, a new entry is created and every bit
       of the snake is drawed based on these points.
       Each object consists in the x, y, direction and way of drawing. */
    curves = new Array();

    // *** METHODS ***

     /* updates the snake's head position within each frame */
    update(){
        this.position[this.direction] += 10*this.way;
    }

    /* clears the last piece of snake's body */
    clear(){
        ctx.beginPath();
        ctx.moveTo(this.tPosition.x, this.tPosition.y);

    }

    /* literally draws the snake's head */
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y); // initiates on current position of snake's head

        if(this.direction == 'x'){ // toggles between x and y axis, based on input
            ctx.lineTo(this.position.x + (10*this.way), this.position.y);
        }
        else{
            ctx.lineTo(this.position.x, this.position.y + (10*this.way));
        }
        ctx.stroke();
        ctx.closePath();
    }

}

var snake = new Snake(12);

window.onload = ()=>{
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.moveTo(snake.position.x, snake.position.y);
    ctx.lineTo(snake.position.x - (10*snake.size), snake.position.y); // draws 10 pixels for each cell of snake
    ctx.stroke();
    ctx.closePath();
};

/* holds the framerate of game. Default is 10 fps */
setInterval(()=>{
    //snake.clear();
    snake.draw();
    snake.update();
    //snake.tPosition.updateX();
    //snake.tPosition.updateY();
}, 1000/10);

document.addEventListener('keydown', (e)=>{
    console.log(e.key);
    switch(e.key){
        case 'ArrowUp':
            if(snake.direction == 'y'){break;}
            snake.way = -1;
            snake.direction = 'y';
            break;
        case 'ArrowDown':
            if(snake.direction == 'y'){break;}
            snake.way = 1;
            snake.direction = 'y';
            break;
        case 'ArrowLeft':
            if(snake.direction == 'x'){break;}
            snake.way = -1;
            snake.direction = 'x';
            break;
        case 'ArrowRight':
            if(snake.direction == 'x'){break;}
            snake.way = 1;
            snake.direction = 'x';
    }
});
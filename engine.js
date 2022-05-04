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
    axisLength = 1;

    position = { // initial position and position tracker for player's head
        'x':350,
        'y':250
    }

    /* these are mirrors for the direction and way properties.
       They define the way in which a clearRect will be moving
       to erase the tail of the snake */
    eDirection = 'x';
    eWay = 1;
    ePosition = {
        'x':200,
        'y':250
    }

    /* an array of objects. Every time a valid button
       is pressed, a new entry is created and every bit
       of the snake is drawed based on these points.
       Each object consists in the direction and way of drawing. */
    curves = new Array();
    initCurveCount = 0;

    // *** METHODS ***

     /* updates the snake's head position within each frame */
    update(){
        this.position[this.direction] += 10*this.way;
    }

    /* clears the last piece of snake's body */
    clear(){
        console.log(this.axisLength);
        switch (this.eDirection) {
            case 'x':
                ctx.clearRect(this.ePosition.x, this.ePosition.y - (1 * this.eWay), 10, 2);
                this.ePosition.x += 10 * this.eWay;
                console.log('position x: ' + this.ePosition.x);
                break;
            case 'y':
                ctx.clearRect(this.ePosition.x - (1 * this.eWay), this.ePosition.y, 2, 10);
                this.ePosition.y += 10 * this.eWay;
                console.log('position y: ' + this.ePosition.y);
                break;
        } // FINALLY SOME FUCKING PROGRESS
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

    resetAxisLentgh(){
        this.axisLength = 1;
    }

}

var snake = new Snake(15);

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
    snake.axisLength += 1;
    snake.clear();
    snake.draw();
    snake.update();
    //snake.tPosition.updateX();
    //snake.tPosition.updateY();
}, 1000/10);

document.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'ArrowUp':
            if(snake.direction == 'y'){break;}
            snake.way = -1;
            snake.direction = 'y';
            snake.resetAxisLentgh();
            break;
        case 'ArrowDown':
            if(snake.direction == 'y'){break;}
            snake.way = 1;
            snake.direction = 'y';
            snake.resetAxisLentgh();
            break;
        case 'ArrowLeft':
            if(snake.direction == 'x'){break;}
            snake.way = -1;
            snake.direction = 'x';
            snake.resetAxisLentgh();
            break;
        case 'ArrowRight':
            if(snake.direction == 'x'){break;}
            snake.way = 1;
            snake.direction = 'x';
            snake.resetAxisLentgh();
    }
});
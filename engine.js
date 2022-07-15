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
    axisLength = 15;

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
        /* if a curve exists in the queue... */
        if(this.curves[0] != undefined){
            /* checks it's time to change direction and way */
            if(this.curves[0].duration == 0){
                this.eDirection = this.curves[0].direction;
                this.eWay = this.curves[0].way;

                /* if this happens, then unset the first curve object and re-arrange the others */
                this.curves[0] = undefined;
                this.curves = this.curves.filter(elem => {
                    return elem !== undefined;
                });
            }
            else{
                /* if it's not time for a curve, count down the next one */
                this.curves[0].duration -= 1;
            }
        }
        switch (this.eDirection) {
            case 'x':
                /* quick fix for a bug: when using negative eWay, clearRect would draw with a wrong offset of 10 pixels */
                if(this.eWay < 0){
                    ctx.clearRect(this.ePosition.x - 10, this.ePosition.y - 1, 10, 2);
                    this.ePosition.x += 10 * this.eWay;
                }
                /* if eWay is not negative, execute like normal */
                else{
                    ctx.clearRect(this.ePosition.x, this.ePosition.y - 1, 10, 2);
                    this.ePosition.x += 10 * this.eWay;
                }
                break;
            case 'y':
                /* same thing as before, but in the y axis */
                if(this.eWay < 0){
                    ctx.clearRect(this.ePosition.x - 1, this.ePosition.y - 10, 2, 10);
                    this.ePosition.y += 10 * this.eWay;
                }
                else{
                    ctx.clearRect(this.ePosition.x - 1, this.ePosition.y, 2, 10);
                    this.ePosition.y += 10 * this.eWay;
                }
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
        this.curves.push({'direction':this.direction,'way':this.way,'duration':this.axisLength}); // creates new curve object in queue
        this.axisLength = -1; // idk how this works, but it works ¯\_(ツ)_/¯
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
    snake.clear();
    snake.draw();
    snake.update();
    snake.axisLength = snake.axisLength == snake.size ? snake.size : snake.axisLength + 1; // if axisLength equals size, stop increasing
}, 1000/10); // 10 frames per second


/* INPUTS AND CALLBACKS */

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

alert('u are awesome');
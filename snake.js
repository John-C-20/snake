document.addEventListener("DOMContentLoaded", function () {
    canv = document.getElementById("game-canvas");
    canv.height = 400
    canv.width = 400
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);

    playerXpos = playerYpos = 10; // initial player starting position
    gridSize = tileCount = 20; // gridSize is size of each snake piece, tilecount is amount of tiles 
    appleX = appleY = 15; // position of first apple
    xVelocity = yVelocity = 0; // x and y velocity
    trail = []; // array of previous positions
    tail = 5; // initial tail length 


    function game() {
        // moves snake 
        playerXpos += xVelocity;
        playerYpos += yVelocity;

        // lets snake wrap 
        if (playerXpos < 0) {
            playerXpos = tileCount - 1;
        }
        if (playerXpos > tileCount - 1) {
            playerXpos = 0;
        }
        if (playerYpos < 0) {
            playerYpos = tileCount - 1;
        }
        if (playerYpos > tileCount - 1) {
            playerYpos = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);

        ctx.fillStyle = "lime";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
            if (trail[i].x == playerXpos && trail[i].y == playerYpos) {
                tail = 5;   // if snake steps on tail, reset tail length to 5
            }
        }

        trail.push({ x: playerXpos, y: playerYpos }); // adds current position to trail (previous positions)
        while (trail.length > tail) {   // removes the oldest position out of the trail 
            trail.shift();
        }

        if (appleX == playerXpos && appleY == playerYpos) {
            tail++;
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
        }
        ctx.fillStyle = "red";
        ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
    }

    function keyPush(evt) {
        switch (evt.key) {
            case 37:
                xVelocity = -1; yVelocity = 0;
                break;
            case "ArrowUp":
                xVelocity = 0; yVelocity = -1;
                break;
            case 39:
                xVelocity = 1; yVelocity = 0;
                break;
            case 40:
                xVelocity = 0; yVelocity = 1;
                break;
        }
    }

});
//drawing partition on canvas
function draw_partition(){
    let canvas = document.getElementById("game_area");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(1000,0);
    ctx.lineTo(1000,600);
    ctx.lineWidth = "3";
    ctx.strokeStyle = "solid black";
    ctx.stroke();
}

function draw_game_over()
{
    let canvas = document.getElementById("game_area");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(380, 250, 300, 70);
    ctx.font = "bolder 50px Copperplate, Papyrus, fantasy";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", 400, canvas.height/2);
}

function draw_start_window()
{
    let canvas = document.getElementById("game_area");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "violet";
    ctx.fillRect(260, 100, 500, 250);
    ctx.font = "bolder 40px Copperplate, Papyrus, fantasy";
    ctx.fillStyle = "black";
    ctx.fillText("Instructions:",380, 135) ;
    ctx.font = "bolder 25px Copperplate, Papyrus, fantasy";
    ctx.fillText("Click the game area to activate it",270, 185) ;
    ctx.fillText("Use arrow keys for shooting and moving dart",268, 235) ;
    ctx.fillText("Pop as many ballons as you can",270, 285);
    ctx.fillText("Hit space to start",270, 335);
}
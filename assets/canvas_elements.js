//drawing partition on canvas
var canvas = document.getElementById("game_area");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(1000,0);
ctx.lineTo(1000,600);
ctx.lineWidth = "3";
ctx.strokeStyle = "solid black";
ctx.stroke();

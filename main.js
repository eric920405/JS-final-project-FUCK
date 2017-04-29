var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eyImg = document.createElement("img");
eyImg.src = "images/rukia.gif"
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

function draw(){
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(eyImg,96,448);
}
setTimeout(draw,1000);
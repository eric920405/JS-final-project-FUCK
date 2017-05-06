var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eyImg = document.createElement("img");
eyImg.src = "images/rukia.gif";
var enemy = {x:96,y:448,};
var tbImg = document.createElement("img");
tbImg.src = "images/tower-btn.png";
var trImg = document.createElement("img");
trImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor = {x:0,y:0};
var isBuilding = false;

function drawbg(){
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(tbImg,576,416,64,64);
	setInterval(draw,16);
}
function draw(){
	ctx.drawImage(eyImg,enemy.x,enemy.y);
}
setTimeout(drawbg,1000);
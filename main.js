var bgImg = document.createElement("img");
bgImg.src = "images/map1.png";
var eyImg = document.createElement("img");
eyImg.src = "images/rukia.gif";
var enemy = {
	x:96,
	y:448,
	speed:64,
	direction:{
		x:0,
		y:-1
	},
	move:function(){
		enemy.x = enemy.x + enemy.direction.x * enemy.speed/fps;
		enemy.y = enemy.y + enemy.direction.y * enemy.speed/fps;
}};
var tbImg = document.createElement("img");
tbImg.src = "images/tower-btn.png";
var trImg = document.createElement("img");
trImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor = {x:0,y:0};
var isBuilding = false;
var fps = 60;

$("#game-canvas").click(function(){
	if ((cursor.x >= 576)  && (cursor.y >= 416)){
		if (isBuilding == true) {
			isBuilding = false;
		}else{
			isBuilding = true;
		}
	}else if (isBuilding == true){
		isBuilding = false;
	}
});
$("#game-canvas").mousemove(function(event){
	cursor.x = event.offsetX - event.offsetX % 32;
	cursor.y = event.offsetY - event.offsetY % 32;
});

function draw(){
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(tbImg,576,416,64,64);
	ctx.drawImage(eyImg,enemy.x,enemy.y);
	if (isBuilding == true) {
		ctx.drawImage(trImg,cursor.x,cursor.y);
	}
	enemy.move();
}
setInterval(draw,1000/fps);
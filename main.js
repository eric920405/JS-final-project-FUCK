var bgImg = document.createElement("img");
bgImg.src = "images/map2.png";
var eyImg = document.createElement("img");
eyImg.src = "images/rukia.gif";
var enemy = {
	x:96,
	y:448,
	speed:64,
	pathDes:0,
	direction:{
		x:0,
		y:-1
	},
	move:function(){
		if (isCollided(
			enemyPath[this.pathDes].x,
			enemyPath[this.pathDes].y,
			this.x,this.y,
			this.speed/fps)) {
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;
			var unitVector = getUnitVector(this.x,this.y,enemyPath[this.pathDes].x,enemyPath[this.pathDes].y);
			this.direction = unitVector;
		}else{
			this.x = this.x + this.direction.x * this.speed / fps;
			this.y = this.y + this.direction.y * this.speed / fps;
		}
}};
function isCollided (pointX,pointY,targetX,targetY,target){
	if (pointX >= targetX
		&& pointX <= targetX + target
		&& pointY >= targetY
		&& pointY <= targetY + target){
		return true;
	}else{
		return false;
	}
}
function getUnitVector (srcX,srcY,targetX,targetY){
	var offsetX = targetX - srcX;
	var offsetY = targetY - srcY;
	var distance = Math.sqrt(Math.pow(offsetX,2)+Math.pow(offsetY,2));
	var unitVector = {
		x: offsetX / distance,
		y: offsetY / distance
	};
	return unitVector;
}
var tbImg = document.createElement("img");
tbImg.src = "images/tower-btn.png";
var trImg = document.createElement("img");
trImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor = {x:0,y:0};
var isBuilding = false;
var fps = 60;
var enemyPath = [
	{x:96,y:64},
	{x:384,y:64},
	{x:384,y:192},
	{x:224,y:192},
	{x:224,y:320},
	{x:544,y:320},
	{x:544,y:96},
	{/*none*/}
];
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
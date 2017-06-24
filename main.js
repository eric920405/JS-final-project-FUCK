var bgImg = document.createElement("img");
bgImg.src = "images/map2.png";
var eyImg = document.createElement("img");
eyImg.src = "images/rukia.gif";
var cbImg = document.createElement("img");
cbImg.src = "images/cannon-ball.png";
var enemies = [];
var clock = 0;
var cannonballs = [];
function Cannonball(tower){
	this.speed = 320;
	this.damage = 5;
	var aimedEnemy = enemies[tower.aimingEnemyId];
	this.x = tower.x + 12;
	this.y = tower.y + 12;
	this.direction = getUnitVector(this.x,this.y,aimedEnemy.x + 12,aimedEnemy.y + 12);
	this.move = function(){
		this.x += this.direction.x * this.speed/fps;
		this.y += this.direction.y * this.speed/fps;
	}
}	
function Enemy(){
	this.hp = 1;
	this.x = 96;
	this.y = 480;
	this.direction = {x:0,y:-1};
	this.speed = 64;
	this.pathDes = 0;
	this.move = function(){
		if (isCollided(
			enemyPath[this.pathDes].x,
			enemyPath[this.pathDes].y,
			this.x,this.y,
			this.speed/fps)) {
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;
			if (this.pathDes >= 7) {
				hp -= 10;
			}
			var unitVector = getUnitVector(this.x,this.y,enemyPath[this.pathDes].x,enemyPath[this.pathDes].y);
			this.direction = unitVector;
		}else{
			this.x = this.x + this.direction.x * this.speed / fps;
			this.y = this.y + this.direction.y * this.speed / fps;
		}
	};
}
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
var hp = 100;
var tbImg = document.createElement("img");
tbImg.src = "images/tower-btn.png";
var trImg = document.createElement("img");
trImg.src = "images/tower.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var chImg = document.createElement("img");
chImg.src = "images/crosshair.png";
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
var towers = [];
function Tower(){
	this.x = cursor.x;
	this.y = cursor.y;
	this.range = 96;
	this.aimingEnemyId = null;
	this.fireRate = 1;
	this.readyToShootTime = 1;
	this.searchEnemy = function(){
		this.readyToShootTime -= 1/fps;
		for (var i = 0;i < enemies.length;i++){
			var distance = Math.sqrt(
				Math.pow(this.x - enemies[i].x,2)+Math.pow(this.y - enemies[i].y,2)
			);
			if (distance <= this.range) {
				this.aimingEnemyId = i;
				if (this.readyToShootTime <= 0) {
					this.shoot();
					this.readyToShootTime = this.fireRate;
				};
				return;
			};
		}
		this.aimingEnemyId = null;
	};
	this.shoot = function(){
		var newCannonball = new Cannonball(this);
		cannonballs.push(newCannonball);
	};
}
function addTower(){
	var newTower = new Tower();
	towers.push(newTower);
}
$("#game-canvas").click(function(){
	if ((cursor.x >= 576)  && (cursor.y >= 416)){
		if (isBuilding == true) {
			isBuilding = false;
		}else{
			isBuilding = true;
		}
	}else if (isBuilding == true){
		isBuilding = false;
		addTower();
	}
});
$("#game-canvas").mousemove(function(event){
	cursor.x = event.offsetX - event.offsetX % 32;
	cursor.y = event.offsetY - event.offsetY % 32;
});

function draw(){
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(tbImg,576,416,64,64);
	ctx.font = "24px Microsoft JhengHei";
	ctx.fillStyle  = "white";
	ctx.fillText("HP:" + hp,5,32);
	if (isBuilding == true) {
		ctx.drawImage(trImg,cursor.x,cursor.y);
	}
	clock++;
	if((clock % 80) == 0){
		var newEnemy = new Enemy();
		enemies.push(newEnemy);
	}
	for (var i = 0; i < towers.length; i++) {
		ctx.drawImage(trImg,towers[i].x,towers[i].y);
		towers[i].searchEnemy();
		if (towers[i].aimingEnemyId != null) {
			var id = towers[i].aimingEnemyId;
			ctx.drawImage(chImg,enemies[id].x,enemies[id].y);
		}
	}
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].hp <= 0){
			enemies.splice(i,1);
		}else{
		enemies[i].move();
		ctx.drawImage(eyImg,enemies[i].x,enemies[i].y);
		}
	}
	for (var i = 0; i < cannonballs.length; i++) {
		cannonballs[i].move();
		ctx.drawImage(cbImg,cannonballs[i].x,cannonballs[i].y,8,8);
	}
}
setInterval(draw,1000/fps);
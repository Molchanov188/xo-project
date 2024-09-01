var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Переменная, следящая за очередностью отрисовки
var is_X_turn = true;

//Переменная для хранения состояния кнопки
var isBegin = true;

var beginButton = document.getElementById("beginButton");

function drawGrid(){
	ctx.beginPath();
	ctx.moveTo(100, 0);
	ctx.lineTo(100, 300);
	ctx.lineTo(101, 300);
	ctx.lineTo(101, 0);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(200, 0);
	ctx.lineTo(200, 300);
	ctx.lineTo(201, 300);
	ctx.lineTo(201, 0);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(0, 100);
	ctx.lineTo(300, 100);
	ctx.lineTo(300, 101);
	ctx.lineTo(0, 101);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(0, 200);
	ctx.lineTo(300, 200);
	ctx.lineTo(300, 201);
	ctx.lineTo(0, 201);
	ctx.fill();
}

//Рисование крестика
function drawX(centerX, centerY){
	ctx.beginPath();
	ctx.moveTo(centerX - 25, centerY - 25);
	ctx.lineTo(centerX + 25, centerY + 25);
	ctx.lineTo(centerX + 25, centerY + 24);
	ctx.lineTo(centerX -25, centerY - 26);
	ctx.lineTo(centerX -25, centerY - 25);
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(centerX + 25, centerY - 25);
	ctx.lineTo(centerX - 25, centerY + 25);
	ctx.lineTo(centerX - 25, centerY + 24);
	ctx.lineTo(centerX + 25, centerY - 26);
	ctx.lineTo(centerX + 25, centerY - 25);
	ctx.fill();
}

//Рисование нолика
function drawO(centerX, centerY){
	ctx.beginPath();
	ctx.arc(centerX, centerY, 48, 0, Math.PI / 180 * 360);
	ctx.stroke();
}

function handlerClickCanvas(e){
	var mouseX = e.clientX;
	var mouseY = e.clientY;
	
	var centerX;
	var centerY;
	
	if(mouseX < 100){
		centerX = 50;
	}else if(mouseX < 200){
		centerX = 150;
	}else{
		 centerX = 250;
	}
	
	if(mouseY < 100){
		centerY = 50;
	}else if(mouseY < 200){
		centerY = 150;
	}else{
		 centerY = 250;
	}
	
	if(is_X_turn){
		drawX(centerX, centerY);
		is_X_turn = false;
	}else{
		drawO(centerX, centerY);
		is_X_turn = true;
	}
}

function clearGrid(){
	ctx.clearRect(0, 0, 300, 300);
}

function draw(e){
	if(isBegin){
		drawGrid();
		isBegin = false;
	}else{
		clearGrid();
	}
	
	beginButton.innerHTML = "Выйти";
	
}

beginButton.addEventListener("click", draw);
cvs.addEventListener("click", handlerClickCanvas);
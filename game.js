let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

//Переменная, следящая за тем, чтобы после окончания игры нельзя было продолжить игру без начала новой игры
let isEndGame = false;

// Переменная, следящая за выбранной стороной (крестики или нолики)
// Крестики: 1, нолики: 0
let mySide = 1;

let beginButton = document.getElementById("beginButton");

// Таблица, хранящая состояние поля игры
// Крестики: 1, нолики: 0, пустая клетка: 2
let matrix = [
	[2, 2, 2],
	[2, 2, 2],
	[2, 2, 2]
];

let centers = [50, 150, 250];

function checkWin(){
	// Проверка столбцов на завершенные линии крестиков или ноликов
	for(let i = 0; i < 3; i++){
		let side = matrix[0][i];
		if(matrix[1][i] == side && matrix[2][i] == side && side != 2){
			isEndGame = true;
			return true;
		}
	}
	
	// Проверка строк на завершенные линии крестиков или ноликов
	for(let i = 0; i < 3; i++){
		let side = matrix[i][0];
		if(matrix[i][1] == side && matrix[i][2] == side && side != 2){
			isEndGame = true;
			return true;
		}
	}
	
	// Проверка диагоналей на завершенные линии крестиков или ноликов
	let side = matrix[1][1];
	if(matrix[0][0] == side && matrix[2][2] == side && side != 2){
		isEndGame = true;
		return true;
	}else if(matrix[2][0] == side && matrix[0][2] == side && side != 2){
		isEndGame = true;
		return true;
	}
}

// Возвращает массив из двух элементов: вид структуры и номер структуры
// Структуры: строка ("l"), столбец ("c"), диагональ("d")
//  Номер структуры содержит номер строки, столбца или диагонали (диагональ от левого верха = 0, другая = 1)

// Возвращая matrixY и matrixX для хода
function checkCanWin(side){
	// Проверка столбцов
	for(let i = 0; i < 3; i++){
		if(matrix[0][i] == 2 && matrix[1][i] == matrix[2][i] && matrix[2][i] == side){
			return [0, i];
		}else if(matrix[1][i] == 2 && matrix[0][i] == matrix[2][i] && matrix[2][i] == side){
			return [1, i];
		}else if(matrix[2][i] == 2 && matrix[0][i] == matrix[1][i] && matrix[1][i] == side){
			return [2, i];
		}
	}
	
	// Проверка строк
	for(let i = 0; i < 3; i++){
		if(matrix[i][0] == 2 && matrix[i][1] == matrix[i][2] && matrix[i][2] == side){
			return [i, 0];
		}else if(matrix[i][1] == 2 && matrix[i][0] == matrix[i][2] && matrix[i][2] == side){
			return [i, 1];
		}else if(matrix[i][2] == 2 && matrix[i][0] == matrix[i][1] && matrix[i][1] == side){
			return [i, 2];
		}
	}
	
	// Проверка диагоналей
	if(matrix[0][0] == 2 && matrix[1][1] == matrix[2][2] && matrix[2][2] == side){
		return [0, 0];
	}else if(matrix[1][1] == 2 && matrix[0][0] == matrix[2][2] && matrix[2][2] == side){
		return [1, 1];
	}else if(matrix[2][2] == 2 && matrix[0][0] == matrix[1][1] && matrix[1][1] == side){
		return [2, 2];
	}
	
	if(matrix[2][0] == 2 && matrix[1][1] == matrix[0][2] && matrix[0][2] == side){
		return [2, 0];
	}else if(matrix[1][1] == 2 && matrix[2][0] == matrix[0][2] && matrix[0][2] == side){
		return [1, 1];
	}else if(matrix[0][2] == 2 && matrix[2][0] == matrix[1][1] && matrix[1][1] == side){
		return [0, 2];
	}
	
	return [-1];
}

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

function doTurn(matrixY, matrixX, side){
	
	if(side == 1){
		drawX(centers[matrixX], centers[matrixY]);
		matrix[matrixY][matrixX] = 1;
	}else{
		drawO(centers[matrixX], centers[matrixY]);
		matrix[matrixY][matrixX] = 0;
	}
}

function getRandomTurn() {
	let arrPosMatrix = [];
	
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(matrix[i][j] == 2){
				arrPosMatrix.push([i, j]);
			}
		}
	}
	
	if(arrPosMatrix.length == 0){
		isEndGame = true;
		alert("Ошибка! Нет полей для хода!");
	}
	
	return arrPosMatrix[Math.floor(Math.random() * arrPosMatrix.length)];
}

function checkDraw(){
	let arrPosMatrix = [];
	
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			if(matrix[i][j] == 2){
				arrPosMatrix.push([i, j]);
			}
		}
	}
	
	if(arrPosMatrix.length == 0){
		isEndGame = true;
		return true;
	}
	
	return false;
}

function turnAI(){
	
	let sideAI;
	if(mySide == 1){
		sideAI = 0;
	}else{
		sideAI = 1;
	}
	
	let posMatrix = checkCanWin(sideAI);
	if(posMatrix[0] != -1){
		doTurn(posMatrix[0], posMatrix[1], sideAI);
	}else{
		posMatrix = checkCanWin(mySide);
		if(posMatrix[0] != -1){
			doTurn(posMatrix[0], posMatrix[1], sideAI);
		}else{
			posMatrix = getRandomTurn();
			doTurn(posMatrix[0], posMatrix[1], sideAI);
		}
	}
	
	if(checkWin()){
		alert("Вы проиграли!!!");
	}else if(checkDraw()){
		alert("Ничья!!!");
	}
}

function handlerClickCanvas(e){
	
	if(isEndGame){
		return;
	}
	
	let mouseX = e.clientX;
	let mouseY = e.clientY;
	
	let centerX;
	let centerY;
	let matrixX;
	let matrixY;
	
	if(mouseX < 100){
		centerX = 50;
		matrixX = 0;
	}else if(mouseX < 200){
		centerX = 150;
		matrixX = 1;
	}else{
		 centerX = 250;
		 matrixX = 2;
	}
	
	if(mouseY < 100){
		centerY = 50;
		matrixY = 0;
	}else if(mouseY < 200){
		centerY = 150;
		matrixY = 1;
	}else{
		 centerY = 250;
		 matrixY = 2;
	}
	
	doTurn(matrixY, matrixX, mySide);
	
	if(checkWin()){
		alert("Вы выиграли!!!");
	}else if(checkDraw()){
		alert("Ничья!!!");
	}else{
		turnAI();
	}
	
}

function clearGrid(){
	
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 3; j++){
			matrix[i][j] = 2;
		}
	}
	
	ctx.clearRect(0, 0, 300, 300);
	drawGrid();
	isEndGame = false;
	
	if(mySide == 0){
		turnAI();
	}
}

function radioButtonClick(e){
	if(e.target.value == "X"){
		mySide = 1;
		clearGrid();
	}else{
		mySide = 0;
		clearGrid();
	}
}

beginButton.addEventListener("click", clearGrid);
cvs.addEventListener("click", handlerClickCanvas);
window.addEventListener("load", clearGrid);
for (let i = 0; i < myForm.sides.length; i++) {
    myForm.sides[i].addEventListener("click", radioButtonClick);
}
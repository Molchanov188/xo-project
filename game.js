var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
ctx.fillRect(25, 25, 100, 100);

const beginButton = document.search.beginButton;

function draw(){
	
	ctx.fillRect(25, 25, 100, 100);
	
	ctx.beginPath();
	ctx.moveTo(100, 0);
	ctx.lineTo(300, 0);
	ctx.fill();
}

beginButton.addEventListener("click", draw);
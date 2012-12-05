var boardWidthInSquares = 20;
var boardHeightInSquares= 20;
var pieceWidth = 25;
var pieceHeight= 25;
var kPixelWidth = 1 + (boardWidthInSquares * pieceWidth);
var kPixelHeight= 1 + (boardHeightInSquares * pieceHeight);
var gFigures;
var gSelectedFigureIndex;
var gMyFigure;

var gCanvasElement;
var gDrawingContext;

/*Classes*/
function Figure(name, row, column) {
	this.name = name;
	this.row = row;
	this.column = column;
}

/*Play logic*/
function gridOnClick(e) {
	var figure = getCursorPosition(e);
	for (var i = 0; i < gFigures.length; i++) {
		if ((gFigures[i].row == figure.row) && 
			(gFigures[i].column == figure.column)) {
			clickOnFigure(i);
			return;
		}
	}
	clickOnEmptyCell(figure);
}

function clickOnEmptyCell(cell) {
	/*No figure was selected, do nothing*/
	if (gSelectedFigureIndex == -1) { return; }
	/*A figure was selected and must now move*/
	gFigures[gSelectedFigureIndex].row = cell.row;
	gFigures[gSelectedFigureIndex].column = cell.column;
	gSelectedFigureIndex = -1;
	drawBoard();
	return;
}

function clickOnFigure(figureIndex) {
	if (gSelectedFigureIndex == figureIndex) { return; }
	if (gMyFigure == figureIndex){
		gSelectedFigureIndex = figureIndex;
		var p = gFigures[gSelectedFigureIndex];
		drawPiece(p, true, true, p.column, p.row);
		return;
	}
	return;
}

function getCursorPosition(e) {
	/* returns Figure with .row and .column properties */
	var x;
	var y;
	if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
	}
	else {
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= gCanvasElement.offsetLeft;
	y -= gCanvasElement.offsetTop;
	x = Math.min(x, boardWidthInSquares * pieceWidth);
	y = Math.min(y, boardHeightInSquares * pieceHeight);
	var figure = new Figure("", Math.floor(y/pieceHeight), Math.floor(x/pieceWidth));
	return figure;
}

/*Drawing logic*/
function drawBoard() {
	gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
	gDrawingContext.beginPath();
	
	/* vertical lines */
	for (var x = 0; x <= kPixelWidth; x += pieceWidth) {
		gDrawingContext.moveTo(0.5 + x, 0);
		gDrawingContext.lineTo(0.5 + x, kPixelHeight);
	}
	
	/* horizontal lines */
	for (var y = 0; y <= kPixelHeight; y += pieceHeight) {
		gDrawingContext.moveTo(0, 0.5 + y);
		gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
	}
	
	/* draw it! */
	gDrawingContext.strokeStyle = "#ccc";
	gDrawingContext.stroke();
	if(gFigures != undefined){
		for (var i = 0; i < gFigures.length; i++) {
			drawPiece(gFigures[i], gSelectedFigureIndex == i, gMyFigure == i, -1, -1);
		}
	}
}

function drawPiece(p, selected, myFigure, clearC, clearR) {
	if (clearC != -1 && clearR != -1){
		var xC = (clearC * pieceWidth)+(pieceWidth/15);
		var yC = (clearR * pieceHeight)+(pieceWidth/15);
		var wC = pieceWidth - (2*pieceWidth/15);
		var hC = pieceHeight - (2*pieceWidth/15);
		gDrawingContext.clearRect(xC, yC, wC, hC);	
	}   
	var column = p.column;
	var row = p.row;
	var x = (column * pieceWidth) + (pieceWidth/2);
	var y = (row * pieceHeight) + (pieceHeight/2);
	var radius = (pieceWidth/2) - (pieceWidth/10);
	var xText = (column * pieceWidth) + (pieceWidth/3);
	var yText = (row * pieceHeight) + (pieceHeight/2)+3;
	gDrawingContext.beginPath();
	gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
	gDrawingContext.closePath();
	gDrawingContext.strokeStyle = "#000";
	gDrawingContext.stroke();
	if (selected){
		gDrawingContext.fillStyle = "#f00";					
	}
	else if (myFigure){
		 gDrawingContext.fillStyle = "#0f0";
	}
	else {
		gDrawingContext.fillStyle = "#000";	
	}
	gDrawingContext.fill();
	if(!selected && myFigure){
		gDrawingContext.fillStyle = "#000";
	}
	else {
		gDrawingContext.fillStyle = "#fff";
	}
	gDrawingContext.font = "bold 12px sans-serif";
	gDrawingContext.fillText(p.name.substring(0,1), xText, yText);	 				
}

/*Initialization logic*/
function init() {   
	var canvasElement = document.getElementById("krabbel");
	gCanvasElement = canvasElement;
	gCanvasElement.width = kPixelWidth;
	gCanvasElement.height = kPixelHeight;
	gCanvasElement.addEventListener("click", gridOnClick, false);
	gDrawingContext = gCanvasElement.getContext("2d");
	gSelectedFigureIndex = -1;
	changeOrAddFigure("Emile", 2, 5);
	changeOrAddFigure("Marieke", 3, 6);
	setMyFigure("Marieke");
	drawBoard();
}
function changeOrAddFigure (name, x, y){
	var exists = false;
	var index = -1;
	if(gFigures != undefined){ 
		var i = 0;
		while(!exists && i<gFigures.length){
			if(gFigures[i].name == name){
				exists = true;
				index = i;							
			}
			else {
				i++;
			}
		}
	}
	if(exists){
		gFigures[index].column = x;
		gFigures[index].row = y;
	}
	else{
		if(gFigures != undefined){
			gFigures[gFigures.length] = new Figure(name, y, x);
		}
		else{
			gFigures = [new Figure(name, y, x)];
		}	
	}	
}

function setMyFigure(name){
	var found = false;
	var i = 0;
	while (!found && i<gFigures.length){
		if (gFigures[i].name == name){
			found = true;
			gMyFigure = i;
		}
		else{
			i++;
		}
	}
}

document.addEventListener("DOMContentLoaded", init, false);

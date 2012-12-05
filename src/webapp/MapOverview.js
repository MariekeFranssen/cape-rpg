var boardWidthInSquares = 20;
var boardHeightInSquares= 20;
var pieceWidth = 25;
var pieceHeight= 25;
var boardWidthInPixels = 1 + (boardWidthInSquares * pieceWidth);
var boardHeightInPixels= 1 + (boardHeightInSquares * pieceHeight);
var figureList;
var selectedFigureIndex;
var myFigureIndex;

var canvasElement;
var drawingContext;

/*Classes*/
function Figure(name, row, column) {
	this.name = name;
	this.row = row;
	this.column = column;
}

/*Play logic*/
function gridOnClick(e) {
	var figure = getCursorPosition(e);
	for (var i = 0; i < figureList.length; i++) {
		if ((figureList[i].row == figure.row) && 
			(figureList[i].column == figure.column)) {
			clickOnFigure(i);
			return;
		}
	}
	clickOnEmptyCell(figure);
}

function clickOnEmptyCell(cell) {
	/*No figure was selected, do nothing*/
	if (selectedFigureIndex == -1) { return; }
	/*A figure was selected and must now move*/
	figureList[selectedFigureIndex].row = cell.row;
	figureList[selectedFigureIndex].column = cell.column;
	selectedFigureIndex = -1;
	drawBoard();
	return;
}

function clickOnFigure(figureIndex) {
	if (selectedFigureIndex == figureIndex) { return; }
	if (myFigureIndex == figureIndex){
		selectedFigureIndex = figureIndex;
		var p = figureList[selectedFigureIndex];
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
	x -= canvasElement.offsetLeft;
	y -= canvasElement.offsetTop;
	x = Math.min(x, boardWidthInSquares * pieceWidth);
	y = Math.min(y, boardHeightInSquares * pieceHeight);
	var figure = new Figure("", Math.floor(y/pieceHeight), Math.floor(x/pieceWidth));
	return figure;
}

/*Drawing logic*/
function drawBoard() {
	drawingContext.clearRect(0, 0, boardWidthInPixels, boardHeightInPixels);
	drawingContext.beginPath();
	
	/* vertical lines */
	for (var x = 0; x <= boardWidthInPixels; x += pieceWidth) {
		drawingContext.moveTo(0.5 + x, 0);
		drawingContext.lineTo(0.5 + x, boardHeightInPixels);
	}
	
	/* horizontal lines */
	for (var y = 0; y <= boardHeightInPixels; y += pieceHeight) {
		drawingContext.moveTo(0, 0.5 + y);
		drawingContext.lineTo(boardWidthInPixels, 0.5 +  y);
	}
	
	/* draw it! */
	drawingContext.strokeStyle = "#ccc";
	drawingContext.stroke();
	if(figureList != undefined){
		for (var i = 0; i < figureList.length; i++) {
			drawPiece(figureList[i], selectedFigureIndex == i, myFigureIndex == i, -1, -1);
		}
	}
}

function drawPiece(p, selected, isMyFigure, clearC, clearR) {
	if (clearC != -1 && clearR != -1){
		var xC = (clearC * pieceWidth)+(pieceWidth/15);
		var yC = (clearR * pieceHeight)+(pieceWidth/15);
		var wC = pieceWidth - (2*pieceWidth/15);
		var hC = pieceHeight - (2*pieceWidth/15);
		drawingContext.clearRect(xC, yC, wC, hC);	
	}   
	var column = p.column;
	var row = p.row;
	var x = (column * pieceWidth) + (pieceWidth/2);
	var y = (row * pieceHeight) + (pieceHeight/2);
	var radius = (pieceWidth/2) - (pieceWidth/10);
	var xText = (column * pieceWidth) + (pieceWidth/3);
	var yText = (row * pieceHeight) + (pieceHeight/2)+3;
	drawingContext.beginPath();
	drawingContext.arc(x, y, radius, 0, Math.PI*2, false);
	drawingContext.closePath();
	drawingContext.strokeStyle = "#000";
	drawingContext.stroke();
	if (selected){
		drawingContext.fillStyle = "#f00";					
	}
	else if (isMyFigure){
		 drawingContext.fillStyle = "#0f0";
	}
	else {
		drawingContext.fillStyle = "#000";	
	}
	drawingContext.fill();
	if(!selected && isMyFigure){
		drawingContext.fillStyle = "#000";
	}
	else {
		drawingContext.fillStyle = "#fff";
	}
	drawingContext.font = "bold 12px sans-serif";
	drawingContext.fillText(p.name.substring(0,1), xText, yText);	 				
}

/*Initialization logic*/
function init() {   
	canvasElement = document.getElementById("krabbel");
	canvasElement.width = boardWidthInPixels;
	canvasElement.height = boardHeightInPixels;
	canvasElement.addEventListener("click", gridOnClick, false);
	drawingContext = canvasElement.getContext("2d");
	selectedFigureIndex = -1;
	changeOrAddFigure("Emile", 2, 5);
	changeOrAddFigure("Marieke", 3, 6);
	setMyFigure("Marieke");
	drawBoard();
}
function changeOrAddFigure (name, x, y){
	var exists = false;
	var index = -1;
	if(figureList != undefined){ 
		var i = 0;
		while(!exists && i<figureList.length){
			if(figureList[i].name == name){
				exists = true;
				index = i;							
			}
			else {
				i++;
			}
		}
	}
	if(exists){
		figureList[index].column = x;
		figureList[index].row = y;
	}
	else{
		if(figureList != undefined){
			figureList[figureList.length] = new Figure(name, y, x);
		}
		else{
			figureList = [new Figure(name, y, x)];
		}	
	}	
}

function setMyFigure(name){
	var found = false;
	var i = 0;
	while (!found && i<figureList.length){
		if (figureList[i].name == name){
			found = true;
			myFigureIndex = i;
			alert("x is " + getMyX());
		}
		else{
			i++;
		}
	}	
}

function getMyX(){
	return figureList[myFigureIndex].column;
}

function getMyY(){
	return figureList[myFigureIndex].row;
}

document.addEventListener("DOMContentLoaded", init, false);

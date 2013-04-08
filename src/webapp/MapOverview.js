/*
 * Direction of Axis:
 * 0 ----> x
 * |
 * |
 * |
 * v
 * 
 * y
 * 
 */

/*
 * Todo:
 * Lijn uiteinden netter op elkaar aansluiten
 */
var boardWidthInSquares = 15;
var boardHeightInSquares= 15;
var squareWidth = 50;
var squareHeight= 50;
var boardWidthInPixels = 1 + (boardWidthInSquares * squareWidth);
var boardHeightInPixels= 1 + (boardHeightInSquares * squareHeight);
var figureList;
var selectedFigureIndex;
var myFigureIndex;
var movePath;
var avatarList;

var tile;

var canvasElement;
var drawingContext;

/*Classes*/
function Figure(name, avatar, x, y) {
	this.name = name;
	this.avatar = avatar;
	this.x = x;
	this.y = y;	
}

function PathPart(xFrom,yFrom, xTo, yTo){
	this.xFrom = xFrom;
	this.yFrom = yFrom;
	this.xTo = xTo;
	this.yTo = yTo;
}

/*Play logic*/
function gridOnClick(e) {
	var figure = getCursorPosition(e);
	for (var i = 0; i < figureList.length; i++) {
		if ((figureList[i].x == figure.x) && 
			(figureList[i].y == figure.y)) {
			clickOnFigure(i);
			return;
		}
	}
	clickOnEmptyCell(figure);
}

function clickOnEmptyCell(cell) {
	/*No figure was selected, do nothing*/
	if (selectedFigureIndex == -1) { return; }

	/*A figure was selected and a move path must now be started or continued*/
	/* Continue move path*/
	var drawIndex;
	if(movePath.length > 0){
		movePath[movePath.length] = new PathPart(movePath[movePath.length - 1].xTo, movePath[movePath.length - 1].yTo, cell.x, cell.y);
		drawIndex = movePath.length-1;
	}
	/*start move path*/
	else{
		movePath[0] = new PathPart(figureList[selectedFigureIndex].x, figureList[selectedFigureIndex].y, cell.x, cell.y);
		drawIndex = 0;
	}
	drawPathPart(movePath[drawIndex]);
	return;
}

function clickOnFigure(figureIndex) {
	if (selectedFigureIndex == figureIndex) { return; }
	if (myFigureIndex == figureIndex){
		selectedFigureIndex = figureIndex;
		var p = figureList[selectedFigureIndex];
		drawPiece(p, true, true, p.x, p.y);
		return;
	}
	return;
}

function getCursorPosition(e) {
	/* returns Figure with .x and .y properties */
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
	x = Math.min(x, boardWidthInSquares * squareWidth);
	y = Math.min(y, boardHeightInSquares * squareHeight);
	var figure = new Figure("", -1, Math.floor(x/squareWidth), Math.floor(y/squareHeight));
	return figure;
}

/*Drawing logic*/
function drawBoard() {
	drawingContext.clearRect(0, 0, boardWidthInPixels, boardHeightInPixels);
//	drawingContext.beginPath();
//	
//	/* vertical lines */
//	for (var x = 0; x <= boardWidthInPixels; x += squareWidth) {
//		drawingContext.moveTo(0.5 + x, 0);
//		drawingContext.lineTo(0.5 + x, boardHeightInPixels);
//	}
//	
//	/* horizontal lines */
//	for (var y = 0; y <= boardHeightInPixels; y += squareHeight) {
//		drawingContext.moveTo(0, 0.5 + y);
//		drawingContext.lineTo(boardWidthInPixels, 0.5 +  y);
//	}
//	
//	/* draw it! */
//	drawingContext.strokeStyle = "#ccc";
//	drawingContext.stroke();
	
	for (var x = 1; x <= boardWidthInPixels - 50; x += squareWidth){
		for (var y = 1; y <= boardHeightInPixels - 50; y += squareHeight){
			drawingContext.drawImage(tile, x, y, squareWidth, squareHeight);
		}
	}
	
	drawingContext.beginPath();
	drawingContext.moveTo(0, 0);
	drawingContext.lineTo(boardWidthInPixels, 0);
	drawingContext.moveTo(0, 0);
	drawingContext.lineTo(0, boardWidthInPixels);
	/* draw it! */
	drawingContext.strokeStyle = "#000";
	drawingContext.lineWidth=5;
	drawingContext.stroke();
	
	if(figureList != undefined){
		for (var i = 0; i < figureList.length; i++) {
			drawPiece(figureList[i], selectedFigureIndex == i, myFigureIndex == i, -1, -1);
		}
	}
	drawMovePath();
}

function drawPiece(p, selected, isMyFigure, clearX, clearY) {
	if (clearX != -1 && clearY != -1){
		var xC = (clearX * squareWidth)+(squareWidth/15);
		var yC = (clearY * squareHeight)+(squareWidth/15);
		var wC = squareWidth - (2*squareWidth/15);
		var hC = squareHeight - (2*squareWidth/15);
		drawingContext.clearRect(xC, yC, wC, hC);	
	}   
	var xInSquares = p.x;
	var yInSquares = p.y;
	
	var x = (xInSquares * squareWidth) + (squareWidth/10);
	var y = (yInSquares * squareHeight) + (squareHeight/10);
	var xRect = (xInSquares * squareWidth) + (squareWidth/15);
	var yRect = (yInSquares * squareHeight) + (squareHeight/15);
	var wRect = squareWidth - 2*(squareWidth/15);
	var hRect = squareHeight - 2*(squareHeight/15);
	/*var x = (xInSquares * squareWidth) + (squareWidth/2);
	var y = (yInSquares * squareHeight) + (squareHeight/2);
	var radius = (squareWidth/2) - (squareWidth/10);*/
	var xText = (xInSquares * squareWidth);
	var yText = (yInSquares * squareHeight) + (squareHeight/5);
	/*drawingContext.beginPath();
	drawingContext.arc(x, y, radius, 0, Math.PI*2, false);
	drawingContext.closePath();
	drawingContext.strokeStyle = "#000";
	drawingContext.stroke();*/
	if (selected){
		drawingContext.fillStyle = "#f00";
		drawingContext.fillRect(xRect, yRect, wRect, hRect);
	}
	else if (isMyFigure){
		 drawingContext.fillStyle = "#0f0";
		 drawingContext.fillRect(xRect, yRect, wRect, hRect);
	}
	/*else {
		drawingContext.fillStyle = "#000";	
	}*/
	
	drawingContext.drawImage(avatarList[p.avatar-1], x, y);
	/*drawingContext.fill();
	if(!selected && isMyFigure){
		drawingContext.fillStyle = "#000";
	}
	else {
		drawingContext.fillStyle = "#fff";
	}*/
	drawingContext.fillStyle = "#000";
	drawingContext.font = "bold 12px sans-serif";
	var description = p.name.substring(0,1) + " " + p.avatar;
	drawingContext.fillText(description, xText, yText); 				
}

function drawMovePath(){
	for (var i = 0; i < movePath.length; i++){
		drawPathPart(movePath[i]);
	}
}

/*Drawing a single step in a move path*/
function drawPathPart(pathPart){
	var fromX = Math.round(pathPart.xFrom * squareWidth + squareWidth/2);
	var fromY = Math.round(pathPart.yFrom * squareHeight + squareHeight/2);
	var toX = Math.round(pathPart.xTo * squareWidth + squareWidth/2);
	var toY = Math.round(pathPart.yTo * squareHeight + squareHeight/2);
	
	drawingContext.beginPath();
	drawingContext.moveTo(fromX , fromY);
	drawingContext.lineTo(toX, toY);
	/* draw it! */
	drawingContext.strokeStyle = "rgba(255,0,0,0.5)";
	drawingContext.stroke();
}

function completeMove(){
	/*The selected figure must now move to the end of the move path*/
	figureList[selectedFigureIndex].x = movePath[movePath.length - 1].xTo;
	figureList[selectedFigureIndex].y = movePath[movePath.length - 1].yTo;
	selectedFigureIndex = -1;
	movePath = [];
	drawBoard();
}

/*Initialization logic*/
function init() {   
	canvasElement = document.getElementById("krabbel");
	canvasElement.width = boardWidthInPixels;
	canvasElement.height = boardHeightInPixels;
	canvasElement.addEventListener("click", gridOnClick, false);
	drawingContext = canvasElement.getContext("2d");
	selectedFigureIndex = -1;
	movePath = [];
	avatarList = [];
	avatarList[0] = new Image();
	avatarList[0].src = "../images/avatar1.png";
	avatarList[1] = new Image();
	avatarList[1].src = "../images/avatar2.png";
	avatarList[2] = new Image();
	avatarList[2].src = "../images/avatar3.png";
	tile = new Image();
	tile.src = "../images/tile.png";
	changeOrAddFigure("Emile", 1, 2, 5);
	changeOrAddFigure("Marieke", 2, 3, 6);
	setMyFigure("Marieke");
	drawBoard();
}

function changeOrAddFigure (name, avatar, x, y){
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
		figureList[index].x = x;
		figureList[index].y = y;
	}
	else{
		if(figureList != undefined){
			figureList[figureList.length] = new Figure(name, avatar, x, y);
		}
		else{
			figureList = [new Figure(name, avatar, x, y)];
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
		}
		else{
			i++;
		}
	}	
}

function getMyX(){
	return figureList[myFigureIndex].x;
}

function getMyY(){
	return figureList[myFigureIndex].y;
}

function getMyPath(){
	if (movePath.length < 1){
		return "";
	}
	else{
		var pathToString = "";
		for(var i = 0; i<movePath.length;i++){
			pathToString = pathToString + "x" + movePath[i].xFrom + "y" + movePath[i].yFrom;
		}
		pathToString = pathToString + "x" + movePath[movePath.length-1].xTo + "y" + movePath[movePath.length-1].yTo;
		return pathToString;
	}
}

document.addEventListener("DOMContentLoaded", init, false);

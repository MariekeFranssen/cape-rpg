﻿var kBoardWidth = 20;
var kBoardHeight= 20;
var kPieceWidth = 25;
var kPieceHeight= 25;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);
var gFigures;
var gNumFigures;
var gSelectedFigureIndex;
var gMyFigure;

var gCanvasElement;
var gDrawingContext;
var	gXField;
var	gYField;
var	gLoopButton; 
/*Classes*/
function Figure(row, column) {
    this.row = row;
    this.column = column;
}

/*Play logic*/
function gridOnClick(e) {
    var figure = getCursorPosition(e);
    for (var i = 0; i < gNumFigures; i++) {
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
	gXField.value=cell.column;
	gYField.value=cell.row;
	return;
}

function clickOnFigure(figureIndex) {
    if (gSelectedFigureIndex == figureIndex) { return; }
    if (gMyFigure == figureIndex){
    	gSelectedFigureIndex = figureIndex;
    	drawBoard();
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
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var figure = new Figure(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
    return figure;
}

/*Drawing logic*/
function drawBoard() {
	gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
	gDrawingContext.beginPath();
	
	/* vertical lines */
	for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
		gDrawingContext.moveTo(0.5 + x, 0);
		gDrawingContext.lineTo(0.5 + x, kPixelHeight);
	}
	
	/* horizontal lines */
	for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
		gDrawingContext.moveTo(0, 0.5 + y);
		gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
	}
	
	/* draw it! */
	gDrawingContext.strokeStyle = "#ccc";
	gDrawingContext.stroke();
	
	for (var i = 0; i < gNumFigures; i++) {
		drawPiece(gFigures[i], gSelectedFigureIndex == i, gMyFigure == i);
		}
}

function drawPiece(p, selected, myFigure) {
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + (kPieceWidth/2);
    var y = (row * kPieceHeight) + (kPieceHeight/2);
    var radius = (kPieceWidth/2) - (kPieceWidth/10);
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
}

/*Initialization logic*/
function init() {   
	var canvasElement = document.getElementById("krabbel");
	var xField = document.getElementById("xField");
	var yField = document.getElementById("yField");
	gXField = xField;
	gYField = yField;
	var row = parseInt(gYField.value);
	var column = parseInt(gXField.value);  
	gCanvasElement = canvasElement;
	gCanvasElement.width = kPixelWidth;
	gCanvasElement.height = kPixelHeight;
	gCanvasElement.addEventListener("click", gridOnClick, false);
	gDrawingContext = gCanvasElement.getContext("2d");
	initFigures(0, row, column);
	drawBoard();
}

function initFigures(myFigure, row, column) {
    gFigures = [new Figure(row, column)];
    gNumFigures = gFigures.length;
    gSelectedFigureIndex = -1;
    gMyFigure = 0;
}

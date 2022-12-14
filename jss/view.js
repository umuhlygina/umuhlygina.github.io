import {minedTrue, minedFalse, dimension, showTrue, showFalse, showFlag} from "./config.js"
export const startBtn = document.querySelector("#start");
export const aiMoveBtn = document.querySelector("#ai_move");
export const canvas = document.querySelector("#canvas");
var maine = document.querySelector("#mine");
var flag = document.querySelector("#flag");
var ctx = canvas.getContext('2d');

//d is the number of elements in dimension.
var d = dimension;

const tileWidth = canvas.width / d
const tileHeight = canvas.height / d
const flagWidth = tileWidth
const flagHeight = tileWidth
const mineWidth= tileWidth
const mineHeight = tileWidth
const mineDx = 0
const mineDy = 0
const flagDx = 0
const flagDy = 0

const tileColor = '#eee'
const canvasColor = '#fff'
canvas.style.backgroundColor = canvasColor

class Tile
{
	constructor(i, j, minesCount, mined, show)
	{
		this.row = i;
		this.col = j;
		this.minesCount = minesCount;
		this.mined = mined;
		this.show = show;
	}
	draw()
	{
		if(this.show === showFalse)
		{
			ctx.fillStyle = tileColor
			ctx.strokeStyle = canvasColor
			ctx.linewidth = 5
			ctx.fillRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
			ctx.strokeRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
		}
		else if(this.show === showFlag)
		{
			ctx.fillStyle = tileColor
			ctx.strokeStyle = canvasColor
			ctx.linewidth = 5
			ctx.fillRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
			ctx.strokeRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
			ctx.drawImage(flag, this.col * tileWidth + flagDx, this.row * tileWidth + flagDy, flagWidth, flagHeight);
		}
		else
		{
			if(this.mined !== minedTrue)
			{
				ctx.fillStyle = tileColor
				ctx.strokeStyle = canvasColor
				ctx.linewidth = 5
				ctx.fillRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
				ctx.strokeRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
				ctx.font = `${tileWidth * 0.6}px Arial`
				ctx.fillStyle = "black"
				ctx.textAlign = 'center'
				ctx.textBaseline = "middle"
				ctx.fillText(this.minesCount, this.col * tileWidth + tileWidth / 2, this.row * tileHeight + tileHeight / 2)
			}
			else
			{
				ctx.fillStyle = "red";
				ctx.strokeStyle = canvasColor;
				ctx.linewidth = 5;
				ctx.fillRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight);
				ctx.strokeRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight);
				ctx.drawImage(mine, this.col * tileWidth + mineDx, this.row * tileWidth + mineDy, mineWidth, mineHeight);
			}
		}
	}
}


export class GameView
{
    constructor(state)
    {
	    ctx.clearRect(0, 0, canvas.width, canvas.height)
	    this.board = []
	    for(let i = 0; i < d; ++i)
	    {
		    this.board.push(new Array(d));
		    for(let j = 0; j < d; j++)
		    {
			    this.board[i][j] = new Tile(i, j, state[i][j].minesCount, state[i][j].mined, state[i][j].show)
			    this.board[i][j].draw()
		    }
	    }
    }
}

export function clickToTail(x, y)
{
    const j = Math.floor(x / tileWidth)
    const i = Math.floor(y / tileHeight)
    return [i,j]
}




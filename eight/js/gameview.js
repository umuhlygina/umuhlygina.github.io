export const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const d = 3
const tileWidth = canvas.width / d
const tileHeight = canvas.height / d
const tileColor = '#ccccff'
const canvasColor = '#eee'
canvas.style.backgroundColor = canvasColor

export class Tile
{
    constructor(i,j,n)
    {
        this.row = i;
        this.col = j;
        this.val = n;
    }

    draw()
    {
        if(this.val)
        {
        ctx.fillStyle = tileColor;
        ctx.strokeStyle = canvasColor;
        ctx.lineWidth = 5;
        ctx.fillRect(this.col * tileWidth, this.row * tileHeight, tileWidth, tileHeight)
        ctx.strokeRect(tileWidth * this.col, tileHeight * this.row, tileWidth, tileHeight)
        ctx.font =`${tileHeight * 0.6}px Arial`
        ctx.fillStyle = "blue"
        ctx.textAlign = 'center'
        ctx.baseLine = "middle"
        ctx.fillText(this.val,this.col * tileWidth + tileWidth / 2, this.row * tileHeight  + tileHeight / 2);
    }
 }
}


export class GameView
{
    constructor(state)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.board = [new Array(d), new Array(d), new Array(d)]
    for(let i = 0; i < d; i++)
    {
        for(let j = 0; j < d; j++)
            {
            this.board[i][j] = new Tile(i, j, state[i][j])
            this.board[i][j].draw()
            }
        }
    }
}

export function clickToTail(x, y)
{
    const j = Math.floor(x / tileWidth)
    const i = Math.floor(y / tileWidth)
return [i,j]
}
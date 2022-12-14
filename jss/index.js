import {aiMoveBtn, startBtn, GameView, clickToTail, canvas} from "./view.js"
import {setMine} from "./game.js"
import {start, stop, dimension, nMine, minedTrue, minedFalse, showTrue, showFalse, showFlag} from "./config.js"
import {MinesweeperAI} from "./minesweeper.js"

let state;
let s1;
var ai;
startGame();

canvas.addEventListener('mouseup', moveView);
startBtn.addEventListener('click', startGame);
aiMoveBtn.addEventListener('click', aiMove);

function startGame()
{
	state = start;
	s1 = setMine(dimension, nMine);
	ai = new MinesweeperAI(dimension);
	new GameView(s1)
}



function moveView(event)
{
	if(state){
		const [i, j] = clickToTail(event.offsetX, event.offsetY)
		if(event.button === 0)
		{
			if(s1[i][j].mined !== minedTrue)
			{
				s1[i][j].show = showTrue;
				ai.add_knowledge(i * dimension + j, s1[i][j].minesCount);
			}
			else
			{
				state = stop;
				for(let l = 0; l < dimension; ++l)
					for(let k = 0; k < dimension; ++k)
						s1[l][k].show = showTrue;
			}
		}
		else
		{
			if(s1[i][j].show === showFlag)
				s1[i][j].show = showFalse;
			else if(s1[i][j].show === showFalse)
				s1[i][j].show = showFlag;
		}
		new GameView(s1)
	}
}

function aiMove()
{
	if(state)
	{
		let move = ai.make_safe_move();
		if(move === undefined)
		{
			move = ai.make_random_move();
			if(move === undefined)
			{
				console.log("Нет ходов");
				state = 0;
				return ;
			}
			else
				console.log("make random move");
		}
		else
			console.log("make safe move");
		let i = Math.floor(move / dimension);
		let j = move % dimension;
		if(s1[i][j].mined !== minedTrue)
		{
			s1[i][j].show = showTrue;
			ai.add_knowledge(i * dimension + j, s1[i][j].minesCount);
		}
		else
		{
			state = stop;
			for(let l = 0; l < dimension; ++l)
				for(let k = 0; k < dimension; ++k)
					s1[l][k].show = showTrue;
		}
	}
	ai.mines.forEach(m =>{let i = Math.floor(m / dimension); let j = m % dimension; s1[i][j].show =showFlag;});
	new GameView(s1)
}



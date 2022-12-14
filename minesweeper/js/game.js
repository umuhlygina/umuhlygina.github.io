import {dimension, minedTrue, minedFalse,  showTrue, showFalse} from "./config.js"

// d is number of elements in dimension, n is number of mines
export function setMine(dimension, nMine)
{
	let state = [];
	let copy = [];
	for(let i = 0; i < dimension; ++i)
	{
		state.push(new Array(dimension));
		for(let j = 0; j < dimension; ++j)
		{
			state[i][j] = {minesCount: 0, show: showFalse, mined: minedFalse};
			copy.push({row: i, col: j});
		}
	};
	while(nMine > 0)
	{
		const index = Math.floor(Math.random() * copy.length);
		state[copy[index].col][copy[index].row].mined = minedTrue;
		copy.splice(index, 1);
		--nMine;
	}
	for(let i = 0; i < dimension; ++i)
		for(let j = 0; j < dimension; ++j)
			countMine(state, dimension, i, j);
	return state;
}


function countMine(state, dimension, i, j)
{
	for(let k = i - 1; k < i + 2; ++k)
	{
		for(let l = j - 1; l < j + 2; ++l)
		{
			if(
				(l === j && k === i) ||
				l < 0 ||
				l > (dimension -1) ||
				k < 0 ||
				k > (dimension - 1))
				continue;
			state[i][j].minesCount += state[k][l].mined;
		}
	}
}


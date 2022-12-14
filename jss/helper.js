export {isSubSet, difference, random_from_list, getNeighbors, index2row, index2col, rowCol2index};

function getNeighbors(k, dimension)
//находит множество соседних ячеек 
{
	const i = index2row(k, dimension);
	const j = index2col(k, dimension);
	const neighbors = [] 
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
			neighbors.push(rowCol2index(k,l, dimension)); 
		}
	}
	return neighbors;
}


function index2row(k, dimension)
{
	return Math.floor(k / dimension);
}

function index2col(k, dimension)
{
	return k % dimension;
}

function rowCol2index(k, l, dimension)
{
	return k * dimension + l;
}

function isSubSet(a, b)
// Тест, что множество a есть подмножество множества b.
{
	if(a.size > b.size)
		return false;
	else
	{
		for(var elem of a)
		{
			if(!b.has(elem)) return false;
		}
		return true;
	}
}

function difference(a, b)
// Разность множеств. a без элементов b.
{
	return new Set([...a].filter(elem => !b.has(elem)));
}

function random_from_list(list)
{ 
	const index = Math.floor(Math.random() * list.length); 
	return list.splice(index, 1)[0];
}


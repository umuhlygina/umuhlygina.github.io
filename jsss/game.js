const right = 1, left = 2, up = 3, down = 4

function findZero(state)
{
    for(let l = 0; l < 3; l++)
    {
        for(let k = 0; k < 3; k++)
            if(state[l][k] === 0)
                return [l, k]
    }
}

export function actions(state)
{
    const [i, j] = findZero(state)
    if(i === 0 && j === 0)
        return [up, left]
    else if(i === 0 && j === 2)
        return [up, right]
    else if(i === 2 && j === 0)
        return [down, left]
    else if(i === 2 && j === 2)
        return [down, right]
    else if(i === 0)
        return [up, left, right]
    else if(i === 2)
        return [down, left, right]
    else if(j === 0)
        return [up, down, left]
    else if(j === 2)
        return [up, down, right]
    else
        return [up, down, left, right]
}

export function successor(state, action)
{
    const newS =[state[0].slice(), state[1].slice(), state[2].slice()]
    const [i, j] = findZero(state)
    if(action === left)
    {
        newS[i][j] = state[i][j+1]
        newS[i][j + 1] = 0
    }
    else if(action === right)
    {
        newS[i][j] = state[i][j - 1]
        newS[i][j - 1] = 0
    }
    else if(action === down)
    {
        newS[i][j] = state[i - 1][j]
        newS[i - 1][j] = 0
    }
    else if(action === up)
    {
        newS[i][j] = state[i + 1][j]
        newS[i + 1][j] = state[i][j]
    }
    return newS
}

export function move(state, i, j)
{
    const zero = findZero(state)
    const _actions = actions(state)
    if(_actions.includes(right) && i === zero[0] && j === zero[1] - 1)
        return successor(state, right)
    else if(_actions.includes(left) && i === zero[0] && j === zero[1] + 1)
        return successor(state, left)
    else if(_actions.includes(up) && i === zero[0] + 1 && j === zero[1])
        return successor(state, up)
    else if(_actions.includes(down) && i === zero[0] - 1 && j === zero[1])
        return successor(state, down)
    else
        return state
}


export function goalTest(state)
{
    const goalState = [
        [1, 2,3],
        [4, 5, 6],
        [7, 8, 0]]
    return is_equal(goalState, state)
}

function is_equal(s1, s2)
{
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(s1[i][j] !== s2[i][j])
                return false
        }
    }
    return true
}

import {GameView, clickToTail, canvas} from "./gameview.js"
import {move, goalTest, actions, successor} from "./game.js"
import {search} from "./search.js"


const initialState = [
    [4, 1, 3],
    [7, 2, 5],
    [8, 0, 6]]

let s1 = initialState
new GameView(s1)

canvas.addEventListener('click', moveView)
const btn_start_ai = document.querySelector('#btn_start_ai')
btn_start_ai.addEventListener('click', start_ai)


function moveView(event)
{
    const [i, j] = clickToTail(event.offsetX, event.offsetY)
    s1 = move(s1, i, j)
    new GameView(s1)
}

function start_ai()
{
    const solution = search(s1, goalTest, actions, successor, false)
    for(let i = 0; i < solution.length; i++)
    {
        setTimeout(()=>{new GameView(solution[i].state)}, i * 2000)
        if(i === solution.length - 1)
            s1 = solution[i].state
    }
}


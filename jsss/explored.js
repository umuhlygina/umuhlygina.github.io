export class Explored extends Object
{
    add(state)
    {
        this[state.toString()] = true
    }

    hasState(state)
    {
        return Boolean(this[state.toString()])
    }
}

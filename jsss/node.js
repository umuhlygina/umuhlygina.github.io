export class Node
{
    constructor(action, state, parent)
    {
        this.action = action
        this.state = state
        this.parent = parent
    }

    path()
    {
        if(this.parent === null)
            return [{action: null, state: this.state}]
        else
        {
            const h1 = this.parent.path()
            const h2 = {action: this.action, state: this.state}
            h1.push(h2)
            return h1
        }
    }

    strPath()
    {
        const path = this.path()
        let pPath = ""
        for(let i = 0; i < path.length; i++)
        {
            if(i === 0)
            {
                pPath += path[i].state
            }
            else
            {
                pPath += '-'
                pPath += path[i].action
                pPath += '->'
                pPath += path[i].state
            }
        }
        return pPath
    }
}

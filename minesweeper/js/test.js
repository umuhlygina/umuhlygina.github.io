import {Sentence} from "./minesweeper.js"
const s1 = new Sentence([1, 2], 1);
const s2 = new Sentence([1, 3], 0);
s1.mark_mine(2)
s2.mark_mine(2)
console.log(s1);
console.log(s2);
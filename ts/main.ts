/*

1. Input users
1.1 Shuffle
1.2 Output array of two opponents

*/

import { Opponents } from './inputOpponents.js';


const opp = new Opponents();
console.log(opp);

$('#go').on('click', event => {
    const ready = opp.shuffle();

    ready.forEach(el => console.log(el[0] + ' vs. ' + el[1]))
});
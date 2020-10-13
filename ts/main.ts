import { Opponents } from './inputOpponents.js';
import { HeroesGrid } from './heroesGrid.js';


const opp = new Opponents();
console.log(opp);

$('#go').on('click', event => {
    const ready = opp.shuffle();

    ready.forEach(el => console.log(el[0] + ' vs. ' + el[1]))
});

const grid = new HeroesGrid();
console.log(grid);
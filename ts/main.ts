import { Opponents } from './inputOpponents.js';
import { HeroesGrid } from './heroesGrid.js';
import { HeroPull } from './heroPull.js';


const opp = new Opponents();
console.log(opp);
// console.log(opp.getPlayers())

// $('#go').on('click', event => {
//     const ready = opp.shuffle();

//     console.log(ready);
// });

// const grid = new HeroesGrid();
// console.log(grid);

// grid.on('click', (evt) => {
//     console.log(evt)
// });

// const pull = new HeroPull( opp.getPlayers() );
// console.log(pull)

// pull
//     .on('click', hero => console.log(hero))
//     .on('pull', () => {
//         console.log(pull.model.players)
//         console.log(pull.model.currPlayer)
//     })
//     .on('pullEnd', () => console.log('end'));
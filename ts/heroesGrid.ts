import { EventEmitter } from './core.js';
import { HEROES } from './heroes.js';
import { Hero, GridOptions } from './types';

const colSymbol = 'abcdefghijklmnop';
const rowCount = 7;

let parentSelector = '#grid';

const gridCN = 'heroes-grid';
const _grid = `<div class="${gridCN}"></div>`;

const gridWrapCN = 'heroes-grid-wrap';
const _gridWrap = `<div class="${gridWrapCN}"></div>`;

const cellCN = 'heroes-grid__cell';
const _cell = `<div class="${cellCN}"></div>`;

const symbolCN = 'heroes-grid__symbol';
const _symbol = `<div class="${symbolCN}"></div>`;

const heroCN = 'heroes-grid__hero';
const _hero = `<img class="${heroCN}">`;


class HeroesGridModel extends EventEmitter {
    heroes: Hero[] = HEROES;

    getHero(id: string): Hero {
        return this.heroes.find(hero => hero.id == id);
    }
}

class HeroesGridView extends EventEmitter {
    _model: HeroesGridModel;

    elements = {
        $wrap: $(parentSelector),
        $grid: $(_grid)
    };

    constructor(model: HeroesGridModel) {
        super();

        this._model = model;
    }

    initGrid() {
        const $wrap = this.elements.$wrap;
        const $grid = this.elements.$grid;
        const $gridWrap = $(_gridWrap);

        $gridWrap.append($grid).appendTo($wrap);

        for (let i = -1; i <= rowCount; i++) for (let j = -1; j <= colSymbol.length; j++) {
            const $grid = this.elements.$grid;
            const $cell = $(_cell);
    
            if (i == -1 || i == rowCount) {
                if (colSymbol[j]) {
                    const $symbol = $(_symbol);
                    $symbol.text(colSymbol[j]);
                    $cell.append($symbol);
                }

            } else {
                if (j == -1 || j == colSymbol.length) {
                    const $symbol = $(_symbol);
                    $symbol.text(i + 1);
                    $cell.append($symbol);
                } else {
                    const hero = this._model.getHero(colSymbol[j] + (i + 1));
                    const $img = $(_hero);

                    $img.attr({
                        src: hero.thumb,
                        alt: hero.name,
                        'data-id': hero.id
                    });
    
                    $cell.append($img);
                }
            }

    
            $grid.append($cell);
        }
    }

    render() {
        this.initGrid();

    }
}

class HeroesGridController {
    _model: HeroesGridModel;
    _view: HeroesGridView;

    constructor(model: HeroesGridModel, view: HeroesGridView) {
        this._model = model;
        this._view = view;
    }
}

export class HeroesGrid { 
    model      = new HeroesGridModel();
    view       = new HeroesGridView(this.model);
    controller = new HeroesGridController(this.model, this.view);

    constructor(gridOpt?: GridOptions) {
        if (gridOpt) {
            if (gridOpt.parent) parentSelector = gridOpt.parent;
        }

        this.view.render();
    }
}
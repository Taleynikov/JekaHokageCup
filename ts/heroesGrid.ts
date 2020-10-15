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

const rowCN = 'heroes-grid__row';
const _row = `<div class="${rowCN}"></div>`;

const colCN = 'heroes-grid__col';
const colTargetHeroCN = 'heroes-grid__col_hover';
const colTargetSymbolCN = 'heroes-grid__col_target';
const _col = `<div class="${colCN}"></div>`;

const symbolCN = 'heroes-grid__symbol';
const _symbol = `<div class="${symbolCN}"></div>`;

const imgWrapCN = 'heroes-grid__hero';
const _imgWrap = `<div class="${imgWrapCN}"></div>`;

const imgCN = 'heroes-grid__hero-img';
const _img = `<img class="${imgCN}">`;


class HeroesGridModel extends EventEmitter {
    heroes: Hero[] = HEROES;

    getHero(id: string): Hero {
        return this.heroes.find(hero => hero.id == id);
    }
}

class HeroesGridView extends EventEmitter {
    _model: HeroesGridModel;

    elem = {
        $wrap: $(parentSelector),
        $grid: $(_grid)
    };

    constructor(model: HeroesGridModel) {
        super();

        this._model = model;

        this.elem.$grid
            .on('mouseenter', `.${colCN}`, event => this.setTarget(event.currentTarget))
            .on('mouseleave', event => this.setTarget(null))
            .on('click', `.${colCN}[data-id]`, event => this.emit('click', {
                hero: this._model.getHero( $(event.currentTarget).attr('data-id') ),
                event
            }));
    }

    setTarget(elem: HTMLElement) {
        const $target = $(`.${colCN}`);
        const id = $(elem).attr('data-id');

        $target.removeClass(`${colTargetHeroCN} ${colTargetSymbolCN}`);

        if (id) {
            const [col, row] = id.split('');
            const $hero = $target.filter(`[data-id="${id}"]`);
            const $symbol = $target.filter(`[data-target="${col}"], [data-target="${row}"]`);

            $hero.addClass(colTargetHeroCN);
            $symbol.addClass(colTargetSymbolCN);
        }
    }

    createSymbol(text: string | number): JQuery {
        const $symbol = $(_symbol);
        $symbol.text(text);

        return $symbol;
    }

    createHeroImage(hero: Hero): JQuery {
        const $imgWrap = $(_imgWrap);
        const $img = $(_img);

        $img.attr({
            src: hero.thumb,
            alt: hero.name
        });

        $imgWrap.append($img);

        return $imgWrap;
    }

    initGrid() {
        const $wrap = this.elem.$wrap;
        const $grid = this.elem.$grid;
        const $gridWrap = $(_gridWrap);

        $gridWrap.append($grid).appendTo($wrap);

        for (let i = -1; i <= rowCount; i++) {
            const $row = $(_row);

            for (let j = -1; j <= colSymbol.length; j++) {
                const $col = $(_col);
        
                if (i == -1 || i == rowCount) {
                    $col.attr('data-target', colSymbol[j]);
                    $col.append( this.createSymbol( colSymbol[j] ) );
                } else {
                    if (j == -1 || j == colSymbol.length) {
                        $col.attr('data-target', i + 1);
                        $col.append( this.createSymbol( i + 1 ) );
                    } else {
                        const hero = this._model.getHero(colSymbol[j] + (i + 1));
                        const $img = this.createHeroImage(hero);

                        $col.attr('data-id', hero.id);
        
                        $col.append($img);
                    }
                }

                $row.append($col);
            }
            $grid.append($row);
        }
    }

    render() {
        this.initGrid();
    }
}

class HeroesGridController {
    _model: HeroesGridModel;
    _view: HeroesGridView;

    click: Function;

    constructor(model: HeroesGridModel, view: HeroesGridView) {
        this._model = model;
        this._view = view;

        view.on('click', (info) => this.click(info));
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

    on(event: string, callback: Function) {
        this.controller[event] = callback;
    }
}
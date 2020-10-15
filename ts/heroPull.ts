import { EventEmitter } from './core.js';
import { HeroesGrid } from './heroesGrid.js';
import { Hero } from './types';

let parentSelector = '#heropull';

// const pullListCN = 'hero-pull-list';
// const _pullList = `<div class="${pullListCN}"></div>`;

// const pullItemCN = 'hero-pull-list__item';
// const _pullItem = `<div class="${pullItemCN}"></div>`;

const disabledGridCN = 'heroes-grid_disabled';
const disabledHeroInGridCN = 'heroes-grid__col_disabled';

class HeroPullModel extends EventEmitter {
    heroesGrid = new HeroesGrid({parent: parentSelector});
    pull: Hero[] = [];
    players: string[];
    step = 0;

    constructor(players: string[]) {
        super();

        this.players = players;
    }

    get currPlayer(): string {
        return this.players[this.step];
    }

    get pullEnded(): boolean {
        return this.step > this.players.length - 1;
    }

    addPull(hero: Hero) {
        this.pull.push(hero);
    }
}

class HeroPullView extends EventEmitter {
    _model: HeroPullModel;

    elem = {
        $wrap: $(parentSelector),
        // $list: $(_pullList)
    };

    constructor(model: HeroPullModel) {
        super();

        this._model = model;

        model.heroesGrid.on('click', opt => {
            if ( !$(opt.event.currentTarget).hasClass(disabledHeroInGridCN) ) this.emit('pullHero', opt.hero.id);
        });
    }

    disableHeroInGrid(id: string) {
        const $grid = this._model.heroesGrid.$gridElem;
        const $target = $grid.find(`[data-id="${id}"]`);

        $target.addClass(disabledHeroInGridCN);
    }

    // addHeroInPullList(id: string) {
    //     const $grid = this._model.heroesGrid.$gridElem;
    //     const $clone = $grid.find(`[data-id="${id}"]`).children().clone();
    //     const $li = this.elem.$list.children();

    //     const step = this._model.step;

    //     $li.eq(step).append($clone);
    // }

    disableGrid(cond: boolean) {
        const $grid = this._model.heroesGrid.$gridElem;

        if (cond) $grid.addClass(disabledGridCN);
        else $grid.removeClass(disabledGridCN);
    }

    render() {
        // const $list = this.elem.$list;
        // this.elem.$wrap.prepend($list);

        // this._model.players.forEach(name => $list.append($(_pullItem)));
    }
}

class HeroPullController {
    _model: HeroPullModel;
    _view: HeroPullView;

    pull = function(currPlayer: string) {};
    pullEnd = function(pull: Hero[]) {};
    click = function(hero: Hero) {};

    constructor(model: HeroPullModel, view: HeroPullView) {
        this._model = model;
        this._view = view;

        view.on('pullHero', (id: string) => this.pullHero(id));
    }

    pullHero(id: string) {
        const view = this._view;
        const model = this._model;

        const hero = model.heroesGrid.getHero(id);

        view.disableHeroInGrid(id);
        // view.addHeroInPullList(id);
        this.click(hero);

        model.step++;
        model.addPull(hero);

        if (model.pullEnded) {
            view.disableGrid(model.pullEnded);
            model.heroesGrid.view.setTarget(null);

            this.pullEnd(this._model.pull);
        } else {
            this.pull(model.currPlayer);
        }
    }
}

export class HeroPull { 
    model: HeroPullModel;
    view: HeroPullView;
    controller : HeroPullController;

    constructor(players: string[]) {
        this.model      = new HeroPullModel(players);
        this.view       = new HeroPullView(this.model);
        this.controller = new HeroPullController(this.model, this.view);

        this.view.render();
    }

    on(event: string, callback: Function) {
        this.controller[event] = callback;
        return this;
    }
}
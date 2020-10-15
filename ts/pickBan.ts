import { EventEmitter } from './core.js';
import { HeroesGrid } from './heroesGrid.js';
import { Hero, Player } from './types';

let parentSelector = '#PickBan';

// const pullListCN = 'hero-pull-list';
// const _pullList = `<div class="${pullListCN}"></div>`;

// const pullItemCN = 'hero-pull-list__item';
// const _pullItem = `<div class="${pullItemCN}"></div>`;

// const disabledGridCN = 'heroes-grid_disabled';
// const disabledHeroInGridCN = 'heroes-grid__col_disabled';

class PickBanModel extends EventEmitter {
    heroesGrid = new HeroesGrid({parent: parentSelector});

    constructor(players: string[], pull: Hero[]) {
        super();
    }
}

class PickBanView extends EventEmitter {
    _model: PickBanModel;

    elem = {
        $wrap: $(parentSelector)
    };

    constructor(model: PickBanModel) {
        super();

        this._model = model;
    }

    render() {
    }
}

class PickBanController {
    _model: PickBanModel;
    _view: PickBanView;

    pull = function(currPlayer: string) {};
    pullEnd = function(pull: Hero[]) {};
    click = function(hero: Hero) {};

    constructor(model: PickBanModel, view: PickBanView) {
        this._model = model;
        this._view = view;
    }
}

export class PickBan { 
    model: PickBanModel;
    view: PickBanView;
    controller : PickBanController;

    constructor(players: string[], pull: Hero[]) {
        this.model      = new PickBanModel(players, pull);
        this.view       = new PickBanView(this.model);
        this.controller = new PickBanController(this.model, this.view);

        this.view.render();
    }

    on(event: string, callback: Function) {
        this.controller[event] = callback;
        return this;
    }
}
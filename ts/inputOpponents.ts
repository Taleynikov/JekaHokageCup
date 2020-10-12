import { EventEmitter } from './core.js';

const wrap = '#inputnames';

const inputCN = 'input';
const _input = `<input class="${inputCN}">`;

const inputItemCN = 'item';
const _inputItem = `<div class="${inputItemCN}">${_input}</div>`;

const matchupItemCN = 'matchup';
const _matchupItem = `<div class="${matchupItemCN}">${_inputItem}${_inputItem}</div>`;

const matchupGridCN = 'matchup';
const _matchupGrid = `<div class="${matchupItemCN}"></div>`;

class OpponentsModel extends EventEmitter {
    data: string[] = [];
    result: Array<[string, string]> = [];

    constructor() {
        super();

        // this.data = null;
    }
}

class OpponentsView extends EventEmitter {
    _model: OpponentsModel;

    elements = {
        $wrap: $(wrap),
        $grid: $(_matchupGrid)
    };

    constructor(model: OpponentsModel) {
        super();

        this._model = model;
    }

    addMatchupElem(): void {
        const inputSelector = `.${inputCN}`;

        let count = $(inputSelector).length;
        const $item = $(_matchupItem);
        const $input = $item.find(inputSelector);

        $input.each((i, el) => { $(el).attr('data-index', count++) });

        this.elements.$grid.append($item);
    }

    render(): void {
        $(wrap).append(this.elements.$grid);
    }
}

class OpponentsController {
    _model: OpponentsModel;
    _view: OpponentsView;

    constructor(model: OpponentsModel, view: OpponentsView) {
        this._model = model;
        this._view = view;
    }

    addMatchup(): void {
        this._view.addMatchupElem();
    }
}

export class Opponents { 
    model      = new OpponentsModel();
    view       = new OpponentsView(this.model);
    controller = new OpponentsController(this.model, this.view);

    constructor() {
        this.view.render();

        this.controller.addMatchup();
        this.controller.addMatchup();
    }
}
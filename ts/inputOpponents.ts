import { EventEmitter, shuffle } from './core.js';

const parentSelector = '#inputnames';

const inputAreaPlc = 'Input name';
const inputAreaCN = 'opponents__input';
const _inputArea = `<input type="text" class="${inputAreaCN}" placegolder="${inputAreaPlc}">`;

const itemNameCN = 'opponents-item__name';
const _itemName = `<span class="${itemNameCN}"></span>`;

const itemRemoveCN = 'opponents-item__Remove';
const _itemRemove = `<span class="${itemRemoveCN}">[X]</span>`;

const itemCN = 'opponents-item';
const _item = `<div class="${itemCN}">${_itemName}${_itemRemove}</div>`;

const itemListCN = 'opponents-list';
const _itemList = `<div class="${itemListCN}"></div>`;

const inputWrapCN = 'opponents';
const _inputWrap = `<div class="${inputWrapCN}"></div>`;


class OpponentsModel extends EventEmitter {
    players: string[] = [];
    result: Array<[string, string]> = [];

    addName(name: string) {
        this.players.push(name);
    }

    removeName(name: string) {
        const index = this.players.indexOf(name);

        this.players.splice(index, 1);
    }
}

class OpponentsView extends EventEmitter {
    _model: OpponentsModel;

    elements = {
        $wrap: $(_inputWrap),
        $list: $(_itemList),
        $input: $(_inputArea)
    };

    constructor(model: OpponentsModel) {
        super();

        this._model = model;

        this.elements.$input.on('keydown', event => this.emit('inputHandler', event));
        this.elements.$list.on('click', `.${itemRemoveCN}`, event => this.emit('removeItem', this.getItemText(event.target)));
    }

    getItemText(elem: HTMLElement): string {
        return $(elem).closest(`.${itemCN}`).find(`.${itemNameCN}`).text();
    }

    clearInput() {
        this.elements.$input.val('');
    }

    addItemElem(name: string) {
        const $item = $(_item);
        const $name = $item.find(`.${itemNameCN}`);

        $name.text(name);

        this.elements.$list.append($item);
    }

    removeItemElem(name: string) {
        const $list = this.elements.$list;
        const $target = $list.find(`*:contains('${name}')`);

        $target.remove();
    }

    render() {
        const $parent = $(parentSelector);
        const $wrap = this.elements.$wrap;
        const $list = this.elements.$list;
        const $input = this.elements.$input;

        $wrap.append($list).append($input).appendTo($parent);
    }
}

class OpponentsController {
    _model: OpponentsModel;
    _view: OpponentsView;

    constructor(model: OpponentsModel, view: OpponentsView) {
        this._model = model;
        this._view = view;

        view.on('addItem', (name: string) => this.addItem(name));
        view.on('removeItem', (name: string) => this.removeItem(name));
        view.on('inputHandler', (event) => this.inputHandler(event));
    }

    inputHandler(event) {
        const key = event.key;
        const keyCode = event.keyCode;
        const value = event.target.value;

        if (key == 'Enter' || keyCode == 13) {
            this.addItem(value);
            this._view.clearInput();
        }
    }

    addItem(name: string) {
        this._model.addName(name);
        this._view.addItemElem(name);
    }

    removeItem(name: string) {
        this._model.removeName(name);
        this._view.removeItemElem(name);
    }

    shuffle(): {left: Array<[string, string]>, right: Array<[string, string]>} {
        const shuffled = shuffle(this._model.players);
        const left = makeMatchup(shuffled);
        const right = makeMatchup( shuffled.concat( shuffled.splice(0, shuffled.length - 1) ) );

        function makeMatchup(names: string[]) {
            let temp = [];
            let group = [];

            names.forEach((el, i) => {
                temp.push(el);
    
                if (temp.length == 2) {
                    group.push(temp.map(n => n));
                    temp = [];
                }
            });

            return group;
        }

        return {left, right};
    }
}

export class Opponents { 
    model: OpponentsModel;
    view: OpponentsView;
    controller: OpponentsController;

    constructor() {
        this.model      = new OpponentsModel();
        this.view       = new OpponentsView(this.model);
        this.controller = new OpponentsController(this.model, this.view);

        this.view.render();

        this.controller.addItem('dima');
        this.controller.addItem('sanya');
        this.controller.addItem('igor');
        this.controller.addItem('makc');
        this.controller.addItem('katya');
        this.controller.addItem('polina');
        this.controller.addItem('nataha');
        this.controller.addItem('pati');
    }

    getPlayers(): string[] {
        return this.model.players.map(n => n);
    }

    shuffle() {
        return this.controller.shuffle();
    }
}
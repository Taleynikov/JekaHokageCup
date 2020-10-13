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
    data: string[] = [];
    result: Array<[string, string]> = [];

    addName(name: string) {
        this.data.push(name);
    }

    removeName(name: string) {
        const index = this.data.indexOf(name);

        this.data.splice(index, 1);
    }

    shuffle(): Array<[string, string]> {
        const shuffled = shuffle(this.data);
        const matchup = [];

        let group = [];

        shuffled.forEach((el, i) => {
            group.push(el);

            if (group.length == 2) {
                matchup.push(group.map(n => n));
                group = [];
            }
        });

        return matchup;
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
}

export class Opponents { 
    model      = new OpponentsModel();
    view       = new OpponentsView(this.model);
    controller = new OpponentsController(this.model, this.view);

    constructor() {
        this.view.render();

        this.controller.addItem('test1');
        this.controller.addItem('test2');
        this.controller.addItem('test3');
        this.controller.addItem('test4');
        this.controller.addItem('test5');
        this.controller.addItem('test6');
        this.controller.addItem('test7');
    }

    shuffle() {
        return this.model.shuffle();
    }
}
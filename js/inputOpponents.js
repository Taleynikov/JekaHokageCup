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
    constructor() {
        super(...arguments);
        this.data = [];
        this.result = [];
    }
    addName(name) {
        this.data.push(name);
    }
    removeName(name) {
        const index = this.data.indexOf(name);
        this.data.splice(index, 1);
    }
    shuffle() {
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
    constructor(model) {
        super();
        this.elements = {
            $wrap: $(_inputWrap),
            $list: $(_itemList),
            $input: $(_inputArea)
        };
        this._model = model;
        this.elements.$input.on('keydown', event => this.emit('inputHandler', event));
        this.elements.$list.on('click', `.${itemRemoveCN}`, event => this.emit('removeItem', this.getItemText(event.target)));
    }
    getItemText(elem) {
        return $(elem).closest(`.${itemCN}`).find(`.${itemNameCN}`).text();
    }
    clearInput() {
        this.elements.$input.val('');
    }
    addItemElem(name) {
        const $item = $(_item);
        const $name = $item.find(`.${itemNameCN}`);
        $name.text(name);
        this.elements.$list.append($item);
    }
    removeItemElem(name) {
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
    constructor(model, view) {
        this._model = model;
        this._view = view;
        view.on('addItem', (name) => this.addItem(name));
        view.on('removeItem', (name) => this.removeItem(name));
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
    addItem(name) {
        this._model.addName(name);
        this._view.addItemElem(name);
    }
    removeItem(name) {
        this._model.removeName(name);
        this._view.removeItemElem(name);
    }
}
export class Opponents {
    constructor() {
        this.model = new OpponentsModel();
        this.view = new OpponentsView(this.model);
        this.controller = new OpponentsController(this.model, this.view);
        this.view.render();
    }
    shuffle() {
        return this.model.shuffle();
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBRUQsTUFBTSxPQUFPLFNBQVM7SUFLbEI7UUFKQSxVQUFLLEdBQVEsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNsQyxTQUFJLEdBQVMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLGVBQVUsR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR3hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNKIiwiZmlsZSI6ImlucHV0T3Bwb25lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBzaHVmZmxlIH0gZnJvbSAnLi9jb3JlLmpzJztcclxuXHJcbmNvbnN0IHBhcmVudFNlbGVjdG9yID0gJyNpbnB1dG5hbWVzJztcclxuXHJcbmNvbnN0IGlucHV0QXJlYVBsYyA9ICdJbnB1dCBuYW1lJztcclxuY29uc3QgaW5wdXRBcmVhQ04gPSAnb3Bwb25lbnRzX19pbnB1dCc7XHJcbmNvbnN0IF9pbnB1dEFyZWEgPSBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCIke2lucHV0QXJlYUNOfVwiIHBsYWNlZ29sZGVyPVwiJHtpbnB1dEFyZWFQbGN9XCI+YDtcclxuXHJcbmNvbnN0IGl0ZW1OYW1lQ04gPSAnb3Bwb25lbnRzLWl0ZW1fX25hbWUnO1xyXG5jb25zdCBfaXRlbU5hbWUgPSBgPHNwYW4gY2xhc3M9XCIke2l0ZW1OYW1lQ059XCI+PC9zcGFuPmA7XHJcblxyXG5jb25zdCBpdGVtUmVtb3ZlQ04gPSAnb3Bwb25lbnRzLWl0ZW1fX1JlbW92ZSc7XHJcbmNvbnN0IF9pdGVtUmVtb3ZlID0gYDxzcGFuIGNsYXNzPVwiJHtpdGVtUmVtb3ZlQ059XCI+W1hdPC9zcGFuPmA7XHJcblxyXG5jb25zdCBpdGVtQ04gPSAnb3Bwb25lbnRzLWl0ZW0nO1xyXG5jb25zdCBfaXRlbSA9IGA8ZGl2IGNsYXNzPVwiJHtpdGVtQ059XCI+JHtfaXRlbU5hbWV9JHtfaXRlbVJlbW92ZX08L2Rpdj5gO1xyXG5cclxuY29uc3QgaXRlbUxpc3RDTiA9ICdvcHBvbmVudHMtbGlzdCc7XHJcbmNvbnN0IF9pdGVtTGlzdCA9IGA8ZGl2IGNsYXNzPVwiJHtpdGVtTGlzdENOfVwiPjwvZGl2PmA7XHJcblxyXG5jb25zdCBpbnB1dFdyYXBDTiA9ICdvcHBvbmVudHMnO1xyXG5jb25zdCBfaW5wdXRXcmFwID0gYDxkaXYgY2xhc3M9XCIke2lucHV0V3JhcENOfVwiPjwvZGl2PmA7XHJcblxyXG5cclxuY2xhc3MgT3Bwb25lbnRzTW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgZGF0YTogc3RyaW5nW10gPSBbXTtcclxuICAgIHJlc3VsdDogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4gPSBbXTtcclxuXHJcbiAgICBhZGROYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZU5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuaW5kZXhPZihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2h1ZmZsZSgpOiBBcnJheTxbc3RyaW5nLCBzdHJpbmddPiB7XHJcbiAgICAgICAgY29uc3Qgc2h1ZmZsZWQgPSBzaHVmZmxlKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgY29uc3QgbWF0Y2h1cCA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgZ3JvdXAgPSBbXTtcclxuXHJcbiAgICAgICAgc2h1ZmZsZWQuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgZ3JvdXAucHVzaChlbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ3JvdXAubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNodXAucHVzaChncm91cC5tYXAobiA9PiBuKSk7XHJcbiAgICAgICAgICAgICAgICBncm91cCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXRjaHVwO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPcHBvbmVudHNWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIF9tb2RlbDogT3Bwb25lbnRzTW9kZWw7XHJcblxyXG4gICAgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgJHdyYXA6ICQoX2lucHV0V3JhcCksXHJcbiAgICAgICAgJGxpc3Q6ICQoX2l0ZW1MaXN0KSxcclxuICAgICAgICAkaW5wdXQ6ICQoX2lucHV0QXJlYSlcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZWw6IE9wcG9uZW50c01vZGVsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy4kaW5wdXQub24oJ2tleWRvd24nLCBldmVudCA9PiB0aGlzLmVtaXQoJ2lucHV0SGFuZGxlcicsIGV2ZW50KSk7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy4kbGlzdC5vbignY2xpY2snLCBgLiR7aXRlbVJlbW92ZUNOfWAsIGV2ZW50ID0+IHRoaXMuZW1pdCgncmVtb3ZlSXRlbScsIHRoaXMuZ2V0SXRlbVRleHQoZXZlbnQudGFyZ2V0KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1UZXh0KGVsZW06IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJChlbGVtKS5jbG9zZXN0KGAuJHtpdGVtQ059YCkuZmluZChgLiR7aXRlbU5hbWVDTn1gKS50ZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLiRpbnB1dC52YWwoJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW1FbGVtKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0ICRpdGVtID0gJChfaXRlbSk7XHJcbiAgICAgICAgY29uc3QgJG5hbWUgPSAkaXRlbS5maW5kKGAuJHtpdGVtTmFtZUNOfWApO1xyXG5cclxuICAgICAgICAkbmFtZS50ZXh0KG5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLiRsaXN0LmFwcGVuZCgkaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbUVsZW0obmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgJGxpc3QgPSB0aGlzLmVsZW1lbnRzLiRsaXN0O1xyXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkbGlzdC5maW5kKGAqOmNvbnRhaW5zKCcke25hbWV9JylgKTtcclxuXHJcbiAgICAgICAgJHRhcmdldC5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgJHBhcmVudCA9ICQocGFyZW50U2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0ICR3cmFwID0gdGhpcy5lbGVtZW50cy4kd3JhcDtcclxuICAgICAgICBjb25zdCAkbGlzdCA9IHRoaXMuZWxlbWVudHMuJGxpc3Q7XHJcbiAgICAgICAgY29uc3QgJGlucHV0ID0gdGhpcy5lbGVtZW50cy4kaW5wdXQ7XHJcblxyXG4gICAgICAgICR3cmFwLmFwcGVuZCgkbGlzdCkuYXBwZW5kKCRpbnB1dCkuYXBwZW5kVG8oJHBhcmVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE9wcG9uZW50c0NvbnRyb2xsZXIge1xyXG4gICAgX21vZGVsOiBPcHBvbmVudHNNb2RlbDtcclxuICAgIF92aWV3OiBPcHBvbmVudHNWaWV3O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsOiBPcHBvbmVudHNNb2RlbCwgdmlldzogT3Bwb25lbnRzVmlldykge1xyXG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XHJcblxyXG4gICAgICAgIHZpZXcub24oJ2FkZEl0ZW0nLCAobmFtZTogc3RyaW5nKSA9PiB0aGlzLmFkZEl0ZW0obmFtZSkpO1xyXG4gICAgICAgIHZpZXcub24oJ3JlbW92ZUl0ZW0nLCAobmFtZTogc3RyaW5nKSA9PiB0aGlzLnJlbW92ZUl0ZW0obmFtZSkpO1xyXG4gICAgICAgIHZpZXcub24oJ2lucHV0SGFuZGxlcicsIChldmVudCkgPT4gdGhpcy5pbnB1dEhhbmRsZXIoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEhhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XHJcbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT0gJ0VudGVyJyB8fCBrZXlDb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcuY2xlYXJJbnB1dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX21vZGVsLmFkZE5hbWUobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fdmlldy5hZGRJdGVtRWxlbShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX21vZGVsLnJlbW92ZU5hbWUobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fdmlldy5yZW1vdmVJdGVtRWxlbShuYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9wcG9uZW50cyB7IFxyXG4gICAgbW9kZWwgICAgICA9IG5ldyBPcHBvbmVudHNNb2RlbCgpO1xyXG4gICAgdmlldyAgICAgICA9IG5ldyBPcHBvbmVudHNWaWV3KHRoaXMubW9kZWwpO1xyXG4gICAgY29udHJvbGxlciA9IG5ldyBPcHBvbmVudHNDb250cm9sbGVyKHRoaXMubW9kZWwsIHRoaXMudmlldyk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNodWZmbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuc2h1ZmZsZSgpO1xyXG4gICAgfVxyXG59Il19

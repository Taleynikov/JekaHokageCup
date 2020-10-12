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
    constructor() {
        super();
        this.data = [];
        this.result = [];
        // this.data = null;
    }
}
class OpponentsView extends EventEmitter {
    constructor(model) {
        super();
        this.elements = {
            $wrap: $(wrap),
            $grid: $(_matchupGrid)
        };
        this._model = model;
    }
    addMatchupElem() {
        const inputSelector = `.${inputCN}`;
        let count = $(inputSelector).length;
        const $item = $(_matchupItem);
        const $input = $item.find(inputSelector);
        $input.each((i, el) => { $(el).attr('data-index', count++); });
        this.elements.$grid.append($item);
    }
    render() {
        $(wrap).append(this.elements.$grid);
    }
}
class OpponentsController {
    constructor(model, view) {
        this._model = model;
        this._view = view;
    }
    addMatchup() {
        this._view.addMatchupElem();
    }
}
export class Opponents {
    constructor() {
        this.model = new OpponentsModel();
        this.view = new OpponentsView(this.model);
        this.controller = new OpponentsController(this.model, this.view);
        this.view.render();
        this.controller.addMatchup();
        this.controller.addMatchup();
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUNKIiwiZmlsZSI6ImlucHV0T3Bwb25lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnLi9jb3JlLmpzJztcclxuXHJcbmNvbnN0IHdyYXAgPSAnI2lucHV0bmFtZXMnO1xyXG5cclxuY29uc3QgaW5wdXRDTiA9ICdpbnB1dCc7XHJcbmNvbnN0IF9pbnB1dCA9IGA8aW5wdXQgY2xhc3M9XCIke2lucHV0Q059XCI+YDtcclxuXHJcbmNvbnN0IGlucHV0SXRlbUNOID0gJ2l0ZW0nO1xyXG5jb25zdCBfaW5wdXRJdGVtID0gYDxkaXYgY2xhc3M9XCIke2lucHV0SXRlbUNOfVwiPiR7X2lucHV0fTwvZGl2PmA7XHJcblxyXG5jb25zdCBtYXRjaHVwSXRlbUNOID0gJ21hdGNodXAnO1xyXG5jb25zdCBfbWF0Y2h1cEl0ZW0gPSBgPGRpdiBjbGFzcz1cIiR7bWF0Y2h1cEl0ZW1DTn1cIj4ke19pbnB1dEl0ZW19JHtfaW5wdXRJdGVtfTwvZGl2PmA7XHJcblxyXG5jb25zdCBtYXRjaHVwR3JpZENOID0gJ21hdGNodXAnO1xyXG5jb25zdCBfbWF0Y2h1cEdyaWQgPSBgPGRpdiBjbGFzcz1cIiR7bWF0Y2h1cEl0ZW1DTn1cIj48L2Rpdj5gO1xyXG5cclxuY2xhc3MgT3Bwb25lbnRzTW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgZGF0YTogc3RyaW5nW10gPSBbXTtcclxuICAgIHJlc3VsdDogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPcHBvbmVudHNWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIF9tb2RlbDogT3Bwb25lbnRzTW9kZWw7XHJcblxyXG4gICAgZWxlbWVudHMgPSB7XHJcbiAgICAgICAgJHdyYXA6ICQod3JhcCksXHJcbiAgICAgICAgJGdyaWQ6ICQoX21hdGNodXBHcmlkKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogT3Bwb25lbnRzTW9kZWwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1hdGNodXBFbGVtKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGlucHV0U2VsZWN0b3IgPSBgLiR7aW5wdXRDTn1gO1xyXG5cclxuICAgICAgICBsZXQgY291bnQgPSAkKGlucHV0U2VsZWN0b3IpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCAkaXRlbSA9ICQoX21hdGNodXBJdGVtKTtcclxuICAgICAgICBjb25zdCAkaW5wdXQgPSAkaXRlbS5maW5kKGlucHV0U2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAkaW5wdXQuZWFjaCgoaSwgZWwpID0+IHsgJChlbCkuYXR0cignZGF0YS1pbmRleCcsIGNvdW50KyspIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLiRncmlkLmFwcGVuZCgkaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgICQod3JhcCkuYXBwZW5kKHRoaXMuZWxlbWVudHMuJGdyaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPcHBvbmVudHNDb250cm9sbGVyIHtcclxuICAgIF9tb2RlbDogT3Bwb25lbnRzTW9kZWw7XHJcbiAgICBfdmlldzogT3Bwb25lbnRzVmlldztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbDogT3Bwb25lbnRzTW9kZWwsIHZpZXc6IE9wcG9uZW50c1ZpZXcpIHtcclxuICAgICAgICB0aGlzLl9tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1hdGNodXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdmlldy5hZGRNYXRjaHVwRWxlbSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3Bwb25lbnRzIHsgXHJcbiAgICBtb2RlbCAgICAgID0gbmV3IE9wcG9uZW50c01vZGVsKCk7XHJcbiAgICB2aWV3ICAgICAgID0gbmV3IE9wcG9uZW50c1ZpZXcodGhpcy5tb2RlbCk7XHJcbiAgICBjb250cm9sbGVyID0gbmV3IE9wcG9uZW50c0NvbnRyb2xsZXIodGhpcy5tb2RlbCwgdGhpcy52aWV3KTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlci5hZGRNYXRjaHVwKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmFkZE1hdGNodXAoKTtcclxuICAgIH1cclxufSJdfQ==

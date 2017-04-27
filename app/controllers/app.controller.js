import './../utils/utils';
import Config from '../config/app.config'


class Controller {

    constructor(model, view) {

        log('app.controller');

        view.Observable.gravity.oninput = function () {

            let value = view.Observable.gravity.childNodes[1].value;

            let g = parseFloat(value);

            if (g === undefined || g === null || g === '') return;

            Config.gravity = g;

        };

        view.Observable.nof_shapes_per_second.oninput = function () {

            let value = view.Observable.nof_shapes_per_second.childNodes[1].value;

            let s = parseFloat(value);

            if (s === undefined || s === null || s === '') return;

            Config.nof_shapes_per_second = s;

        };

        model.newShapePositions.click = function (e) {

            let shape = model.getRandomShape(e.data.global.x, e.data.global.y);

            model.appCanvas.stage.addChild(shape);

        };

    }

}

export default Controller;
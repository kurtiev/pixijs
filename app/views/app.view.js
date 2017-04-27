import './../utils/utils';
var PIXI = require("pixi.js");

import Config from './../config/app.config';

class View {

    nof_shapes_per_second;
    surface_area;


    Observable = {
        nof_shapes_per_second: null,
        gravity: null
    };

    constructor(model = [], node = 'app') {
        log('app.view');
        this.render(model, node);
    }


    renderInfoPanel = (nof_shapes_per_second = 0, surface_area = 0) => {

        let parent = document.createElement("div");

        this.nof_shapes_per_second = document.createElement("div");
        this.nof_shapes_per_second.className = 'width-50-percent';
        this.nof_shapes_per_second.innerHTML = `Number of current shapes: ${nof_shapes_per_second}`;

        this.surface_area = document.createElement("div");
        this.surface_area.className = 'width-50-percent';
        this.surface_area.innerHTML = `Surface area occupied by shapes: ${surface_area}`;

        parent.appendChild(this.nof_shapes_per_second);
        parent.appendChild(this.surface_area);

        return parent;
    };

    renderControlsPanel = (nof_shapes_per_second = 0, gravity = 0) => {

        let parent = document.createElement("div");

        // input for shaper pre seconds
        let input_shapes = document.createElement("input");
        input_shapes.type = "number";
        input_shapes.value = nof_shapes_per_second;

        let controlPanel_nof_shapes_per_second = document.createElement("div");
        controlPanel_nof_shapes_per_second.className = 'width-50-percent';
        controlPanel_nof_shapes_per_second.innerHTML = `Number of shapes per second:`;
        controlPanel_nof_shapes_per_second.appendChild(input_shapes);


        // input for gravity
        let input_gravity = document.createElement("input");
        input_gravity.type = "number";
        input_gravity.value = gravity;

        let controlPanel_gravity = document.createElement("div");
        controlPanel_gravity.className = 'width-50-percent';
        controlPanel_gravity.innerHTML = `Gravity value:`;
        controlPanel_gravity.appendChild(input_gravity);


        parent.appendChild(controlPanel_nof_shapes_per_second);
        parent.appendChild(controlPanel_gravity);

        this.Observable.nof_shapes_per_second = controlPanel_nof_shapes_per_second;
        this.Observable.gravity = controlPanel_gravity;

        return parent;
    };

    renderCanvasPanel = (model) => {


        let _set_nof_shapes = (val) => {
            this.nof_shapes_per_second.innerHTML = `Number of current shapes: ${val}`
        };

        let _set_surface_area = (val) => {
            this.surface_area.innerHTML = `Surface area occupied by shapes: ${val}`;
        };


        // let fps = 60; // max 60

        let runAnimation = () => {

            model.shapes.forEach((v, k) => {
                if (Config.gravity !== 0 && Config.gravity) {
                    v.y += Config.gravity;
                }

                if ((v.y - v.height / 2) > Config.canvas.height) {
                    model.shapes.splice(k, 1);
                    v.clear();
                }
            });

            let pixels = model.appCanvas.renderer.extract.pixels(model.appCanvas.stage);
            let surface_area = 0;

            for (var i = 0; i < pixels.length; i += 4) {
                if (pixels[i] && pixels[i] !== 51 &&
                    pixels[i + 1] !== 51 &&
                    pixels[i + 2] !== 51) {
                    surface_area++
                }
            }


            _set_nof_shapes(model.shapes.length);
            _set_surface_area(surface_area);


            // setTimeout(function () {
            // requestAnimationFrame(runAnimation);
            // }, 1000 / fps);

        };


        // timeout for creation new shapes
        let clearShapeInterval;

        let shapeCreateInterval = () => {

            if (clearShapeInterval) {
                clearInterval(clearShapeInterval);
            }

            if (!parseInt(Config.nof_shapes_per_second) && Config.nof_shapes_per_second < 0) return;

            clearShapeInterval = setInterval(() => {

                if (!Config.nof_shapes_per_second || !Config.gravity) return;

                let shape = model.getRandomShape();

                model.appCanvas.stage.addChild(shape);

                shapeCreateInterval();

            }, 1000 / Config.nof_shapes_per_second);
        };

        shapeCreateInterval();

        // requestAnimationFrame(runAnimation);
        model.appCanvas.ticker.add(runAnimation);


        return model.appCanvas.view;


    };

    render = (model, node) => {


        let infoPanelNode = this.renderInfoPanel(this.nof_shapes_per_second, this.surface_area);
        let canvasNode = this.renderCanvasPanel(model);
        let controlsNode = this.renderControlsPanel(Config.nof_shapes_per_second, Config.gravity);

        let mainNode = document.createElement("div");
        mainNode.append(infoPanelNode);
        mainNode.append(canvasNode);
        mainNode.append(controlsNode);
        mainNode.className = 'container';


        document.body.innerHTML = null;
        document.body.appendChild(mainNode);

    }

}

export default View
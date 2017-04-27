import './../utils/utils';
var PIXI = require("pixi.js");
import Config from './../config/app.config';


class Model {
    constructor() {
        log('app.model');

        this.appCanvas = new PIXI.Application(Config.canvas.width, Config.canvas.height, {antialias: true});

        let back = new PIXI.Graphics();
        back.drawRect(0, 0, Config.canvas.width, Config.canvas.height);
        back.endFill();
        let texture = back.generateTexture();
        this.newShapePositions = new PIXI.Sprite(texture);
        this.newShapePositions.interactive = true;
        this.appCanvas.stage.addChild(this.newShapePositions);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Shape types:
    shapeTypes = {
        getCircle: (x, y) => {
            let graphic = new PIXI.Graphics();

            graphic.lineStyle(0);
            graphic.beginFill(this.getRandomColor(), 1);
            graphic.drawCircle(0, 0, 50);
            if (!x || !y) {
                graphic.y = -(graphic.height);
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.y = y;
                graphic.x = x;
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();

            return graphic
        },

        getEllipse: (x, y) => {
            let graphic = new PIXI.Graphics();
            graphic.beginFill(this.getRandomColor(), 1);
            graphic.drawEllipse(0, 0, 50, 25);
            if (!x || !y) {
                graphic.y = -(graphic.height);
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.y = y;
                graphic.x = x;
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();
            return graphic
        },
        // 3 sides
        getTriangle: (x, y) => {
            let graphic = new PIXI.Graphics();
            graphic.beginFill(this.getRandomColor(), 1);
            graphic.drawPolygon([
                -32, 64,
                32, 64,
                0, 0
            ]);
            if (!x || !y) {
                graphic.y = -(graphic.height);
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.y = y;
                graphic.x = x;
                graphic.y = graphic.y - 32;
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();
            return graphic

        },
        // 4 sides
        getSquare: (x, y) => {
            let graphic = new PIXI.Graphics();
            graphic.beginFill(this.getRandomColor(), 1);
            if (!x || !y) {
                graphic.drawRect(0, 0, 100, 100);
                graphic.y = -(graphic.height);
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.drawRect(-50, -50, 100, 100);
                graphic.y = y;
                graphic.x = x;
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();
            return graphic
        },
        // 5 sides
        getPentahedron: (x, y) => {

            let graphic = new PIXI.Graphics();
            graphic.beginFill(this.getRandomColor(), 1);


            graphic.drawPolygon([60, 0, 120, 45, 90, 115, 25, 115, 0, 45]);

            if (!x || !y) {
                graphic.y = -(graphic.height);
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.y = y;
                graphic.x = x;
                graphic.y = graphic.y - 60;
                graphic.x = graphic.x - 60;
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();

            return graphic
        },
        // 6 sides
        getHexahedron: (x, y) => {

            let radius = 50;
            let half_r = radius / 2;

            let graphic = new PIXI.Graphics();
            graphic.beginFill(this.getRandomColor(), 1);

            graphic.moveTo(radius + half_r, radius);
            graphic.lineTo(((radius * 3) + half_r), radius);
            graphic.lineTo((radius * 4), radius * 2);
            graphic.lineTo(((radius * 3) + half_r), radius * 3);
            graphic.lineTo(radius + half_r, radius * 3);
            graphic.lineTo(radius, radius * 2);

            if (!x || !y) {
                graphic.y = -((graphic.height) + (radius));
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.y = y;
                graphic.x = x;
                graphic.y = (graphic.y) - (radius * 2);
                graphic.x = (graphic.x) - (radius * 2) - (radius / 2);
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();

            return graphic
        },
        getCloud: (x, y) => {

            let graphic = new PIXI.Graphics();

            graphic.beginFill(this.getRandomColor(), 1);
            graphic.moveTo(22, 11);
            graphic.arcTo(35, -20, 53, 11, 15);
            graphic.arcTo(81, 20, 60, 48, 15);
            graphic.arcTo(57, 74, 25, 61, 25);
            graphic.arcTo(-4, 69, 4, 35, 15);
            graphic.arcTo(-2, 11, 22, 11, 15);
            if (!x || !y) {
                graphic.y = -(graphic.height + graphic.height);
                graphic.x = Math.floor(Math.random() * (Config.canvas.width));
            } else {
                graphic.y = y;
                graphic.x = x;
                graphic.x = graphic.x - 30;
                graphic.y = graphic.y - 30;
            }
            graphic.interactive = true;
            graphic.buttonMode = true;
            graphic.on('click', () => {
                graphic.clear();
            });
            graphic.endFill();

            return graphic
        }
    };


    getRandomShape = (x = 0, y = 0) => {

        let properties = ['getCircle', 'getEllipse', 'getTriangle', 'getSquare', 'getPentahedron', 'getCloud', 'getHexahedron'];

        let index = Math.floor(Math.random() * properties.length);

        let graphic = this.shapeTypes[properties[index]](x, y);

        this.shapes.push(graphic);
        this.shapes[this.shapes.length - 1].index = this.shapes.length - 1;

        return graphic;
    };

    // will contain all shapes from canvas
    shapes = [];
}

export default Model
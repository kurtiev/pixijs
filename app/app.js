import './styles/styles.scss';
import  './utils/utils';


import Model from './models/app.model';
import View from './views/app.view';
import Controller from './controllers/app.controller';


let bootstrap = function () {
    log('bootstrap');

    let model = new Model();
    let view = new View(model, 'app');
    let controller = new Controller(model, view);
};

window.onload = bootstrap;




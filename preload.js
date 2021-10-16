const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
        'controllers', {
                loadController(controllerName) {
                        require( `${__dirname}/controllers/${controllerName}/${controllerName}.js`);   //Chemin du controller (sera tjrs le même)
                }
        }
);

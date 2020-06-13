const colorController = require('../controllers/colorController');
const modelController = require('../controllers/modelController');

module.exports = (router) => {
  router
    .post('/admin/addColor', colorController.addColor)
    .get('/admin/getColors', colorController.getColors)
    .post('/admin/addModel', modelController.addModel)
    .get('/admin/getModels', modelController.getModels)
    .get('/admin/getModel', modelController.getModel)
    .post('/admin/addModelColor', modelController.addColorToModel)
};

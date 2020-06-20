const colorController = require('../controllers/colorController');
const modelController = require('../controllers/modelController');
const actionController = require('../controllers/actionController');

module.exports = (router) => {
  router
    .post('/admin/addColor', colorController.addColor)
    .get('/admin/getColors', colorController.getColors)
    .post('/admin/addModel', modelController.addModel)
    .get('/admin/getModels', modelController.getModels)
    .get('/admin/getModel', modelController.getModel)
    .post('/admin/addModelColor', modelController.addColorToModel)
    .post('/admin/images/upload', modelController.uploadImages)
    .post('/admin/images/delete', modelController.deleteImage)
    .post('/admin/setSell', actionController.setSell)
    .get('/admin/sellStatistic', actionController.getAllSellerStatistics)
    .post('/admin/cancelPurchase', actionController.cancelPurchase)
};

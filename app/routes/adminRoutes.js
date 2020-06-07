const colorController = require('../controllers/colorController');

module.exports = (router) => {
  router
    .post('/admin/addColor', colorController.addColor)
};

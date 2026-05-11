const propertyRouter = require('express').Router();
const propCtrl = require('./property.controller');
const auth = require('../middleware/auth.middleware');
const uploader = require('../middleware/uploader.middleware');
const bodyValidator = require('../middleware/auth.validator');
const { propertyDTO, updatePropertyDTO } = require('./property.validator');

propertyRouter.route('/')
    .post(
        auth, 
        uploader().array("images", 5), // Handles multiple property photos
        bodyValidator(propertyDTO), 
        propCtrl.createProperty
    )
    .get(propCtrl.getAllProperty);

// Route for "/:id"
propertyRouter.route('/:id')
    .get(propCtrl.getPropertyById)
    .put(
        auth, 
        uploader().array("images", 5), 
        bodyValidator(updatePropertyDTO), 
        propCtrl.updateProperty
    )
    .delete(
        auth, 
        uploader().array("images", 5), 
        propCtrl.deletePropertyById
    );

module.exports = propertyRouter;
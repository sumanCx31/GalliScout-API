const propertyRouter = require('express').Router();
const propCtrl = require('./property.controller');
const auth = require('../middleware/auth.middleware');
const uploader = require('../middleware/uploader.middleware');
const bodyValidator = require('../middleware/auth.validator');
const { propertyDTO, updatePropertyDTO } = require('./property.validator');

// 1. Geospatial Route (MUST be above /:id)
propertyRouter.get('/nearby', propCtrl.getNearbyProperties);

propertyRouter.route('/')
    .post(
        auth, // Protecting: Only logged-in users can list flats
        uploader().array("images", 5), 
        bodyValidator(propertyDTO), 
        propCtrl.createProperty
    )
    .get(propCtrl.getAllProperty);

propertyRouter.route('/:id')
    .get(propCtrl.getPropertyById)
    .put(
        auth, // Protecting: Only owner/admin should update
        uploader().array("images", 5), 
        bodyValidator(updatePropertyDTO), 
        propCtrl.updateProperty
    )
    .delete( 
        auth, // Protecting
        propCtrl.deletePropertyById
    );

module.exports = propertyRouter;
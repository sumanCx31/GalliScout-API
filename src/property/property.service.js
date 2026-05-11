const PropertyModel = require("./propert.model");
const cloudinarySvc = require("../services'/cloudinary.service");

class PropertyService {
    transformPropertyCreate = async (req) => {
        try {
            let data = req.body;

            // Handle multiple images for a property
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(file => 
                    cloudinarySvc.fileUpload(file.path, "/property/")
                );
                data.images = await Promise.all(uploadPromises);
            } else {
                data.images = [];
            }

            // Assign the logged-in user as the owner
            data.owner = req.authUser._id;

            return data;
        } catch (exception) {
            throw exception;
        }
    };

    storeProperty = async (data) => {
        try {
            const property = await PropertyModel.create(data);
            return property;
        } catch (exception) {
            throw exception;
        }
    };

    getAllProperties = async () => {
        try {
            // Populate owner to see who listed the flat
            return await PropertyModel.find().populate("owner", "name email");
        } catch (exception) {
            throw exception;
        }
    };

    getById = async (id) => {
        try {
            const property = await PropertyModel.findById(id).populate("owner", "name email");
            if (!property) {
                throw { code: 404, message: "Property not found.", status: "NOT_FOUND" };
            }
            return property;
        } catch (exception) {
            throw exception;
        }
    };

    updateProperty = async (req, existingProperty) => {
        try {
            const data = req.body;
            
            // If new images are uploaded, add them to the array or replace them
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(file => 
                    cloudinarySvc.fileUpload(file.path, "/property/")
                );
                data.images = await Promise.all(uploadPromises);
            }

            // Update existing fields
            Object.assign(existingProperty, data);
            
            await existingProperty.save();
            return existingProperty;
        } catch (exception) {
            throw exception;
        }
    };

    deleteById = async (id) => {
        try {
            return await PropertyModel.deleteOne({ _id: id });
        } catch (exception) {
            throw exception;
        }
    };
}

module.exports = new PropertyService();
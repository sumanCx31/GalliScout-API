const PropertyModel = require("./propert.model");
const cloudinarySvc = require("../services'/cloudinary.service");

class PropertyService {
    transformPropertyCreate = async (req) => {
        try {          
            let data = req.body;

            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(async (file) => {
                    const result = await cloudinarySvc.fileUpload(file.path, "/property/");
                    return {
                        publicId: result.public_id || result.publicId,
                        secureUrl: result.secure_url || result.secureUrl
                    };
                });
                data.images = await Promise.all(uploadPromises);
            } else {
                data.images = [];
            }

            // data.owner = req.authUser._id;
            return data;
        } catch (exception) {
            throw exception;
        }
    };

    storeProperty = async (data) => {
        try {
            return await PropertyModel.create(data);
        } catch (exception) {
            throw exception;
        }
    };

    getAllProperties = async () => {
        return await PropertyModel.find().populate("owner", "name email");
    };

    getById = async (id) => {
        const property = await PropertyModel.findById(id).populate("owner", "name email");
        if (!property) {
            throw { code: 404, message: "Property not found.", status: "NOT_FOUND" };
        }
        return property;
    };

    updateProperty = async (req, existingProperty) => {
        try {
            const data = req.body;
            
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(async (file) => {
                    const result = await cloudinarySvc.fileUpload(file.path, "/property/");
                    return {
                        publicId: result.public_id || result.publicId,
                        secureUrl: result.secure_url || result.secureUrl
                    };
                });
                // Note: This replaces old images. Use push if you want to append.
                data.images = await Promise.all(uploadPromises);
            }

            Object.assign(existingProperty, data);
            return await existingProperty.save();
        } catch (exception) {
            throw exception;
        }
    };

    deleteById = async (id) => {
        return await PropertyModel.deleteOne({ _id: id });
    };
}

module.exports = new PropertyService();
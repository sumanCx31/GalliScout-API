const propertySvc = require("./property.service");

class PropertyController {
    createProperty = async (req, res, next) => {
        try {
            const payload = await propertySvc.transformPropertyCreate(req);
            const propertyData = await propertySvc.storeProperty(payload);

            res.json({
                data: propertyData,
                message: "Property listed successfully",
                status: "Success",
            });
        } catch (exception) {
            next(exception);
        }
    };

    getAllProperty = async (req, res, next) => {
        try {
            const data = await propertySvc.getAllProperties();
            res.json({
                data: data,
                message: "Properties fetched successfully",
                status: "Success",
            });
        } catch (exception) {
            next(exception);
        }
    };

    getPropertyById = async (req, res, next) => {
        try {
            const data = await propertySvc.getById(req.params.id);
            res.json({ data, status: "Success" });
        } catch (exception) {
            next(exception);
        }
    };

    updateProperty = async (req, res, next) => {
        try {
            const id = req.params.id;
            const existingData = await propertySvc.getById(id);

            // Authorization check: Only the owner can update
            if (existingData.owner._id.toString() !== req.authUser._id.toString()) {
                throw { code: 403, message: "Unauthorized to edit this property" };
            }

            const updatedData = await propertySvc.updateProperty(req, existingData);
            res.json({
                data: updatedData,
                message: "Property updated successfully",
                status: "Success"
            });
        } catch (exception) {
            next(exception);
        }
    };

    deletePropertyById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const existingData = await propertySvc.getById(id);

            if (existingData.owner._id.toString() !== req.authUser._id.toString()) {
                throw { code: 403, message: "Unauthorized to delete this property" };
            }

            await propertySvc.deleteById(id);
            res.json({
                message: "Property deleted successfully",
                status: "Success",
            });
        } catch (exception) {
            next(exception);
        }
    };
}

module.exports = new PropertyController();
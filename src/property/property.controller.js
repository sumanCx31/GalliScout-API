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

    // property.controller.js
getNearbyProperties = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // Convert strings from query to numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const properties = await Property.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // Longitude first in GeoJSON
          },
          $maxDistance: 5000, // Search radius in meters (5km)
        },
      },
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
            const existingData = await propertySvc.getById(req.params.id);

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
            const existingData = await propertySvc.getById(req.params.id);

            if (existingData.owner._id.toString() !== req.authUser._id.toString()) {
                throw { code: 403, message: "Unauthorized to delete this property" };
            }

            await propertySvc.deleteById(req.params.id);
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
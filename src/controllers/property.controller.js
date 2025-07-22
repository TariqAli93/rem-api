import * as propertyService from "../services/property.service.js";

import * as propertyValidator from "../validations/property.validation.js";

export const createProperty = async (req, res, next) => {
    try {
        // Validate the request body
        const validData = propertyValidator.propertySchema.parse(req.body);

        // Create the property
        const newProperty = await propertyService.createProperty(validData);

        res.status(201).json({
            status: true,
            message: "Property created successfully",
            data: newProperty,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProperties = async (req, res, next) => {
    try {
        // Fetch all properties
        const properties = await propertyService.getAllProperties();

        res.status(200).json({
            status: true,
            message: "Properties fetched successfully",
            data: properties,
        });
    } catch (error) {
        next(error);
    }
};

export const getPropertyById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Fetch property by ID
        const property = await propertyService.getPropertyById(id);

        if (!property) {
            return res.status(404).json({
                status: false,
                message: "Property not found",
            });
        }

        res.status(200).json({
            status: true,
            message: "Property fetched successfully",
            data: property,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProperty = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate the request body
        const validData = propertyValidator.propertySchema.parse(req.body);

        // Update the property
        const updatedProperty = await propertyService.updateProperty(id, validData);

        if (!updatedProperty) {
            return res.status(404).json({
                status: false,
                message: "Property not found",
            });
        }

        res.status(200).json({
            status: true,
            message: "Property updated successfully",
            data: updatedProperty,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProperty = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delete the property
        const deletedProperty = await propertyService.deleteProperty(id);

        if (!deletedProperty) {
            return res.status(404).json({
                status: false,
                message: "Property not found",
            });
        }

        res.status(200).json({
            status: true,
            message: "Property deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPropertyById = async (propertyId) => {
    const properties = await prisma.property.findUnique({
        where: {
            id: propertyId,
        },
    });

    if (!properties) {
        throw new createHttpError.NotFound("Property not found!");
    }

    return properties;
};

export const getAllProperties = async () => {
    const properties = await prisma.property.findMany({
        where: {
            is_deleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },

        include: {
            PropertyClient: {
                include: {
                    client: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                            address: true,
                        },
                    },
                },
            },
        },
    });

    if (!properties || properties.length === 0) {
        throw new createHttpError.NotFound("No properties found!");
    }

    // return properties with client information and without PropertyClient relation
    return properties.map((property) => {
        const { PropertyClient, ...propertyData } = property;
        return {
            ...propertyData,
            client: PropertyClient.length > 0 ? PropertyClient[0].client : null,
        };
    });
};

export const createProperty = async (propertyData) => {
    const clientInfo = {
        name: propertyData.owner,
        phone: propertyData.phone,
        address: "Unknown",
    };

    // Create the property
    const newProperty = await prisma.property.create({
        data: {
            ...propertyData,
        },
    });

    if (!newProperty) {
        throw new createHttpError.InternalServerError("Failed to create property!");
    }

    const newClient = await prisma.client.create({
        data: clientInfo,
    });

    if (!newClient) {
        throw new createHttpError.InternalServerError("Failed to create client!");
    }

    // Link the new client to the property
    await prisma.property.update({
        where: {
            id: newProperty.id,
        },
        data: {
            PropertyClient: {
                create: {
                    clientId: newClient.id,
                },
            },
        },
    });

    return newProperty;
};

export const updateProperty = async (propertyId, propertyData) => {
    // Check if the property exists
    const existingProperty = await prisma.property.findUnique({
        where: {
            id: propertyId,
        },
    });

    if (!existingProperty) {
        throw new createHttpError.NotFound("Property not found!");
    }

    // Update the property
    const updatedProperty = await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: {
            ...propertyData,
        },
    });

    return updatedProperty;
};

export const deleteProperty = async (propertyId) => {
    // Check if the property exists
    const existingProperty = await prisma.property.findUnique({
        where: {
            id: propertyId,
        },
    });

    if (!existingProperty) {
        throw new createHttpError.NotFound("Property not found!");
    }

    // Soft delete the property
    const deletedProperty = await prisma.property.update({
        where: {
            id: propertyId,
        },
        data: {
            is_deleted: true,
        },
    });

    return deletedProperty;
};

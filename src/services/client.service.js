import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClientById = async (clientId) => {
    const client = await prisma.client.findUnique({
        where: {
            id: clientId,
        },
    });

    if (!client) {
        throw new createHttpError.NotFound("Client not found!");
    }

    return client;
};

export const getAllClients = async () => {
    const clients = await prisma.client.findMany({
        where: {
            is_deleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!clients || clients.length === 0) {
        throw new createHttpError.NotFound("No clients found!");
    }

    return clients;
};

export const createClient = async (clientData) => {
    // Create the client
    const newClient = await prisma.client.create({
        data: {
            ...clientData,
        },
    });

    return newClient;
};

export const updateClient = async (clientId, clientData) => {
    // Check if the client exists
    const existingClient = await prisma.client.findUnique({
        where: {
            id: clientId,
        },
    });

    if (!existingClient) {
        throw new createHttpError.NotFound("Client not found!");
    }

    // Update the client
    const updatedClient = await prisma.client.update({
        where: {
            id: clientId,
        },
        data: {
            ...clientData,
        },
    });

    return updatedClient;
};

export const deleteClient = async (clientId) => {
    // Check if the client exists
    const existingClient = await prisma.client.findUnique({
        where: {
            id: clientId,
        },
    });

    if (!existingClient) {
        throw new createHttpError.NotFound("Client not found!");
    }

    // Soft delete the client
    const deletedClient = await prisma.client.update({
        where: {
            id: clientId,
        },
        data: {
            is_deleted: true,
        },
    });

    return deletedClient;
};

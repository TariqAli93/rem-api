import * as clientService from "../services/client.service.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving clients", error: error.message });
    }
};

export const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientService.getClientById(id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving client", error: error.message });
    }
};

export const createClient = async (req, res) => {
    const clientData = req.body;
    try {
        const newClient = await clientService.createClient(clientData);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: "Error creating client", error: error.message });
    }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const clientData = req.body;
    try {
        const updatedClient = await clientService.updateClient(id, clientData);
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: "Error updating client", error: error.message });
    }
};

export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClient = await clientService.deleteClient(id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting client", error: error.message });
    }
};

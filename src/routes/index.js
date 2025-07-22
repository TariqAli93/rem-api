import express from "express";
const router = express.Router();
import * as authController from "../controllers/auth.controller.js";
import * as propertyController from "../controllers/property.controller.js";

const routeDefinitions = [
    { method: "post", path: "/auth/login", handler: authController.loginUser },
    { method: "post", path: "/auth/register", handler: authController.registerUser },
    { method: "post", path: "/auth/refresh-token", handler: authController.getRefreshToken },
    { method: "get", path: "/properties", handler: propertyController.getAllProperties },
    { method: "post", path: "/properties", handler: propertyController.createProperty },
    { method: "get", path: "/properties/:id", handler: propertyController.getPropertyById },
    { method: "put", path: "/properties/:id", handler: propertyController.updateProperty },
    { method: "delete", path: "/properties/:id", handler: propertyController.deleteProperty },
];

routeDefinitions.forEach(({ method, path, handler }) => {
    router[method](path, handler);
});

export default router;

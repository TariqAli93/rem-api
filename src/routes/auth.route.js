import * as authController from "../controllers/auth.controller.js";

const authRoutes = (app) => {
    app.post("/api/auth/login", authController.login);
    app.post("/api/auth/register", authController.register);
    app.post("/api/auth/refresh-token", authController.getRefreshToken);
};

export default authRoutes;

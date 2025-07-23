import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";
import http from "http";

const startServer = async () => {
    const PORT = Config.PORT;
    const NODE_ENV = Config.NODE_ENV;

    if (NODE_ENV === "development") {
        logger.info(`[✨] Environment: ${Config.NODE_ENV} 🛠️`);
    } else if (NODE_ENV === "production") {
        logger.info(`[✨] Environment: ${Config.NODE_ENV} 🌐`);
    }

    //Dispaly Timezone of the Server using Node
    logger.info(`[✨] Timezone: ${Config.TZ} ⏰`);

    //Display Offset of the Server Timezone
    logger.info(`[✨] Timezone Offset: ${new Date().getTimezoneOffset()} minutes ⏰`);

    try {
        app.listen(PORT, () => {
            logger.info(`[✨] Server Port: ${PORT} 🚀`);
            logger.info(`[✨] Server Domain: ${Config.SERVER_DOMAIN} 🌐`);
            logger.info(`[✨] Server is running in ${NODE_ENV} mode`);
            logger.info(`[✨] Server Timezone: ${Config.TZ} ⏰`);
            logger.info(`[✨] server is running at http://${Config.SERVER_DOMAIN} 🌐`);
        });
    } catch (err) {
        logger.error(`[❌] Server : Failed >> Error: ${err.message}`);
        process.exit(1);
    }
};

startServer();

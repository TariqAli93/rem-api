import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";

const startServer = async () => {
    const PORT = Config.PORT;
    const NODE_ENV = Config.NODE_ENV;

    if (NODE_ENV === "development") {
        logger.info(`[✨] Environment: ${Config.NODE_ENV} 🛠️`);
    } else if (NODE_ENV === "production") {
        logger.info(`[✨] Environment: ${Config.NODE_ENV} 🌐`);
    }

    try {
        app.listen(PORT, "0.0.0.0", () => {
            logger.info(`[✨] Server Port: ${PORT} 🚀`);
        });
    } catch (err) {
        logger.error(`[❌] Server : Failed >> Error: ${err.message}`);
        process.exit(1);
    }
};

startServer();

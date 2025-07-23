import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

//Middlewares
import api_compression from "./middlewares/api_compression.middleware.js";
import global_error_handler from "./middlewares/global_error_handler.middleware.js";
// import {
//     decrypt_request,
//     encrypt_response,
//     skip_encryption,
// } from "./middlewares/api_encryption.middleware.js";
import routes from "./routes/index.js";

//express init
const app = express();

//Middlewares Init
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(api_compression);
// app.use(decrypt_request);
// app.use(encrypt_response);

// init routes
app.use("/api", routes);

// Global error handler should be after routes
app.use(global_error_handler);

export default app;

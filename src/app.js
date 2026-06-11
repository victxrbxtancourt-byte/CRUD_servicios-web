const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const clienteRoutes = require("./routes/cliente.routes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/clientes", clienteRoutes);

module.exports = app;

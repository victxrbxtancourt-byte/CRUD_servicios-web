const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Clientes",
      version: "1.0.0",
      description: "API para gestionar clientes",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.js"], // Lee las anotaciones JSDoc de todas las rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

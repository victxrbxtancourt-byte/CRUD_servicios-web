const express = require("express");
const router = express.Router();
const { getClientes, createCliente, updateCliente, deleteCliente, getCiudades } = require("../controllers/cliente.controller");


/**
 * @openapi
 * tags:
 *   name: Clientes
 *   description: Operaciones sobre clientes
 */

/**
 * @openapi
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error interno del servidor
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: El nombre es requerido
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: ID y nombre requeridos
 *       500:
 *         description: Error interno del servidor
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       204:
 *         description: Cliente eliminado con éxito
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Juan Pérez
 *         correo:
 *           type: string
 *           example: juan@correo.com
 *         telefono:
 *           type: string
 *           example: "3001234567"
 *     ClienteInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: Juan Pérez
 *         correo:
 *           type: string
 *           example: juan@correo.com
 *         telefono:
 *           type: string
 *           example: "3001234567"
 */
router.get("/ciudades", getCiudades);
router.get("/", getClientes);
router.post("/", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

module.exports = router;

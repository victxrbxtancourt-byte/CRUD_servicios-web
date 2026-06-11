const { sql } = require("../config/db");

// NUEVO: Endpoint para obtener las ciudades
const getCiudades = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Ciudades");
    const normalized = result.recordset.map((row) => ({
      id: row.Id,
      nombre: row.Nombre,
    }));
    res.json(normalized);
  } catch (error) {
    res.status(500).json(error);
  }
};

// MODIFICADO: Listar personas incluyendo el nombre de su ciudad
const getClientes = async (req, res) => {
  try {
    const query = `
      SELECT c.Id, c.Nombre, c.Email, c.Telefono, c.CiudadId, ciu.Nombre AS CiudadNombre
      FROM Clientes c
      LEFT JOIN Ciudades ciu ON c.CiudadId = ciu.Id
    `;
    const result = await sql.query(query);
    const normalized = result.recordset.map((row) => ({
      id: row.Id,
      nombre: row.Nombre,
      correo: row.Email ?? null,
      telefono: row.Telefono ?? null,
      ciudadId: row.CiudadId ?? null,
      ciudadNombre: row.CiudadNombre ?? null, // Si es nulo, Angular mostrará "Sin ciudad"
    }));
    res.json(normalized);
  } catch (error) {
    res.status(500).json(error);
  }
};

// MODIFICADO: Crear cliente manejando CiudadId
const createCliente = async (req, res) => {
  const { nombre, correo, email, telefono, ciudadId } = req.body || {};
  const correoFinal = correo || email || "";

  if (!nombre) return res.status(400).json({ message: "El nombre es requerido" });

  try {
    const request = new sql.Request();
    request.input("Nombre", sql.NVarChar, nombre);
    request.input("Email", sql.NVarChar, correoFinal);
    request.input("Telefono", sql.NVarChar, telefono || "");
    request.input("CiudadId", sql.Int, ciudadId ? parseInt(ciudadId, 10) : null);

    const query = `
      INSERT INTO Clientes (Nombre, Email, Telefono, CiudadId) 
      VALUES (@Nombre, @Email, @Telefono, @CiudadId); 
      SELECT SCOPE_IDENTITY() AS id;
    `;
    const result = await request.query(query);
    res.status(201).json({ id: result.recordset[0].id });
  } catch (error) {
    console.error("Error en DB:", error);
    res.status(500).json(error);
  }
};

// MODIFICADO: Editar cliente manejando CiudadId
const updateCliente = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, correo, email, telefono, ciudadId } = req.body || {};
  const correoFinal = correo || email || "";

  if (Number.isNaN(id) || !nombre) return res.status(400).json({ message: "ID y nombre requeridos" });

  try {
    const request = new sql.Request();
    request.input("Id", sql.Int, id);
    request.input("Nombre", sql.NVarChar, nombre);
    request.input("Email", sql.NVarChar, correoFinal);
    request.input("Telefono", sql.NVarChar, telefono || "");
    request.input("CiudadId", sql.Int, ciudadId ? parseInt(ciudadId, 10) : null);

    await request.query(`
      UPDATE Clientes 
      SET Nombre=@Nombre, Email=@Email, Telefono=@Telefono, CiudadId=@CiudadId 
      WHERE Id=@Id
    `);
    res.json({ id });
  } catch (error) {
    console.error("Error en DB:", error);
    res.status(500).json(error);
  }
};

const deleteCliente = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  try {
    await new sql.Request().input("Id", sql.Int, id).query("DELETE FROM Clientes WHERE Id=@Id");
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getClientes, createCliente, updateCliente, deleteCliente, getCiudades };
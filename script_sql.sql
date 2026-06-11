-- 1. Crear la base de datos
CREATE DATABASE CrudClientes;
GO

-- 2. Usar la base de datos
USE CrudClientes;
GO

-- 3. Crear la tabla (con los campos que usa el frontend Angular)
CREATE TABLE Clientes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100),
    telefono NVARCHAR(20)
);
GO

-- 4. (Opcional) Insertar datos de prueba
INSERT INTO Clientes (nombre, correo, telefono)
VALUES 
    ('Juan Pérez', 'juan@correo.com', '3001234567'),
    ('María López', 'maria@correo.com', '3109876543');
GO

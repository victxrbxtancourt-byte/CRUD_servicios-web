const app = require("./app");
const { connectDB } = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Intentamos conectar a la base de datos
    await connectDB();
    console.log("¡Base de datos conectada con éxito!");
  } catch (error) {
    // Si falla, mostramos el error en consola pero NO tumbamos el servidor
    console.error("⚠️ Alerta: No se pudo conectar a SQL Server inmediatamente.");
    console.error("Detalle del error:", error.message);
  }

  // Esto ahora se ejecutará SIEMPRE, garantizando que el puerto 3000 funcione
  app.listen(PORT, () => {
    console.log(`Servidor de desarrollo corriendo en: http://localhost:${PORT}`);
    console.log(`Documentación de Swagger disponible en: http://localhost:${PORT}/api-docs`);
  });
};

startServer();
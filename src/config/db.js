    const sql = require("mssql");
    require("dotenv").config();

    const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, 
        trustServerCertificate: true,
        // Agregamos la instancia que tienes en tu .env
        instanceName: process.env.DB_INSTANCE 
    },
    };

    const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("¡Base de datos conectada con éxito a SQL Server!");
    } catch (error) {
        console.error("⚠️ Alerta: No se pudo conectar a SQL Server.");
        console.error("Detalle del error:", error.message);
    }
    };

    module.exports = { sql, connectDB };

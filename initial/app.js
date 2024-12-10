// IMPORTAMOS CONFIGURACIÓN DE VARIABLES DE ENTORNO
import "dotenv/config";
// IMPORTAMOS EXPRESS
import express from "express";
// IMPORTAMOS MANEJADO DE ARCHIVOS
import fileUpload from "express-fileupload";
// IMPORTAMOS POLÍTICAS DE CORS
import cors from "cors";
// IMPORTAMOS COOKIE PARSER
import cookieParser from "cookie-parser";
// IMPORTAMOS LAS RUTAS PARA PROCESOS DE SISTEMA
import sistemaRoutes from "../routes/sistema.routes.js";
// IMPORTAMOS LAS RUTAS PARA PROCESOS DE USUARIOS
import usuariosRoutes from "../routes/usuarios.routes.js";

// CONFIGURAMOS EL PATH
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const allowedOrigins = ["http://localhost:5173"];

// APLICAMOS CORS
app.use(cors({ origin: allowedOrigins, credentials: true }));

// DEFINIMOS LA RUTA DE NUESTRAS IMÁGENES
app.set("public", path.join(__dirname, "public"));
// DEFINIMOS LA RUTA PARA SER ACCESIBLE DESDE EL NAVEGADOR
app.use(express.static(path.join(__dirname, "../public")));

// Middleware para analizar solicitudes con cuerpo JSON
app.use(express.json());

// APLICAMOS EL VISUALIZADO DE COOKIES
app.use(cookieParser());

// APLICAMOS MANEJADO DE ARCHIVOS
app.use(fileUpload());

app.use("/api/sistema", sistemaRoutes);
app.use("/api/usuarios", usuariosRoutes);

export default app;

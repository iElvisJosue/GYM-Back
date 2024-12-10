// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// IMPORTAMOS LAS CONSULTAS
import { InformacionDelSistema } from "../controllers/sistema.controllers.js";

// ALMACENAMOS EL ENRUTADOR
const router = Router();

// RUTA PARA OBTENER LA INFORMACION DEL SISTEMA
router.get("/InformacionDelSistema", InformacionDelSistema);

// EXPORTAMOS EL ENRUTADOR
export default router;

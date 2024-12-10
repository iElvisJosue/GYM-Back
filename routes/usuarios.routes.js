// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// IMPORTAMOS LAS CONSULTAS
import {
  VerificarTokenUsuario,
  IniciarSesionUsuario,
  ObtenerInformacionDeUnUsuario,
  RegistrarUsuario,
  CerrarSesionUsuario,
} from "../controllers/usuarios.controllers.js";
// IMPORTAMOS EL MIDDLEWARE
import { ValidarToken } from "../middlewares/validarToken.js";

// ALMACENAMOS EL ENRUTADOR
const router = Router();

// RUTA PARA VERIFICAR EL TOKEN DE ACCESO
router.post("/VerificarTokenUsuario", VerificarTokenUsuario);
// RUTA PARA INICIAR SESION
router.post("/IniciarSesionUsuario", IniciarSesionUsuario);
// RUTA PARA OBTENER INFORMACION DE UN USUARIO
router.get(
  "/ObtenerInformacionDeUnUsuario/:CookieConToken/:idUsuario",
  ValidarToken,
  ObtenerInformacionDeUnUsuario
);
// RUTA PARA REGISTRAR USUARIO
router.post("/RegistrarUsuario", ValidarToken, RegistrarUsuario);
// RUTA PARA CERRAR SESION
router.post("/CerrarSesionUsuario", CerrarSesionUsuario);

// EXPORTAMOS EL ENRUTADOR
export default router;

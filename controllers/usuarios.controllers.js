import jwt from "jsonwebtoken";
// IMPORTAMOS EL TRANSPORTER DEL NODEMAILER
import { TransportadorCorreo } from "../helpers/TransportadorCorreo.js";
// IMPORTAMOS EL TOKEN CREADO
import { CrearTokenDeAcceso } from "../libs/jwt.js";
// IMPORTAMOS LA CONEXIÓN A LA DB
import { CONEXION } from "../initial/db.js";
// IMPORTAMOS LAS AYUDAS
import {
  MENSAJE_DE_EXITO,
  MENSAJE_EXISTENTE_CORREO,
  MENSAJE_ERROR_CONSULTA_SQL,
  MENSAJE_DE_ERROR,
  MENSAJE_SESION_FINALIZADA,
} from "../helpers/MensajesDeRespuestas.js";
import {
  ObtenerHoraActual,
  GenerarNumeroDeUsuario,
  GenerarContraseña,
  CalcularFechaDeLaMembresia,
} from "../helpers/FuncionaGenerales.js";
import { ObtenerInformacionDelSistema } from "../helpers/InformacionDelSistema.js";
// IMPORTAMOS EL CORREO
import { DiseñoCorreoBienvenida } from "../helpers/DiseñoCorreoBienvenida.js";

// EN TODAS LAS VISTAS
export const VerificarTokenUsuario = async (req, res) => {
  const { TOKEN_DE_ACCESO_GYM } = req.body;

  const { TokenSistema } = await ObtenerInformacionDelSistema();

  jwt.verify(
    TOKEN_DE_ACCESO_GYM,
    TokenSistema,
    async (err, InformacionDelToken) => {
      if (err) {
        return res.status(401).json(MENSAJE_DE_NO_AUTORIZADO);
      }
      return res.status(200).json(InformacionDelToken);
    }
  );
};
// VISTA > INICIAR SESIÓN
export const IniciarSesionUsuario = (req, res) => {
  try {
    const { NickUsuario, ContrasenaUsuario } = req.body;
    const sql = `SELECT * FROM usuarios WHERE NickUsuario = ? AND ContrasenaUsuario = ? AND ActivoUsuario = ?`;
    CONEXION.query(
      sql,
      [NickUsuario, ContrasenaUsuario, 1],
      async (error, result) => {
        if (error) return res.status(400).json(MENSAJE_ERROR_CONSULTA_SQL);
        if (result.length > 0) {
          const INFO_USUARIO = {
            idUsuario: result[0].idUsuario,
            NickUsuario: result[0].NickUsuario,
            CorreoUsuario: result[0].CorreoUsuario,
            NombreUsuario: result[0].NombreUsuario,
            ApellidosUsuario: result[0].ApellidosUsuario,
            FotoUsuario: result[0].FotoUsuario,
            PermisosUsuario: result[0].PermisosUsuario,
            ModoOscuro: result[0].ModoOscuro,
            FechaCreacionUsuario: result[0].FechaCreacionUsuario,
            HoraCreacionUsuario: result[0].HoraCreacionUsuario,
          };
          // CREAMOS EL ID EN UN TOKEN
          const TOKEN_DE_ACCESO_GYM = await CrearTokenDeAcceso(INFO_USUARIO);
          // ALMACENAMOS EL TOKEN EN UN COOKIE
          res.cookie("TOKEN_DE_ACCESO_GYM", TOKEN_DE_ACCESO_GYM, {
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
          });
          INFO_USUARIO.TOKEN_DE_ACCESO_GYM = TOKEN_DE_ACCESO_GYM;
          // ENVIAMOS EL TOKEN AL CLIENTE
          res.status(200).json(INFO_USUARIO);
        } else {
          res
            .status(401)
            .json(
              "¡Oops! Parece que el usuario y/o contraseña son incorrectos, por favor verifique e intente de nuevo."
            );
        }
      }
    );
  } catch (error) {
    res.status(500).json(MENSAJE_DE_ERROR);
  }
};
// VISTA > PERFIL
export const ObtenerInformacionDeUnUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const sql = "SELECT * FROM usuarios WHERE idUsuario = ?";
    CONEXION.query(sql, [idUsuario], (error, result) => {
      if (error) return res.status(400).json(MENSAJE_ERROR_CONSULTA_SQL);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(MENSAJE_DE_ERROR);
  }
};
// VISTA > REGISTRAR USUARIO
export const RegistrarUsuario = async (req, res) => {
  const {
    NombreUsuario,
    ApellidosUsuario,
    CorreoUsuario,
    SexoUsuario,
    PermisosUsuario,
    idMembresia,
  } = req.body;
  try {
    const NickUsuario = `${NombreUsuario}-${GenerarNumeroDeUsuario()}`;
    const ContrasenaUsuario = GenerarContraseña(14);
    const FotoUsuario = `Default${SexoUsuario}.png`;
    // VERIFICAMOS SI EL CORREO EXISTE
    const CorreoExistente = await VerificarCorreoExistente(CorreoUsuario);
    // SI EXISTE EL CORREO AVISAMOS
    if (CorreoExistente) return res.status(409).json(MENSAJE_EXISTENTE_CORREO);

    // SI NO EXISTE EL CORREO CONTINUAMOS
    const idUsuario = await GuardarUsuarioEnBD(
      NickUsuario,
      ContrasenaUsuario,
      NombreUsuario,
      ApellidosUsuario,
      CorreoUsuario,
      SexoUsuario,
      FotoUsuario,
      PermisosUsuario
    );
    await GuardarMembresiaEnBD(idUsuario, idMembresia);
    await EnviarCorreoConSusDatos(
      NombreUsuario,
      ApellidosUsuario,
      NickUsuario,
      ContrasenaUsuario,
      CorreoUsuario
    );
    res.status(200).json(MENSAJE_DE_EXITO);
  } catch (error) {
    console.log(error);
    res.status(500).json(MENSAJE_DE_ERROR);
  }
};
const VerificarCorreoExistente = async (CorreoUsuario) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM usuarios WHERE CorreoUsuario = ?";
    CONEXION.query(sql, [CorreoUsuario], (error, result) => {
      if (error) return reject(error);
      resolve(result.length > 0);
    });
  });
};
const GuardarUsuarioEnBD = async (
  NickUsuario,
  ContrasenaUsuario,
  NombreUsuario,
  ApellidosUsuario,
  CorreoUsuario,
  SexoUsuario,
  FotoUsuario,
  PermisosUsuario
) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO usuarios (NickUsuario, ContrasenaUsuario, NombreUsuario, ApellidosUsuario, CorreoUsuario, SexoUsuario, FotoUsuario, PermisosUsuario, FechaCreacionUsuario, HoraCreacionUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), '${ObtenerHoraActual()}')`;
    CONEXION.query(
      sql,
      [
        NickUsuario,
        ContrasenaUsuario,
        NombreUsuario,
        ApellidosUsuario,
        CorreoUsuario,
        SexoUsuario,
        FotoUsuario,
        PermisosUsuario,
      ],
      (error, result) => {
        if (error) return reject(error);
        resolve(result.insertId);
      }
    );
  });
};
const GuardarMembresiaEnBD = async (idUsuario, idMembresia) => {
  const { FechaInicioMembresia, FechaFinalizacionMembresia } =
    CalcularFechaDeLaMembresia(idMembresia);
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO usuarios_membresias (idUsuario, idMembresia, FechaInicioMembresia, FechaFinalizacionMembresia) VALUES (?, ?, ?, ?)`;
    CONEXION.query(
      sql,
      [
        idUsuario,
        idMembresia,
        FechaInicioMembresia,
        FechaFinalizacionMembresia,
      ],
      (error, result) => {
        if (error) return reject(error);
        resolve(true);
      }
    );
  });
};
const EnviarCorreoConSusDatos = async (
  Nombre,
  Apellidos,
  Nick,
  Contrasena,
  Correo
) => {
  const { LogoSistema, NombreSistema, CorreoSistema } =
    await ObtenerInformacionDelSistema();
  const TRANSPORTADOR = await TransportadorCorreo();
  return new Promise(async (resolve, reject) => {
    try {
      await TRANSPORTADOR.sendMail({
        from: `🖥️ Sistema de ${NombreSistema} 📧 <${CorreoSistema}>`,
        to: Correo,
        subject: `¡Bienvenido a ${NombreSistema}! 💪 `,
        html: DiseñoCorreoBienvenida(
          NombreSistema,
          Nombre,
          Apellidos,
          Nick,
          Contrasena
        ),
        attachments: [
          {
            filename: LogoSistema,
            path: `./public/Imagenes/${LogoSistema}`,
            cid: "Logo-Gym",
          },
        ],
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
// EN TODAS LAS VISTAS
export const CerrarSesionUsuario = async (req, res) => {
  try {
    res.cookie("TOKEN_DE_ACCESO_GYM", "", {
      expires: new Date(0),
    });
    res.status(200).json(MENSAJE_SESION_FINALIZADA);
  } catch (error) {
    res.status(500).json(MENSAJE_DE_ERROR);
  }
};

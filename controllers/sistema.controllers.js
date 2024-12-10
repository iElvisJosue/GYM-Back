import jwt from "jsonwebtoken";
// IMPORTAMOS LAS AYUDAS
import { ObtenerInformacionDelSistema } from "../helpers/InformacionDelSistema.js";
import { MENSAJE_DE_NO_AUTORIZADO } from "../helpers/MensajesDeRespuestas.js";

// EN TODAS LAS VISTAS
export const InformacionDelSistema = async (req, res) => {
  try {
    const {
      LogoSistema,
      NombreSistema,
      CorreoSistema,
      ContrasenaCorreoSistema,
    } = await ObtenerInformacionDelSistema();
    return res.status(200).json({
      LogoSistema,
      NombreSistema,
      CorreoSistema,
      ContrasenaCorreoSistema,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// SE UTILIZA EN LAS VISTAS:
//
// export const ObtenerResumenDiario = async (req, res) => {
//   const { FechaDeHoy } = req.params;
//   try {
//     const PedidosDeHoy = await PedidosHechosHoy(FechaDeHoy);
//     const RecoleccionesDeHoy = await RecoleccionesHechasHoy(FechaDeHoy);
//     const EntradasDeHoy = await EntradasHechasHoy(FechaDeHoy);
//     const MovimientosDeHoy = await MovimientosHechosHoy(FechaDeHoy);
//     const SalidasDeHoy = await SalidasHechasHoy(FechaDeHoy);
//     const DevolucionesDeHoy = await DevolucionesHechasHoy(FechaDeHoy);
//     res.status(200).json({
//       PedidosDeHoy,
//       RecoleccionesDeHoy,
//       EntradasDeHoy,
//       MovimientosDeHoy,
//       SalidasDeHoy,
//       DevolucionesDeHoy,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(MENSAJE_DE_ERROR);
//   }
// };
// const PedidosHechosHoy = async (FechaDeHoy) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const sql = `SELECT * FROM pedidos WHERE FechaCreacionPedido BETWEEN ? AND ?`;
//       CONEXION.query(sql, [FechaDeHoy, FechaDeHoy], (error, result) => {
//         if (error) return res.status(400).json(MENSAJE_ERROR_CONSULTA_SQL);
//         resolve(result.length);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

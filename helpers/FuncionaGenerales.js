export const ObtenerHoraActual = () => {
  const Hoy = new Date();
  const Opciones = {
    timeZone: "America/Mexico_City",
    hour12: false, // Formato de 24 horas
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const HoraActual = Hoy.toLocaleTimeString("en-US", Opciones);
  return HoraActual;
};
export const ObtenerFechaActual = () => {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
  const año = hoy.getFullYear();

  return `${dia}-${mes}-${año}`;
};
export const GenerarNumeroDeUsuario = () => {
  let NumeroUsuario = "";
  for (let i = 0; i < 7; i++) {
    NumeroUsuario += Math.floor(Math.random() * 10);
  }
  return NumeroUsuario;
};
export const GenerarContraseña = (longitud = 10) => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789";
  let contrasena = "";

  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    contrasena += caracteres[indiceAleatorio];
  }

  return contrasena;
};
export const CalcularFechaDeLaMembresia = (idMembresia) => {
  const FechaDeInicio = new Date(); // Fecha de hoy
  let FechaDeFinalizacion = new Date(FechaDeInicio); // Copia la fecha inicial

  switch (idMembresia) {
    // VISITA -> SE MANTIENE LA FECHA DE HOY
    case 1:
      break;

    // MENSUALIDAD -> INCREMENTA UN MES
    case 2:
      FechaDeFinalizacion.setMonth(FechaDeFinalizacion.getMonth() + 1);
      break;

    // ANUALIDAD -> INCREMENTA UN AÑO
    case 3:
      FechaDeFinalizacion.setFullYear(FechaDeFinalizacion.getFullYear() + 1);
      break;

    default:
      throw new Error("Tipo de membresía no válido.");
  }

  // ASEGURAR EL AJUSTE DE FECHAS PARA MESES CON MENOS DÍAS
  if (FechaDeFinalizacion.getDate() !== FechaDeInicio.getDate()) {
    FechaDeFinalizacion.setDate(0); // AJUSTA AL ULTIMO DÍA SI ES NECESARIO
  }

  // FORMATEAR FECHAS (YYYY-MM-DD)
  const FechaFormateada = (Fecha) => Fecha.toISOString().split("T")[0];

  return {
    FechaInicioMembresia: FechaFormateada(FechaDeInicio),
    FechaFinalizacionMembresia: FechaFormateada(FechaDeFinalizacion),
  };
};
export const CalcularDiasDeLaMembresia = (
  FechaDeInicio,
  FechaDeFinalizacion
) => {
  const FechaDeInicioMembresia = new Date(FechaDeInicio);
  const FechaDeFinalizacionMembresia = new Date(FechaDeFinalizacion);

  // CALCULAR LA DIFERENCIA EN MILISEGUNDOS
  const DiferenciaEnMilisegundos =
    FechaDeFinalizacionMembresia - FechaDeInicioMembresia;

  // CONVERTIR A DIAS
  const DiferenciaEnDias = Math.ceil(
    DiferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
  );

  return DiferenciaEnDias;
};

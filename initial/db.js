import mysql from "mysql";

export const CONEXION = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "db_gym",
  charset: "utf8mb4",
});

// PARA PRODUCCIÓN
// export const CONEXION = mysql.createConnection({
//   port: 3306,
//   host: "localhost",
//   user: "usmxxpressonline_usmx",
//   password: "Ac8293gA#",
//   database: "usmxxpressonline_usmx",
// });

export const CONECTAR_DB = () => {
  CONEXION.connect((error) => {
    if (error) {
      console.log("ERROR AL CONECTARSE: " + error);
      return;
    }
    console.log("CONEXIÓN EXITOSA A LA BASE DE DATOS");
  });
};

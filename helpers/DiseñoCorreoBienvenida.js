export const DiseñoCorreoBienvenida = (
  NOMBRE_SISTEMA,
  Nombre,
  Apellidos,
  Nick,
  Contrasena
) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenida</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Montserrat", Arial, sans-serif;
        background-color: #ffffff;
      }

      .container {
        max-width: 700px;
        margin: 0 auto;
        background-color: #fcf8f5;
        border: 2px dashed #f76c82;
        padding: 20px;
      }

      .header img {
		width: 170px;
        max-width: 170px;
		height: 170px;
        max-height: 170px;
        display: block;
        margin: 0 auto;
      }

      .divider {
        border: 1.5px dashed #f76c82;
        margin: 20px 0;
      }
      
      .titulo {
        text-align: center;
        text-transform: uppercase;
        color: #f76c82;
        font-size: 25px;
        font-weight: 700;
      }

      .content {
        text-align: center;
        color: #000000;
      }
        .content a {
        text-decoration: none;
        color: #f76c82;
      }

      .content h1 {
        color: #f76c82;
        font-size: 25px;
        font-weight: 700;
      }
	.StronSpan{
		word-break: break-word;
		color: #f76c82;
		}
      .content p {
        font-size: 16px;
        text-align: center;
        line-height: 1.5;
      }

      .button, .vinculo {
        display: inline-block;
        border: 2px dashed #f76c82;
        color: #f76c82;
		font-weight: bold;
        text-decoration: none;
        padding: 10px 20px;
        font-size: 16px;
      }

      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
      }

      @media (max-width: 720px) {
        .container {
          width: 100%;
          padding: 15px;
        }

        .content h1 {
          font-size: 20px;
        }

        .content p {
          font-size: 14px;
        }

        .button, .vinculo {
          font-size: 14px;
          padding: 8px 15px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <img src="cid:Logo-Gym" alt="Logo Gym" />
      </div>
      <hr class="divider" />
      <h1 class="titulo">¡Gracias por confiar en nosotros! 💪</h1>
      <hr class="divider" />
      <div class="content">
        <p>
          Hola <span class="StronSpan"><strong>${Nombre} ${Apellidos},</strong></span> te damos la bienvenida al sistema de
          <span class="StronSpan"><strong>${NOMBRE_SISTEMA}</strong></span>. Estamos emocionados de tenerte con
          nosotros. Prepárate para alcanzar tus objetivos de fitness con
          nuestras herramientas y recursos diseñados especialmente para ti.
        </p>
        <p>Tus clave de acceso es:</p>
        <div class="button">🔒 ${Contrasena}</div>
        <p>¿Quieres conocer nuestro sistema? Inicia sesión dando click al siguiente botón:</p>
        <a href="http://localhost:5173/" class="vinculo">👉 Visitar</a>
		    <br />
        <p>
          Agradecemos sinceramente tu confianza. Estamos a tu disposición para
          cualquier consulta o información adicional que necesites.
        </p>
        <p>Saludos cordiales,</p>
        <p><span class="StronSpan"><strong>${NOMBRE_SISTEMA}</strong></span></p>
      </div>
    </div>
  </body>
</html>
      `;
};

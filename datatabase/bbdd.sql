CREATE DATABASE bestbet;
USE bestbet;

CREATE TABLE IF NOT EXISTS jornadas(
	fecha VARCHAR(255), 
  temporada VARCHAR(255),
  jornada INTEGER,
  partido INTEGER,
  equipo_local VARCHAR(255),
  marcador_local INTEGER,
  equipo_visitante VARCHAR(255),
  marcador_visitante INTEGER,
  resultado VARCHAR(255)
);

-- Para solventar el error de la autenticación cambiamos el metodo de acceso
-- https://o7planning.org/en/11959/connecting-to-mysql-database-using-nodejs#a21280741
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';
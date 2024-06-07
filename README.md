Pasos para ejecutar el proyecto

Requisitos
1.- Base de Datos Mysql
2.- PC con S.O. Linux o Windows 10 o superior
3.- Docker instalado, en Windows tener Windows WSL y Docker Desktop 
4.- GIT instalado

1.- Descargar proyecto con git clone y abrir la carpeta con VS Code o algun otro editor de código
2.- Si no hay base de datos ejecutar docker-compose.yml que se encuentra en /MySQLDB; para crear base de datos
3.- Correr script.sql que se encuentra en  para crear base de datos y tablas ( insertar roles, linea 30 y 31 )
4.- Ejecutar docker-compose.yml que se encuentra en /server para crear el servidor express NodeJS ( se creara desde la imagen del repositorio docker hub)
5.- Cambiar la dirección Ip de la linea 3 del archivo .env que se encuentra en el directorio /server dentro del contenedor server-express:v1 ( para hacer la conexion con la base de datos)
6.- Ejecutar docker-compose.yml que se encuentra en /App para crear el contenedor de la app 
7.- Abrir navegador en http://localhost:80

-- Versión de NodeJS: v20.11.1
-- Versión de Typescript: 5.4.5
-- Versión de Angular: 16.1.0
-- Versión de Angular Material: 16

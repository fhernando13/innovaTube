-- crear base de datos
create database innovadb;

-- administrar base de datos
use innovadb;

 -- Crear tablas
drop table if exists Roles;
create table Roles(
	Idrol integer not null auto_increment primary key,
	Rolusuario varchar (50)
);

drop table if exists Usuarios;
create table Usuarios(
	Idusuario integer not null auto_increment primary key,
	Nombre varchar (50),
	Nickname varchar (50),
	ApePaterno varchar (70),
	Email varchar(100),
	Password varchar (70),
	Estatus bool,
	RolId int not null,
	foreign key (RolId) references Roles(Idrol) on delete cascade on update cascade
);
-- ver tablas
show tables;
-- querys roles
-- se necesitan crear los roles para poder registrar usuarios
INSERT INTO innovadb.Roles (Idrol, Rolusuario) VALUES(0, 'Admin');
INSERT INTO innovadb.Roles (Idrol, Rolusuario) VALUES(0, 'Usuario');

select * from Roles r ;
select * from Usuarios ;


describe Usuarios ;
-- drop database innovadb;

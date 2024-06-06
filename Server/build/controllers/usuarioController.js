"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleBcrypt_1 = __importDefault(require("../helpers/handleBcrypt"));
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    //lista de usuarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT * FROM innovadb.Usuarios ", (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send(results);
            });
        });
    }
    //Usuarios por rol
    getall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("SELECT Idusuario, Nombre, ApePaterno, Email, Estatus, Rolusuario FROM innovadb.Usuarios u INNER JOIN innovadb.Roles r ON u.Rolid = r.Idrol ", (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send(results);
            });
        });
    }
    //obtener usuario
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("SELECT * FROM innovadb.Usuarios where Idusuario = ?", [id], (error, results, fields) => {
                if (error) {
                    console.log(error);
                }
                if (results == false) {
                    console.log('Usuario no existe!!');
                    return res.status(400).send('Usuario no existe!!');
                }
                return res.status(200).send(results);
            });
        });
    }
    //obtener usuario por rol
    getOneByRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("SELECT Idusuario, Nombre, ApePaterno, Nickname, Email, Estatus, RolUsuario FROM innovadb.Usuarios u inner JOIN innovadb.Roles r ON u.Rolid  = r.Idrol where Idusuario = ?", [id], (error, results, fields) => {
                if (error) {
                    console.log(error);
                }
                if (results == false) {
                    console.log('Usuario no existe!!');
                    return res.status(400).send('Usuario no existe!!');
                }
                return res.status(200).send(results);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Idusuario, Nombre, ApePaterno, Nickname, Email, Password, Estatus, RolId } = req.body;
            var paswordHash = yield handleBcrypt_1.default.encrypt(Password);
            const data = {
                Nombre,
                ApePaterno,
                Nickname,
                Email,
                Password: paswordHash,
                Estatus,
                RolId
            };
            yield database_1.default.query("INSERT INTO innovadb.Usuarios set ?", [data], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send('Usuario registrado');
            });
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM innovadb.Usuarios where Idusuario = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }
            else {
                database_1.default.query("DELETE FROM innovadb.Usuarios where Idusuario = ?", [id]);
                return res.status(200).send('Usuario borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM innovadb.Usuarios where Idusuario = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }
            else {
                const { Idusuario, Nombre, Nickname, ApePaterno, Email, Password, Estatus, RolId } = req.body;
                database_1.default.query("UPDATE innovadb.Usuarios SET ? WHERE Idusuario=?", [req.body, id]);
                return res.status(200).send('Usuario actualizado');
            }
        });
    }
}
;
const usuarioController = new UsuarioController();
exports.default = usuarioController;

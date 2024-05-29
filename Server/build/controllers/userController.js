"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    list(req, res) {
        database_1.default.query("SELECT * FROM store.Usuarios ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT * FROM store.Usuarios where id = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Usuario no existe!!');
                return res.status(400).send('Usuario no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    create(req, res) {
        const { NombreUsuario, CorreoUsuario, PasswordUsuario, EstatusUsuario, RolId } = req.body;
        const data = {
            NombreUsuario,
            CorreoUsuario,
            PasswordUsuario,
            EstatusUsuario,
            RolId
        };
        database_1.default.query("INSERT INTO store.Usuarios set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Usuario registrado');
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM store.Usuarios where id = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }
            else {
                database_1.default.query("DELETE FROM store.Usuarios where id = ?", [id]);
                return res.status(200).send('Usuario borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM store.Usuarios where id = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }
            else {
                const { NombreUsuario, CorreoUsuario, PasswordUsuario, EstatusUsuario, RolId } = req.body;
                database_1.default.query("UPDATE store.Usuarios SET ? WHERE id=?", [req.body, id]);
                return res.status(200).send('Usuario actualizado');
            }
        });
    }
}
;
const usuarioController = new UsuarioController();
exports.default = usuarioController;

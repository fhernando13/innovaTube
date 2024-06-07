"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class RolesController {
    list(req, res) {
        database_1.default.query("SELECT * FROM innovadb.Roles ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT * FROM innovadb.Roles where Idrol = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Rol no existe!!');
                return res.status(400).send('Rol no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    create(req, res) {
        const { Rolusuario } = req.body;
        const data = {
            Rolusuario
        };
        database_1.default.query("INSERT INTO innovadb.Roles set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Rol registrado');
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM innovadb.Roles where Idrol = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Rol no existe');
                return res.status(500).send('Rol no existe');
            }
            else {
                database_1.default.query("DELETE FROM innovadb.Roles where Idrol = ?", [id]);
                return res.status(200).send('Rol borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM innovadb.Roles where Idrol = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Rol no existe');
                return res.status(500).send('Rol no existe');
            }
            else {
                const { Rol } = req.body;
                database_1.default.query("UPDATE innovadb.Roles SET ? WHERE Idrol=?", [req.body, id]);
                return res.status(200).send('Rol actualizado');
            }
        });
    }
}
;
const rolesController = new RolesController();
exports.default = rolesController;

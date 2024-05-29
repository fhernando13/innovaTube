"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class MovimientosController {
    list(req, res) {
        database_1.default.query("SELECT * FROM store.Movimientos ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT * FROM store.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Movimiento no existe!!');
                return res.status(400).send('Movimiento no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    create(req, res) {
        const { Movimiento } = req.body;
        const data = {
            Movimiento
        };
        database_1.default.query("INSERT INTO store.Movimientos set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Movimiento registrado');
        });
    }
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM store.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Movimiento no existe');
                return res.status(500).send('Movimiento no existe');
            }
            else {
                database_1.default.query("DELETE FROM store.Movimientos where Idrol = ?", [id]);
                return res.status(200).send('Movimiento borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM store.Movimientos where Idmovimiento = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Movimiento no existe');
                return res.status(500).send('Rol no existe');
            }
            else {
                const { Movimiento } = req.body;
                database_1.default.query("UPDATE store.Movimientos SET ? WHERE Idmovimiento=?", [req.body, id]);
                return res.status(200).send('Movimiento actualizado');
            }
        });
    }
}
;
const movimientosController = new MovimientosController();
exports.default = movimientosController;

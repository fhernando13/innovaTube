"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductosController {
    list(req, res) {
        database_1.default.query("SELECT * FROM store.Productos ", (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send(results);
        });
    }
    getAll(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT * FROM store.Productos where EstatusProducto = 1", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    getOne(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT * FROM store.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    //Obtener la existencia del producto
    get(req, res) {
        const { id } = req.params;
        database_1.default.query("SELECT ExistenciaProducto FROM store.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            if (results == false) {
                console.log('Producto no existe!!');
                return res.status(400).send('Producto no existe!!');
            }
            return res.status(200).send(results);
        });
    }
    //Registrar un producto
    create(req, res) {
        const { NombreProducto, PrecioProducto, EstatusProducto, ExistenciaProducto } = req.body;
        const data = {
            NombreProducto,
            PrecioProducto,
            EstatusProducto,
            ExistenciaProducto
        };
        database_1.default.query("INSERT INTO store.Productos set ?", [data], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            return res.status(200).send('Producto registrado');
        });
    }
    //Borrar un producto
    delete(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM store.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Producto no existe');
                return res.status(500).send('Producto no existe');
            }
            else {
                database_1.default.query("DELETE FROM store.Productos where Idproducto = ?", [id]);
                return res.status(200).send('Rol borrado');
            }
        });
    }
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT * FROM store.Productos where Idproducto = ?", [id], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(400).send('error');
            }
            if (results.length <= 0) {
                console.log('Producto no existe');
                return res.status(500).send('Producto no existe');
            }
            else {
                const { NombreProducto, PrecioProducto, EstatusProducto, ExistenciaProducto } = req.body;
                database_1.default.query("UPDATE store.Productos SET ? WHERE Idproducto=?", [req.body, id]);
                return res.status(200).send('Producto actualizado');
            }
        });
    }
}
;
const productosController = new ProductosController();
exports.default = productosController;

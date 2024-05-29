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
const database_1 = __importDefault(require("../database"));
class InventarioController {
    //join
    getall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`SELECT Idinventario, NombreProducto ,NombreUsuario, Movimiento, Cantidad, FechaInventario 
                          FROM store.Inventarios i
                               JOIN store.Productos p  
                          ON i.ProductoId  = p.Idproducto 
                               JOIN store.Movimientos m
                          ON i.MovimientoId  = m.Idmovimiento 
                               left JOIN store.Usuarios u 
                          ON m.Idmovimiento = u.Idusuario order by Idinventario `, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send(results);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { FechaInventario, Cantidad, UsuarioId, ProductoId, MovimientoId } = req.body;
            const data = {
                FechaInventario,
                Cantidad,
                UsuarioId,
                ProductoId,
                MovimientoId
            };
            yield database_1.default.query("INSERT INTO store.Inventarios set ?", [data], (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send('error');
                }
                return res.status(200).send('Movimiento de producto actualizado');
            });
        });
    }
    //Aumentar existencia de u producto
    update(req, res) {
        const { id } = req.params;
        console.log(id);
        database_1.default.query("SELECT Existencia FROM store.Productos where Idproducto = ?", [id], (error, results, fields) => {
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
const inventarioController = new InventarioController();
exports.default = inventarioController;

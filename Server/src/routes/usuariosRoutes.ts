import { Router } from 'express';

import usuarioController from '../controllers/usuarioController';

class UsuariosRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/listausuarios', usuarioController.list);
        this.router.get('/usuariosbyrol', usuarioController.getall);
        this.router.get('/usuario/:id', usuarioController.getOne);
        this.router.get('/usuariorol/:id', usuarioController.getOneByRol);
        this.router.post('/registrar', usuarioController.create);
        this.router.delete('/eliminar/:id', usuarioController.delete);
        this.router.put('/actualizar/:id', usuarioController.update);
    }

}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;
import {Request, Response} from 'express';
import handleBCrypt from '../helpers/handleBcrypt';

import pool from '../database';

class UsuarioController{            

    //lista de usuarios
    public async  list (req: Request, res: Response){
        await pool.query("SELECT * FROM innovadb.Usuarios ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    //Usuarios por rol
    public async getall (req: Request, res: Response){
        await pool.query("SELECT Idusuario, Nombre, ApePaterno, Email, Estatus, Rolusuario FROM innovadb.Usuarios u INNER JOIN innovadb.Roles r ON u.Rolid = r.Idrol ", (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send(results); 
        });      
    }

    //obtener usuario
    public async getOne (req: Request, res: Response){        
        const {id} = req.params;
        await pool.query("SELECT * FROM innovadb.Usuarios where Idusuario = ?", [id], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Usuario no existe!!');
                return res.status(400).send('Usuario no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }    

    //obtener usuario por rol
    public async getOneByRol (req: Request, res: Response){        
        const {id} = req.params;
        await pool.query("SELECT Idusuario, Nombre, ApePaterno, Nickname, Email, Estatus, RolUsuario FROM innovadb.Usuarios u inner JOIN innovadb.Roles r ON u.Rolid  = r.Idrol where Idusuario = ?", [id], (error, results, fields) => {        
            if(error) { 
                console.log(error); 
            }if(results == false) {
                console.log('Usuario no existe!!');
                return res.status(400).send('Usuario no existe!!'); 
            }
            return res.status(200).send(results); 
        });      
    }   

    public async create(req: Request, res:Response){        
        const { Idusuario, Nombre, ApePaterno, Nickname, Email, Password, Estatus, RolId } = req.body;
        var paswordHash = await handleBCrypt.encrypt(Password);
        const data={
            Nombre,
            ApePaterno,
            Nickname,
            Email,
            Password: paswordHash,
            Estatus,
            RolId
        };       
        await pool.query("INSERT INTO innovadb.Usuarios set ?",[data], (error, results, fields) => { 
            if(error) { 
                console.log(error); 
                return res.status(400).send('error'); 
            }
            return res.status(200).send('Usuario registrado'); 
        });
    }
  
    public delete(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM innovadb.Usuarios where Idusuario = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }else{
                pool.query("DELETE FROM innovadb.Usuarios where Idusuario = ?", [id]);
                return res.status(200).send('Usuario borrado');
            }
        });
    }

    public update(req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        pool.query("SELECT * FROM innovadb.Usuarios where Idusuario = ?", [id], (error, results, fields) => { 
            if(error){
                console.log(error); 
                return res.status(400).send('error'); 
            }if(results.length <= 0){
                console.log('Usuario no existe');
                return res.status(500).send('Usuario no existe');
            }else{
                const { Idusuario, Nombre, Nickname, ApePaterno, Email, Password, Estatus, RolId } = req.body;
                pool.query("UPDATE innovadb.Usuarios SET ? WHERE Idusuario=?", [req.body, id]);
                return res.status(200).send('Usuario actualizado');
            }
        });
    }

};

const usuarioController = new UsuarioController();
export default usuarioController;
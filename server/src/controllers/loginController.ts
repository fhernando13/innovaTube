import {Request, Response} from 'express';
import handleBCrypt from '../helpers/handleBcrypt';
import pool from '../database';

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY || 'secrete_key';

class LoginController{

    public async create(req: Request, res:Response){        
        var email = req.body.Email;
        var pass = req.body.Password; 
        pool.query("Select * from innovadb.Usuarios where Email = ?", [email], async (error, results) => {
            
            if (results.length <= 0) {
                console.log(error);
                return res.status(400).send('Usuario no existe');
            }
            else {
                var rol = '';
                var nickname = '';
                results.forEach((element: any) => rol = element.RolId);
                results.forEach((element: any) => nickname = element.Nickname);
                if (await handleBCrypt.comparePass(pass, results[0].Password)) {                
                    const token = jwt.sign({ unique_name: nickname, role: rol.toString() }, secretKey, { expiresIn: "1h" });
                    return res.status(200).json({ token });
                }
                else {
                    return res.status(400).send('pass incorrecto');
                }
            }
        });
    }
}

const loginController = new LoginController();
export default loginController;
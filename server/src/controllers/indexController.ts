import {Request, Response} from 'express';

class IndexController{

    index (req: Request, res: Response){
        res.json({'message':'InnovaTube'})
    }

};

const indexController = new IndexController();
export default indexController;
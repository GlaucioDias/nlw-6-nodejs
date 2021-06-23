import express, { Request, Response} from 'express';
import { CreateUserService } from '../services/CreateuserService';


class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, admin } = req.body;

        const createUserService = new CreateUserService();
        try {
            const user = await createUserService.execute({ name, email, admin });
            return res.status(200).json(user);
            
        } catch (error) {
            console.log(error)
            return res.status(422).json(error.message);
        }

    }
}

export { CreateUserController }
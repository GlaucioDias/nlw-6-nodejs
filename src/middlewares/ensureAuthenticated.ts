import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")
    
    
    try {
        const { sub } = verify(token, '289fa443d34f30e35dec380473f95cb84c9b40c0') as IPayload
        
        req.user_id = sub;
        
        return next();
    } catch (error) {
        return res.status(401).end()
    }
}
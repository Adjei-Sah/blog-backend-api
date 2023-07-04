import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/User';

export const generateAccessToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET || 'as23e9!#wfviu34', { expiresIn: '2 days' });
};

interface JwtPayload {
  userId: string;
}

export const authenticateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: tokenHeader } = req.headers;
    const token = tokenHeader?.split(' ')[1];

    if (!token) {
      throw new Error();
    }

    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET || 'as23e9!#wfviu34') as JwtPayload;

    let user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
  
    req.body.user = user?.id;
        
    next(); 

  } catch (error) {
    console.log(error);
    const err = new Error();

    err.message = 'Unauthorized';

    res.status(401);
    next(err);
  }
  
};
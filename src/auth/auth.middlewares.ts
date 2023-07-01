import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: string | object | Buffer) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET || 'as23e9!#wfviu34', { expiresIn: '30m' });
};

export interface CustomRequest extends Request {
  token: string | jwt.JwtPayload;
}

export const authenticateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { authorization: tokenHeader } = req.headers;
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'as23e9!#wfviu34');
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    const err = new Error();

    err.message = 'Please authenticate';

    res.status(401);
    next(err);
  }
  

  // if (!tokenHeader) {
  //   const err = new Error();

  //   err.message = 'Authorization Error';

  //   res.status(401);

  //   next(err);
  // }

  // const token = tokenHeader?.split(' ')[1];

  // try {
  //   const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET || 'as23e9!#wfviu34');

  //   const { userId: id } = decoded;
    
  //   const userRepository = AppDataSource.getRepository(User);
  //   const userObj = await userRepository.findOneByOrFail({ id });
   
  //   req.user = userObj;

  // } catch (error) {
  //   const err = new Error();

  //   err.message = 'Please Authenticate';

  //   res.status(401);

  //   next(err);
  // }
};
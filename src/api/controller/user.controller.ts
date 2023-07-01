import { NextFunction, Request, Response } from 'express';

import * as userService from '../services/user.service';
import { validate } from 'class-validator';
import ErrorValidator from '../../interfaces/ValidationError';
import { LoginDTO, RegisterDTO } from '../dto/user.dto';
import { compare } from 'bcrypt';
import { generateAccessToken } from '../../auth/auth.middlewares';

export const register = async (req:Request, res: Response, next: NextFunction) => {
  try {

    const userData = req.body;
    const dto = new RegisterDTO();

    dto.name = userData.name;
    dto.password = userData.password;
    dto.email = userData.email;

    const errors = await validate(dto);

    if (errors.length) {
      let errorMessages: any[] = [];
      
      for (const errorItem of errors) {
        errorMessages = errorMessages.concat(errorItem.constraints);
      }

      const err: ErrorValidator = new Error();
      err.message = 'Validation Error';
      err.errors = errorMessages;
      
      res.status(422);

      throw err;
    }

    const data = await userService.register(userData);

    res.status(201);
    res.json({
      message: 'User created Successfully',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    
    const dto = new LoginDTO();

    dto.email = userData.email;
    dto.password = userData.password;

    const errors = await validate(dto);

    if (errors.length) {
      let errorMessages: any[] = [];
      
      for (const errorItem of errors) {
        errorMessages = errorMessages.concat(errorItem.constraints);
      }

      const err: ErrorValidator = new Error();
      err.message = 'Validation Error';
      err.errors = errorMessages;
      
      res.status(422);

      throw err;
    }

    const user = await userService.login(userData);

    if (!user) {
      const err: ErrorValidator = new Error();
      err.message = 'Invalid Credentials';

      res.status(401);

      throw err;
    }

    let passwordMatches = await compare(userData.password, user.password);

    if (!passwordMatches) {
      const err: ErrorValidator = new Error();
      err.message = 'Invalid Credentials';

      res.status(401);

      throw err;
    }

    let accessToken = generateAccessToken({ userId: user.id, name: user.name });

    let returnedUser = {
      'name': user.name,
      'email': user.email,
    };

    res.status(200);
    res.json({
      message: 'User login success',
      data: {
        user: returnedUser,
        accessToken,
      },
    });

  } catch (error) {
    next(error);
  }
};
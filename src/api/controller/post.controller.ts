import { NextFunction, Request, Response } from 'express';
import { CreatePostDTO } from '../dto/post.dto';
import { validate } from 'class-validator';
import ErrorValidator from '../../interfaces/ValidationError';
import * as postService from '../services/post.service';

export const create = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const postData = req.body;

    const dto = new CreatePostDTO();

    dto.title = postData.title;
    dto.content = postData.content;
    dto.summary = postData.summary;
    dto.user = postData.user;

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

    const data = await postService.create(postData);

    res.status(201);
    res.json({
      message: 'Post created Successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
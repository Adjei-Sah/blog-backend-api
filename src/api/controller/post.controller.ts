import { NextFunction, Request, Response } from 'express';
import { CreatePostDTO, UpdatePostDTO } from '../dto/post.dto';
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

// View All POSTS
export const viewAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postUser = req.body;

    const data =  await postService.viewAll(postUser.user);

    res.json({
      message: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// View One Post
export const viewOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.body.user;
    
    
    const data = await postService.viewOne(postId, userId);
    
    res.json({
      message: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Update
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const postData = req.body;
    const userId = req.body.user;
    
    const dto = new UpdatePostDTO();

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

    const data = await postService.update(postId, postData, userId);

    res.json({
      message: 'Success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.body.user;

    await postService.deleteOne(postId, userId);

    res.json({
      message: 'Deleted Successfully',
    });
  } catch (error) {
    next(error);
  }
};
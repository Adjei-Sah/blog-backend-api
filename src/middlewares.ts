import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';
import ErrorValidator from './interfaces/ValidationError';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error); 
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: ErrorValidator, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  if (err.errors) {
    res.statusCode = 422; 
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    error: err.errors,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}